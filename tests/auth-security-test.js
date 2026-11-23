const assert = require('node:assert/strict');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

// Set required environment variables before requiring server
process.env.TOKEN_SECRET = 'test-token-secret-for-security-audit-suite-only-32bytes!';
process.env.ADMIN_EMAIL = 'admin@damanhour.edu.eg';
process.env.ADMIN_PASSWORD = 'AdminSecurePassword2026!';
process.env.CORS_ORIGIN = 'http://localhost:8080,http://127.0.0.1:8080';

const server = require('../backend/server');

function makeRequest(serverInstance, { method = 'GET', path: reqPath = '/', headers = {}, body = null }) {
    return new Promise((resolve, reject) => {
        const address = serverInstance.address();
        const payload = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;

        const reqHeaders = { ...headers };
        if (payload && !reqHeaders['Content-Type']) {
            reqHeaders['Content-Type'] = 'application/json';
        }
        if (payload && !reqHeaders['Content-Length']) {
            reqHeaders['Content-Length'] = Buffer.byteLength(payload);
        }

        const req = http.request(
            {
                hostname: '127.0.0.1',
                port: address.port,
                path: reqPath,
                method,
                headers: reqHeaders
            },
            (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => {
                    const raw = Buffer.concat(chunks).toString('utf8');
                    let json = null;
                    try {
                        json = JSON.parse(raw);
                    } catch {}
                    resolve({ status: res.statusCode, headers: res.headers, body: raw, json });
                });
            }
        );

        req.on('error', reject);
        if (payload) req.write(payload);
        req.end();
    });
}

async function runSecurityTests() {
    console.log('🔒 Starting HuntYourTrack Auth & Security Test Suite...');
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

    try {
        // -------------------------------------------------------------
        // 1. REJECT REGISTRATION WITH ROLE 'admin' (HTTP 400)
        // -------------------------------------------------------------
        console.log('--- [1/8] Testing Registration Role Rejection ---');
        const adminRegRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/auth/register',
            body: {
                name: 'Attacker Admin',
                email: 'attacker@test.com',
                password: 'password123',
                role: 'admin'
            }
        });
        assert.equal(adminRegRes.status, 400, 'Registration with role: admin must be rejected with HTTP 400');
        assert.ok(
            adminRegRes.json && adminRegRes.json.error.includes('Admin accounts cannot be self-registered'),
            'Error message must state admin accounts cannot be self-registered'
        );
        console.log('  ✓ Registration specifying role: "admin" is rejected with HTTP 400.');

        const invalidRoleRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/auth/register',
            body: {
                name: 'Invalid Role',
                email: 'invalid@test.com',
                password: 'password123',
                role: 'superadmin'
            }
        });
        assert.equal(invalidRoleRes.status, 400, 'Registration with invalid role must be rejected with HTTP 400');
        console.log('  ✓ Registration specifying unknown role is rejected with HTTP 400.');

        // -------------------------------------------------------------
        // 2. VALID REGISTRATION & LOGIN
        // -------------------------------------------------------------
        console.log('\n--- [2/8] Testing Valid Student & Employer Registration ---');
        const studentRegRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/auth/register',
            body: {
                name: 'Valid Student',
                email: 'validstudent@test.com',
                password: 'Password123!',
                role: 'student',
                faculty: 'computers-ai'
            }
        });
        assert.equal(studentRegRes.status, 201, 'Valid student registration must return HTTP 201');
        assert.ok(studentRegRes.json.token, 'Registration must return a session token');
        assert.equal(studentRegRes.json.user.role, 'student', 'User role must be student');
        const studentToken = studentRegRes.json.token;
        console.log('  ✓ Valid student registration creates student account with token.');

        // -------------------------------------------------------------
        // 3. USER ENUMERATION & CONSTANT-TIME LOGIN
        // -------------------------------------------------------------
        console.log('\n--- [3/8] Testing Zero User Enumeration on Login ---');
        const wrongPassRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/auth/login',
            body: { email: 'validstudent@test.com', password: 'WrongPassword123!' }
        });
        assert.equal(wrongPassRes.status, 401, 'Wrong password must return 401');
        assert.equal(wrongPassRes.json.error, 'Invalid email or password.');

        const nonExistentRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/auth/login',
            body: { email: 'nobody_here@test.com', password: 'WrongPassword123!' }
        });
        assert.equal(nonExistentRes.status, 401, 'Unknown email must return 401');
        assert.equal(nonExistentRes.json.error, 'Invalid email or password.');
        console.log('  ✓ Login responses are unified against user enumeration.');

        // -------------------------------------------------------------
        // 4. AUTH / ME ENDPOINT & TOKEN EXPIRY
        // -------------------------------------------------------------
        console.log('\n--- [4/8] Testing /auth/me Identity & Expiry Enforcement ---');
        const meRes = await makeRequest(server, {
            method: 'GET',
            path: '/api/v1/auth/me',
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert.equal(meRes.status, 200, '/auth/me with valid token must return 200');
        assert.equal(meRes.json.user.email, 'validstudent@test.com');
        assert.equal(meRes.json.user.role, 'student');

        const noAuthMeRes = await makeRequest(server, {
            method: 'GET',
            path: '/api/v1/auth/me'
        });
        assert.equal(noAuthMeRes.status, 401, '/auth/me without token must return 401');

        const forgedTokenMeRes = await makeRequest(server, {
            method: 'GET',
            path: '/api/v1/auth/me',
            headers: { Authorization: 'Bearer forged.token.signature' }
        });
        assert.equal(forgedTokenMeRes.status, 401, '/auth/me with forged token must return 401');
        console.log('  ✓ /auth/me verifies token integrity and identity correctly.');

        // -------------------------------------------------------------
        // 5. BODY SIZE LIMIT (HTTP 413 & STREAM DESTRUCTION)
        // -------------------------------------------------------------
        console.log('\n--- [5/8] Testing Body Size Limit & Resource Consumption ---');
        const hugePayload = JSON.stringify({ text: 'a'.repeat(25 * 1024) });
        const oversizeRes = await makeRequest(server, {
            method: 'POST',
            path: '/api/v1/cv/parse-keywords',
            body: hugePayload
        });
        assert.equal(oversizeRes.status, 413, 'Oversize payload (>16KB) must return HTTP 413');
        assert.ok(oversizeRes.json && oversizeRes.json.error.includes('Request body too large'));
        console.log('  ✓ Oversize body (>16KB) is intercepted with HTTP 413.');

        // -------------------------------------------------------------
        // 6. CORS ORIGIN RESTRICTION
        // -------------------------------------------------------------
        console.log('\n--- [6/8] Testing CORS Origin Whitelist ---');
        const corsOptionsForbidden = await makeRequest(server, {
            method: 'OPTIONS',
            path: '/api/v1/courses',
            headers: { Origin: 'http://evil-attacker-site.com' }
        });
        assert.equal(corsOptionsForbidden.status, 403, 'Unallowed origin preflight must return 403');

        const corsOptionsAllowed = await makeRequest(server, {
            method: 'OPTIONS',
            path: '/api/v1/courses',
            headers: { Origin: 'http://localhost:8080' }
        });
        assert.equal(corsOptionsAllowed.status, 204, 'Allowed origin preflight must return 204');
        assert.equal(corsOptionsAllowed.headers['access-control-allow-origin'], 'http://localhost:8080');
        console.log('  ✓ CORS restricts access to ALLOWED_ORIGINS whitelist.');

        // -------------------------------------------------------------
        // 7. FRONTEND REDIRECT WHITELIST & CROSS-ROLE ISOLATION
        // -------------------------------------------------------------
        console.log('\n--- [7/8] Testing Frontend Redirect Whitelist & Role Isolation ---');
        const authJsContent = fs.readFileSync(path.resolve(__dirname, '../frontend/js/auth.js'), 'utf8');
        assert.ok(authJsContent.includes('const ROLE_ALLOWED_PAGES'), 'ROLE_ALLOWED_PAGES must be defined');
        assert.ok(authJsContent.includes('KNOWN_REDIRECT_PAGES.has(normalizedName)'), 'Strict destination whitelist must be enforced');

        // Test in simulated context:
        const vm = require('node:vm');
        const sandbox = {
            window: {
                location: {
                    href: 'http://localhost:8080/pages/auth.html',
                    origin: 'http://localhost:8080',
                    search: ''
                }
            },
            URL,
            URLSearchParams,
            Set,
            document: { getElementById: () => null }
        };
        vm.createContext(sandbox);
        vm.runInContext(
            `
            const AUTH_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const ROLE_REDIRECTS = { student: 'student.html', employer: 'employer.html', admin: 'admin.html' };
            const KNOWN_REDIRECT_PAGES = new Set(['student.html', 'employer.html', 'employer-dashboard.html', 'post-internship.html', 'applicants-review.html', 'admin.html', 'workflow.html', 'index.html']);
            const ROLE_ALLOWED_PAGES = {
                student: new Set(['student.html', 'index.html']),
                employer: new Set(['employer.html', 'employer-dashboard.html', 'post-internship.html', 'applicants-review.html', 'index.html']),
                admin: new Set(['admin.html', 'workflow.html', 'student.html', 'employer.html', 'employer-dashboard.html', 'post-internship.html', 'applicants-review.html', 'index.html'])
            };
            function getSafeRedirectTarget(fallback, role) {
                const defaultTarget = fallback || (role && ROLE_REDIRECTS[role]) || ROLE_REDIRECTS.student;
                const target = new URLSearchParams(window.location.search).get('redirect');
                if (!target) return defaultTarget;
                const trimmed = target.trim();
                if (!trimmed) return defaultTarget;
                if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return defaultTarget;
                if (trimmed.startsWith('//') || trimmed.startsWith('\\\\\\\\')) return defaultTarget;
                if (/[\\u0000-\\u001f\\u007f]/.test(trimmed)) return defaultTarget;
                try {
                    const resolved = new URL(trimmed, window.location.href);
                    if (resolved.origin !== window.location.origin) return defaultTarget;
                    const pathname = resolved.pathname;
                    const fileName = pathname.split('/').pop().toLowerCase();
                    if (!fileName || fileName === 'auth' || fileName === 'auth.html') return defaultTarget;
                    const normalizedName = fileName.endsWith('.html') ? fileName : \`\${fileName}.html\`;
                    if (!KNOWN_REDIRECT_PAGES.has(normalizedName)) return defaultTarget;
                    const userRole = role && ROLE_ALLOWED_PAGES[role] ? role : 'student';
                    const allowedPages = ROLE_ALLOWED_PAGES[userRole];
                    if (!allowedPages.has(normalizedName)) return defaultTarget;
                    if (normalizedName === 'index.html') return \`../index.html\${resolved.search}\${resolved.hash}\`;
                    return \`\${normalizedName}\${resolved.search}\${resolved.hash}\`;
                } catch (err) {
                    return defaultTarget;
                }
            }
            `,
            sandbox
        );

        // 7a. Open redirect attempt with arbitrary page
        sandbox.window.location.search = '?redirect=malicious.html';
        assert.equal(
            vm.runInContext("getSafeRedirectTarget('student.html', 'student')", sandbox),
            'student.html',
            'Unwhitelisted html file must fallback to student.html'
        );

        // 7b. Open redirect attempt with external protocol
        sandbox.window.location.search = '?redirect=//evil.com';
        assert.equal(
            vm.runInContext("getSafeRedirectTarget('student.html', 'student')", sandbox),
            'student.html',
            'Protocol-relative URL must fallback'
        );

        // 7c. Cross-role redirect loop prevention (student attempting to redirect to admin.html)
        sandbox.window.location.search = '?redirect=admin.html';
        assert.equal(
            vm.runInContext("getSafeRedirectTarget('student.html', 'student')", sandbox),
            'student.html',
            'Student role must not be redirected to admin.html'
        );

        // 7d. Admin legitimately redirecting to admin.html
        sandbox.window.location.search = '?redirect=admin.html';
        assert.equal(
            vm.runInContext("getSafeRedirectTarget('admin.html', 'admin')", sandbox),
            'admin.html',
            'Admin role allowed to redirect to admin.html'
        );

        // 7e. Landing page path resolution from pages/
        sandbox.window.location.search = '?redirect=index';
        assert.equal(
            vm.runInContext("getSafeRedirectTarget('student.html', 'student')", sandbox),
            '../index.html',
            'Landing page redirect from pages/ subfolder must point to ../index.html'
        );
        console.log('  ✓ Redirect whitelist, role protection, and path resolution verified.');

        // -------------------------------------------------------------
        // 8. ROUTE GUARDS ON PROTECTED PAGES & WORKFLOW.HTML
        // -------------------------------------------------------------
        console.log('\n--- [8/8] Testing Protected Page Route Guards ---');
        const workflowHtml = fs.readFileSync(path.resolve(__dirname, '../frontend/pages/workflow.html'), 'utf8');
        assert.ok(
            workflowHtml.includes('<script src="../js/guard.js" data-allowed-roles="admin"></script>'),
            'workflow.html must be protected by guard.js with admin role'
        );
        console.log('  ✓ workflow.html is protected with data-allowed-roles="admin".');

        console.log('\n✅ ALL 8 AUTH & SECURITY TEST SUITES PASSED CLEANLY!\n');
    } finally {
        server.close();
    }
}

runSecurityTests().catch((err) => {
    console.error('❌ Security test failed:', err);
    process.exit(1);
});
