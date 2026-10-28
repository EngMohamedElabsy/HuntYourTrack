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

const artifactDir = '/home/elabsy/.gemini/antigravity/brain/f27f126d-ea94-41a5-8baf-223dfcb25887';
const frontendDir = path.resolve(__dirname, '../frontend');
const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    const safePath = path.normalize(req.url.split('?')[0]).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(frontendDir, safePath === '/' ? 'index.html' : safePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

async function run() {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    console.log(`[✓] Test server listening on http://127.0.0.1:${port}`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    console.log('--- 1. Testing Auth Screen (auth.html) ---');
    await page.goto(`http://127.0.0.1:${port}/auth.html`);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '01_auth_login.png') });
    console.log('[✓] Captured: 01_auth_login.png');

    console.log('--- 2. Testing 1-Click Demo Quick Fill ---');
    await page.locator('.btn-demo-chip').first().click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, '02_auth_demo_filled.png') });
    console.log('[✓] Captured: 02_auth_demo_filled.png');

    console.log('--- 3. Testing Create Account Sliding Tab ---');
    await page.locator('#btn-signup').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '03_auth_signup_tab.png') });
    console.log('[✓] Captured: 03_auth_signup_tab.png');

    console.log('--- 4. Testing Sign-In Execution & Redirect ---');
    await page.locator('#btn-login').click();
    await page.waitForTimeout(300);
    await page.locator('.btn-demo-chip').first().click();
    await page.locator('#login-form button[type="submit"]').click();
    await page.waitForTimeout(2200);

    console.log('--- 5. Testing Student Portal (index.html) ---');
    await page.screenshot({ path: path.join(artifactDir, '04_student_portal.png') });
    console.log('[✓] Captured: 04_student_portal.png');

    console.log('--- 6. Testing Admin Executive Console (admin.html) ---');
    await page.goto(`http://127.0.0.1:${port}/admin.html`);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '05_admin_console.png') });
    console.log('[✓] Captured: 05_admin_console.png');

    console.log('--- 7. Testing Corporate Accreditation Queue & Document Modal ---');
    await page.locator('button[data-tab="verification"]').click();
    await page.waitForTimeout(400);
    await page.locator('.doc-link-btn').first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, '06_admin_verification_modal.png') });
    console.log('[✓] Captured: 06_admin_verification_modal.png');

    console.log('--- 8. Testing Connected Architecture & System Workflow Map ---');
    await page.goto(`http://127.0.0.1:${port}/workflow.html`);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '07_connected_workflow_map.png') });
    console.log('[✓] Captured: 07_connected_workflow_map.png');

    await browser.close();
    server.close();
    console.log('\n[SUCCESS] Comprehensive CLI verification completed! All 7 screenshots generated successfully.');
}

run().catch((err) => {
    console.error('[ERROR]', err);
    process.exit(1);
});
