/**
 * HuntYourTrack — US35 End-to-End Authentication Flow Tests (Playwright + real backend)
 *
 * Unlike tests/frontend-smoke-test.js and tests/rigorous-e2e-audit.js (which mock
 * /api/v1/auth/me with fake tokens), this suite drives a real Chromium browser
 * against the REAL backend (backend/server.js) and the REAL frontend pages:
 *
 *   1. Login form client-side validation (invalid email, short password)
 *   2. Signup form client-side validation (invalid email, short password)
 *   3. Admin self-registration rejected (UI-forced role + direct API call)
 *   4. Valid student registration through the UI (lands on student.html with a real session)
 *   5. hyt_theme survives logout and page reload; auth token is cleared on logout
 *   6. Wrong-password login shows a unified error and issues no token
 *   7. Valid student login through the UI
 *   8. Role-based access: a student cannot open employer.html or admin.html
 *   9. Unauthenticated direct URL access to student/employer/admin redirects to auth
 *  10. Employer registration lands on employer.html; employer blocked from student.html
 *  11. Seeded admin (ADMIN_EMAIL/ADMIN_PASSWORD) can log in and open admin.html
 *
 * How to run (from the repository root):
 *   npm install                 # installs Playwright (devDependency)
 *   npx playwright install chromium   # one-time browser download
 *   node tests/auth-e2e-flow-test.js
 *
 * No environment variables are required: the suite sets its own TOKEN_SECRET,
 * ADMIN_EMAIL, ADMIN_PASSWORD and CORS_ORIGIN before loading the backend
 * (same pattern as tests/auth-security-test.js). If Playwright's browser
 * binaries live outside the default cache, set PLAYWRIGHT_CHROMIUM_PATH.
 *
 * Verified: executed against branch feature/us35-secure-auth-flow (commit 7cace05)
 * on 2026-11-23 with Node v22 and Playwright Chromium — all 11 suites passed.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

let chromium;
try {
    chromium = require('playwright').chromium;
} catch {
    try {
        const skillsPlaywright = path.resolve(__dirname, '../.global_skills/node_modules/playwright');
        chromium = require(skillsPlaywright).chromium;
    } catch {
        chromium = require('playwright').chromium;
    }
}

// Backend configuration must be set BEFORE requiring backend/server.js,
// which reads its environment at module load time.
process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'e2e-flow-test-token-secret-32bytes-minimum!';
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@damanhour.edu.eg';
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminE2EPassword2026!';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const STUDENT = { name: 'E2E Student', email: 'e2e.student@damanhour.edu.eg', password: 'E2eStudentPass!' };
const EMPLOYER = { name: 'E2E Employer', email: 'e2e.employer@company.com', password: 'E2eEmployerPass!' };

const frontendDirectory = fs.existsSync(path.resolve(process.cwd(), 'frontend'))
    ? path.resolve(process.cwd(), 'frontend')
    : path.resolve(__dirname, '../../frontend');

const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

// Static file server for the frontend, same routing as tests/frontend-smoke-test.js
const frontendServer = http.createServer((request, response) => {
    const requestedPath = request.url === '/' ? '/index.html' : decodeURIComponent(request.url.split('?')[0]);
    let filePath = path.resolve(frontendDirectory, `.${requestedPath}`);
    if (!fs.existsSync(filePath)) {
        const inPages = path.resolve(frontendDirectory, `pages${requestedPath}`);
        if (fs.existsSync(inPages)) filePath = inPages;
    }
    if (!filePath.startsWith(`${frontendDirectory}${path.sep}`) || !fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end('Not found');
        return;
    }
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
});

function listen(serverInstance) {
    return new Promise((resolve) => serverInstance.listen(0, '127.0.0.1', resolve));
}

function closeServer(serverInstance) {
    return new Promise((resolve, reject) => {
        if (!serverInstance.listening) return resolve();
        serverInstance.close((error) => (error ? reject(error) : resolve()));
    });
}

async function run() {
    console.log('🌐 Starting US35 end-to-end auth flow suite (real backend + real browser)...');

    await listen(frontendServer);
    const frontendPort = frontendServer.address().port;
    const baseUrl = `http://127.0.0.1:${frontendPort}`;

    // The frontend origin must be in the backend CORS allowlist before the backend module loads.
    process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || baseUrl;
    const apiServer = require('../backend/server');
    await listen(apiServer);
    const apiBase = `http://127.0.0.1:${apiServer.address().port}/api/v1`;

    let browser;
    const contexts = [];

    async function newTestPage() {
        const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
        contexts.push(context);
        // Point the frontend API layer at the real test backend before any page script runs.
        await context.addInitScript((base) => { window.HYT_API_BASE = base; }, apiBase);
        const page = await context.newPage();
        page.setDefaultTimeout(20000);
        // Abort external fonts to keep the test fast and reliable
        await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
        await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
        return page;
    }

    async function getSessionToken(page) {
        return page.evaluate(() => window.sessionStorage.getItem('hyt_token'));
    }

    async function getLocalStorageValue(page, key) {
        return page.evaluate((k) => window.localStorage.getItem(k), key);
    }

    async function waitForSession(page, role) {
        await page.waitForFunction(
            (expectedRole) => window.HYT_SESSION && window.HYT_SESSION.role === expectedRole,
            role
        );
    }

    async function waitForAuthError(page, textFragment) {
        await page.waitForFunction(
            (fragment) => {
                const status = document.getElementById('auth-status');
                return status && status.textContent.includes(fragment);
            },
            textFragment
        );
    }

    async function fillLoginForm(page, email, password) {
        await page.fill('#login-email', email);
        await page.fill('#login-password', password);
    }

    async function openSignupTab(page) {
        await page.click('#btn-signup');
    }

    try {
        browser = await chromium.launch({
            headless: true,
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined
        });

        // -------------------------------------------------------------
        // 1. LOGIN FORM: CLIENT-SIDE EMAIL & PASSWORD VALIDATION
        // -------------------------------------------------------------
        console.log('--- [1/11] Login form rejects invalid email and short password ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);

            // "student@damanhour" passes native type=email validation but fails the app's stricter pattern
            await fillLoginForm(page, 'student@damanhour', STUDENT.password);
            await page.click('#login-submit-btn');
            await waitForAuthError(page, 'valid email address');
            assert.ok(page.url().includes('auth.html'), 'Invalid email must keep the user on auth.html');
            assert.equal(await getSessionToken(page), null, 'Invalid email must not issue a token');

            await fillLoginForm(page, STUDENT.email, 'short');
            await page.click('#login-submit-btn');
            await waitForAuthError(page, 'at least 8 characters');
            assert.ok(page.url().includes('auth.html'), 'Short password must keep the user on auth.html');
            assert.equal(await getSessionToken(page), null, 'Short password must not issue a token');
            console.log('  ✓ Login form blocks invalid email and passwords under 8 characters.');
        }

        // -------------------------------------------------------------
        // 2. SIGNUP FORM: CLIENT-SIDE VALIDATION
        // -------------------------------------------------------------
        console.log('--- [2/11] Signup form rejects invalid email and short password ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await openSignupTab(page);

            await page.fill('#signup-name', STUDENT.name);
            await page.fill('#signup-email', 'newstudent@damanhour');
            await page.fill('#signup-password', STUDENT.password);
            await page.click('#signup-submit-btn');
            await waitForAuthError(page, 'valid email address');
            assert.equal(await getSessionToken(page), null, 'Invalid signup email must not issue a token');

            // Remove the native minlength attribute so the app's own JS validation is exercised
            await page.fill('#signup-email', STUDENT.email);
            await page.evaluate(() => document.getElementById('signup-password').removeAttribute('minlength'));
            await page.fill('#signup-password', 'short');
            await page.click('#signup-submit-btn');
            await waitForAuthError(page, 'at least 8 characters');
            assert.equal(await getSessionToken(page), null, 'Short signup password must not issue a token');
            console.log('  ✓ Signup form blocks invalid email and passwords under 8 characters.');
        }

        // -------------------------------------------------------------
        // 3. ADMIN SELF-REGISTRATION IS REJECTED (UI + API)
        // -------------------------------------------------------------
        console.log('--- [3/11] Admin self-registration is rejected ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await openSignupTab(page);

            // Force an "admin" option into the role dropdown (it is not offered by default)
            await page.fill('#signup-name', 'Attacker Admin');
            await page.fill('#signup-email', 'attacker@evil.com');
            await page.fill('#signup-password', 'AttackerPass123!');
            await page.evaluate(() => {
                const roleSelect = document.getElementById('signup-role');
                const option = document.createElement('option');
                option.value = 'admin';
                option.textContent = 'Admin';
                roleSelect.appendChild(option);
                roleSelect.value = 'admin';
            });
            await page.click('#signup-submit-btn');
            await waitForAuthError(page, 'Admin accounts are provisioned');
            assert.equal(await getSessionToken(page), null, 'Forced admin signup must not issue a token');

            // Direct API call from the browser: the backend itself must also reject role=admin
            const apiResult = await page.evaluate(async (base) => {
                const response = await fetch(`${base}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: 'Attacker Admin',
                        email: 'attacker2@evil.com',
                        password: 'AttackerPass123!',
                        role: 'admin'
                    })
                });
                return { status: response.status, body: await response.json() };
            }, apiBase);
            assert.equal(apiResult.status, 400, 'Backend must reject role=admin with HTTP 400');
            assert.ok(
                apiResult.body.error.includes('cannot be self-registered'),
                'Backend error must state admin accounts cannot be self-registered'
            );
            console.log('  ✓ Admin self-registration is blocked in the UI and by the backend (HTTP 400).');
        }

        // -------------------------------------------------------------
        // 4. VALID STUDENT REGISTRATION THROUGH THE UI
        // -------------------------------------------------------------
        console.log('--- [4/11] Valid student registration via the signup form ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await openSignupTab(page);

            await page.fill('#signup-name', STUDENT.name);
            await page.fill('#signup-email', STUDENT.email);
            await page.fill('#signup-password', STUDENT.password);
            await page.selectOption('#signup-role', 'student');
            await page.click('#signup-submit-btn');

            await page.waitForURL('**/student.html');
            await waitForSession(page, 'student');

            assert.ok(await getSessionToken(page), 'Registration must store the server token in sessionStorage');
            assert.equal(await getLocalStorageValue(page, 'hyt_token'), null, 'Token must never be written to localStorage');
            assert.equal(await getLocalStorageValue(page, 'user'), null, 'Legacy key "user" must not be set');
            assert.equal(await getLocalStorageValue(page, 'role'), null, 'Legacy key "role" must not be set');
            assert.equal(await getLocalStorageValue(page, 'user_email'), null, 'Legacy key "user_email" must not be set');
            assert.equal(
                await page.evaluate(() => document.documentElement.classList.contains('hyt-auth-pending')),
                false,
                'Route guard must reveal the student page after session verification'
            );
            console.log('  ✓ Student registration signs in and lands on a guarded student.html.');
        }

        // -------------------------------------------------------------
        // 5. LOGOUT CLEARS AUTH DATA; hyt_theme SURVIVES LOGOUT + RELOAD
        // -------------------------------------------------------------
        console.log('--- [5/11] Logout clears the session but preserves the theme ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await fillLoginForm(page, STUDENT.email, STUDENT.password);
            await page.click('#login-submit-btn');
            await page.waitForURL('**/student.html');
            await waitForSession(page, 'student');

            // Switch to dark mode through the app's own theme controller
            await page.evaluate(() => {
                if (window.hytI18n && typeof window.hytI18n.applyTheme === 'function') {
                    window.hytI18n.applyTheme('dark');
                } else {
                    window.localStorage.setItem('hyt_theme', 'dark');
                }
            });
            assert.equal(await getLocalStorageValue(page, 'hyt_theme'), 'dark', 'Theme choice must be saved');

            await page.click('#logout-btn');
            await page.waitForURL('**/auth.html**');

            assert.equal(await getSessionToken(page), null, 'Logout must clear the session token');
            assert.equal(await getLocalStorageValue(page, 'hyt_theme'), 'dark', 'Logout must preserve hyt_theme');
            assert.equal(await getLocalStorageValue(page, 'user'), null, 'Logout must clear legacy key "user"');
            assert.equal(await getLocalStorageValue(page, 'role'), null, 'Logout must clear legacy key "role"');

            await page.reload({ waitUntil: 'domcontentloaded' });
            assert.equal(
                await page.evaluate(() => document.documentElement.getAttribute('data-theme')),
                'dark',
                'Saved theme must be reapplied after a full page reload'
            );
            assert.equal(await getLocalStorageValue(page, 'hyt_theme'), 'dark', 'hyt_theme must survive the reload');
            console.log('  ✓ Logout clears auth data; dark theme persists across logout and reload.');
        }

        // -------------------------------------------------------------
        // 6. WRONG-PASSWORD LOGIN SHOWS UNIFIED ERROR, ISSUES NO TOKEN
        // -------------------------------------------------------------
        console.log('--- [6/11] Wrong-password login is rejected with a unified error ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await fillLoginForm(page, STUDENT.email, 'WrongPassword123!');
            await page.click('#login-submit-btn');
            await waitForAuthError(page, 'Invalid email or password.');
            assert.ok(page.url().includes('auth.html'), 'Failed login must keep the user on auth.html');
            assert.equal(await getSessionToken(page), null, 'Failed login must not issue a token');
            console.log('  ✓ Wrong password shows "Invalid email or password." and issues no token.');
        }

        // -------------------------------------------------------------
        // 7. VALID STUDENT LOGIN THROUGH THE UI
        // -------------------------------------------------------------
        console.log('--- [7/11] Valid student login via the login form ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await fillLoginForm(page, STUDENT.email, STUDENT.password);
            await page.click('#login-submit-btn');
            await page.waitForURL('**/student.html');
            await waitForSession(page, 'student');
            assert.ok(await getSessionToken(page), 'Login must store the server token in sessionStorage');
            console.log('  ✓ Student login lands on student.html with a verified session.');
        }

        // -------------------------------------------------------------
        // 8. ROLE-BASED ACCESS: STUDENT BLOCKED FROM EMPLOYER & ADMIN
        // -------------------------------------------------------------
        console.log('--- [8/11] Student role cannot open employer.html or admin.html ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await fillLoginForm(page, STUDENT.email, STUDENT.password);
            await page.click('#login-submit-btn');
            await page.waitForURL('**/student.html');
            await waitForSession(page, 'student');

            await page.goto(`${baseUrl}/employer.html`);
            await page.waitForURL(/auth\.html\?.*error=unauthorized/);
            assert.ok(page.url().includes('error=unauthorized'), 'Student on employer.html must redirect with unauthorized');

            // The guard clears the token on redirect, so sign in again before the next check
            await fillLoginForm(page, STUDENT.email, STUDENT.password);
            await page.click('#login-submit-btn');
            await page.waitForURL('**/student.html');
            await waitForSession(page, 'student');

            await page.goto(`${baseUrl}/admin.html`);
            await page.waitForURL(/auth\.html\?.*error=unauthorized/);
            assert.ok(page.url().includes('error=unauthorized'), 'Student on admin.html must redirect with unauthorized');
            console.log('  ✓ Student is redirected away from employer.html and admin.html.');
        }

        // -------------------------------------------------------------
        // 9. UNAUTHENTICATED DIRECT URL ACCESS REDIRECTS TO AUTH
        // -------------------------------------------------------------
        console.log('--- [9/11] Direct URL access without a session redirects to auth ---');
        {
            const page = await newTestPage();
            for (const protectedPage of ['student.html', 'employer.html', 'admin.html']) {
                await page.goto(`${baseUrl}/${protectedPage}`);
                await page.waitForURL(/auth\.html\?.*error=login_required/);
                assert.ok(
                    page.url().includes('error=login_required'),
                    `Unauthenticated access to ${protectedPage} must redirect with login_required`
                );
            }
            console.log('  ✓ student.html, employer.html and admin.html all redirect unauthenticated visitors.');
        }

        // -------------------------------------------------------------
        // 10. EMPLOYER REGISTRATION FLOW & CROSS-ROLE PROTECTION
        // -------------------------------------------------------------
        console.log('--- [10/11] Employer registration lands on employer.html ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await openSignupTab(page);

            await page.fill('#signup-name', EMPLOYER.name);
            await page.fill('#signup-email', EMPLOYER.email);
            await page.fill('#signup-password', EMPLOYER.password);
            await page.selectOption('#signup-role', 'employer');
            await page.click('#signup-submit-btn');

            await page.waitForURL('**/employer.html');
            await waitForSession(page, 'employer');

            await page.goto(`${baseUrl}/student.html`);
            await page.waitForURL(/auth\.html\?.*error=unauthorized/);
            assert.ok(page.url().includes('error=unauthorized'), 'Employer on student.html must redirect with unauthorized');
            console.log('  ✓ Employer lands on employer.html and is blocked from student.html.');
        }

        // -------------------------------------------------------------
        // 11. SEEDED ADMIN LOGIN (ADMIN_EMAIL / ADMIN_PASSWORD)
        // -------------------------------------------------------------
        console.log('--- [11/11] Seeded admin can log in and open admin.html ---');
        {
            const page = await newTestPage();
            await page.goto(`${baseUrl}/auth.html`);
            await fillLoginForm(page, ADMIN_EMAIL, ADMIN_PASSWORD);
            await page.click('#login-submit-btn');
            await page.waitForURL('**/admin.html');
            await waitForSession(page, 'admin');
            assert.ok(await getSessionToken(page), 'Admin login must store the server token');
            console.log('  ✓ Seeded admin logs in and reaches the guarded admin console.');
        }

        console.log('\n✅ ALL 11 US35 END-TO-END AUTH FLOW SUITES PASSED CLEANLY!\n');
    } finally {
        for (const context of contexts) {
            await context.close().catch(() => {});
        }
        if (browser) await browser.close();
        await closeServer(apiServer);
        await closeServer(frontendServer);
    }
}

run().catch((error) => {
    console.error('❌ E2E auth flow test failed:', error);
    process.exitCode = 1;
});
