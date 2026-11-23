/**
 * HuntYourTrack - Modular Backend Architecture & Hybrid Database Integration Test Suite (US38)
 * Pure Node.js test runner (zero external dependencies)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const { createServer } = require('../backend/server');

const TEST_PORT = 3999;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

function makeRequest(method, endpoint, headers = {}, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(endpoint, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, res => {
            let resBody = '';
            res.on('data', chunk => { resBody += chunk; });
            res.on('end', () => {
                let json = null;
                try {
                    json = JSON.parse(resBody);
                } catch {
                    json = resBody;
                }
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: json
                });
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(typeof body === 'string' ? body : JSON.stringify(body));
        }
        req.end();
    });
}

async function runTestSuite() {
    console.log('🧪 Starting US38 Modular Backend & Hybrid Database Verification Audit...');

    const server = createServer();
    await new Promise(resolve => server.listen(TEST_PORT, resolve));

    try {
        // [1/8] Health Check Endpoint
        console.log('--- [1/8] Testing /api/v1/health ---');
        const healthRes = await makeRequest('GET', '/api/v1/health');
        assert.strictEqual(healthRes.status, 200, 'Health check must return 200');
        assert.strictEqual(healthRes.data.status, 'ok', 'Status must be ok');
        assert.strictEqual(healthRes.data.architecture, 'modular (routes/controllers/middleware)');
        console.log('  ✓ Modular server health check verified.');

        // [2/8] CORS Middleware
        console.log('--- [2/8] Testing CORS & Preflight Middleware ---');
        const corsRes = await makeRequest('OPTIONS', '/api/v1/courses');
        assert.strictEqual(corsRes.status, 204, 'CORS preflight OPTIONS must return 204');
        assert.strictEqual(corsRes.headers['access-control-allow-origin'], '*');
        console.log('  ✓ CORS middleware headers verified.');

        // [3/8] Courses Modular Router & Catalog
        console.log('--- [3/8] Testing Courses Modular Router (/api/v1/courses) ---');
        const coursesRes = await makeRequest('GET', '/api/v1/courses');
        assert.strictEqual(coursesRes.status, 200);
        assert.strictEqual(coursesRes.data.success, true);
        assert(coursesRes.data.count > 0, 'Courses count should be > 0');

        const trackFilterRes = await makeRequest('GET', '/api/v1/courses?track=ai-deeplearning');
        assert.strictEqual(trackFilterRes.status, 200);
        assert(trackFilterRes.data.courses.every(c => c.track === 'ai-deeplearning'));
        console.log('  ✓ Courses router and filtering verified.');

        // [4/8] Opportunities Modular Router & Applications
        console.log('--- [4/8] Testing Opportunities Router (/api/v1/opportunities) ---');
        const oppsRes = await makeRequest('GET', '/api/v1/opportunities');
        assert.strictEqual(oppsRes.status, 200);
        assert.strictEqual(oppsRes.data.success, true);
        assert(oppsRes.data.count >= 5, 'Opportunities count should be >= 5 multi-faculty postings');

        const applyRes = await makeRequest('POST', '/api/v1/opportunities/apply', {}, {
            opportunityId: 'opp-vois-2026',
            applicantEmail: 'student@fci.dmu.edu.eg',
            resumeText: 'Python, Docker, Kubernetes experience'
        });
        assert.strictEqual(applyRes.status, 201);
        assert.strictEqual(applyRes.data.success, true);
        assert(applyRes.data.application.id.startsWith('app_'));
        console.log('  ✓ Opportunities router and application pipeline verified.');

        // [5/8] CV ATS Parser & Domain Keyword Matching
        console.log('--- [5/8] Testing CV ATS Keyword Matcher (/api/v1/cv/parse-keywords) ---');
        const cvRes = await makeRequest('POST', '/api/v1/cv/parse-keywords', {}, {
            text: 'I have strong skills in PyTorch, Python, Deep Learning, and Computer Vision with OpenCV and YOLO models.'
        });
        assert.strictEqual(cvRes.status, 200);
        assert.strictEqual(cvRes.data.success, true);
        assert.strictEqual(cvRes.data.recommendedTrack, 'ai-deeplearning');
        assert(cvRes.data.totalMatches >= 4, 'Should detect at least 4 keywords');
        assert(cvRes.data.atsMatchScore > 0, 'ATS match score should be > 0');
        console.log('  ✓ ATS domain matching and track recommendation verified.');

        // [6/8] Auth & RBAC Modular Controller
        console.log('--- [6/8] Testing Auth & Session Flow (/api/v1/auth) ---');
        const regRes = await makeRequest('POST', '/api/v1/auth/register', {}, {
            email: 'newstudent@university.edu.eg',
            name: 'Ali Ahmed',
            role: 'student'
        });
        assert.strictEqual(regRes.status, 201);
        assert.strictEqual(regRes.data.success, true);
        assert(regRes.data.token.startsWith('student:'));

        const meRes = await makeRequest('GET', '/api/v1/auth/me', {
            'Authorization': `Bearer ${regRes.data.token}`
        });
        assert.strictEqual(meRes.status, 200);
        assert.strictEqual(meRes.data.user.role, 'student');
        console.log('  ✓ Auth registration and Bearer session verification verified.');

        // [7/8] Hybrid Database SQL Schemas Integrity
        console.log('--- [7/8] Testing Modular SQL Schemas (database/sql/) ---');
        const sqlFiles = [
            '001_users_rbac.sql',
            '002_student_profiles.sql',
            '003_sessions.sql',
            '004_applications.sql',
            '005_courses_catalog.sql'
        ];
        for (const file of sqlFiles) {
            const p = path.join(__dirname, '..', 'database', 'sql', file);
            assert(fs.existsSync(p), `Missing SQL schema file: ${file}`);
            const content = fs.readFileSync(p, 'utf-8');
            assert(content.includes('CREATE TABLE'), `${file} must contain CREATE TABLE statement`);
        }
        console.log('  ✓ All 5 modular SQL DDL schemas validated.');

        // [8/8] Hybrid Database NoSQL Catalogs Integrity
        console.log('--- [8/8] Testing Modular NoSQL Catalogs (database/nosql/) ---');
        const nosqlFiles = ['ats_keywords.json', 'opportunities.json', 'courses-catalog.json'];
        for (const file of nosqlFiles) {
            const p = path.join(__dirname, '..', 'database', 'nosql', file);
            assert(fs.existsSync(p), `Missing NoSQL file: ${file}`);
            const content = JSON.parse(fs.readFileSync(p, 'utf-8'));
            assert(content !== null && typeof content === 'object', `${file} must be valid JSON`);
        }
        console.log('  ✓ All 3 modular NoSQL JSON catalogs validated.');

        console.log('\n🎉 ALL 8 US38 MODULAR BACKEND & DATABASE TESTS PASSED WITH 100% COMPLIANCE!\n');
    } finally {
        server.close();
    }
}

if (require.main === module) {
    runTestSuite().catch(err => {
        console.error('❌ US38 Test Suite Failed:', err);
        process.exit(1);
    });
}

module.exports = { runTestSuite };
