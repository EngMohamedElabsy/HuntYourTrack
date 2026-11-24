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

const frontendDir = path.resolve(__dirname, '../frontend');
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    let filePath = path.join(frontendDir, reqPath);
    if (filePath.endsWith('/') || filePath.endsWith(frontendDir)) {
        filePath = path.join(filePath, 'index.html');
    }
    if (!path.extname(filePath)) filePath += '.html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(content);
    });
});

async function run() {
    console.log('🚀 Running User Flow Verification Test with Playwright...');
    const port = await new Promise((resolve) => {
        server.listen(0, '127.0.0.1', () => {
            resolve(server.address().port);
        });
    });
    const serverUrl = `http://127.0.0.1:${port}`;
    console.log(`📡 Static server running on ${serverUrl}`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    try {
        // 1. Section order
        console.log('Checking Section Order: Courses before Opportunities...');
        await page.goto(`${serverUrl}/index.html`);
        await page.waitForLoadState('networkidle');

        const coursesTop = await page.$eval('#courses', el => el.getBoundingClientRect().top);
        const oppsTop = await page.$eval('#opportunities', el => el.getBoundingClientRect().top);
        assert(coursesTop < oppsTop, `Expected #courses (${coursesTop}) to be above #opportunities (${oppsTop})`);
        console.log('  ✓ Courses section is positioned above Opportunities.');

        // 2. Statistics metrics
        console.log('Checking Platform Statistics Metrics...');
        const stripText = await page.$eval('.metrics-strip', el => el.innerText);
        assert(stripText.includes('12+'), 'Metrics should include 12+ career tracks');
        assert(stripText.includes('5'), 'Metrics should include 5 faculties');
        assert(stripText.includes('50+'), 'Metrics should include 50+ opportunities');
        assert(stripText.includes('100%'), 'Metrics should include 100% free access');
        console.log('  ✓ Platform statistics verified with accurate counts.');

        // 3. Employer single CTA button
        console.log('Checking Employer Section Primary CTA...');
        const empBtnText = await page.$eval('#employers a.btn-primary', el => el.innerText);
        const empBtnHref = await page.$eval('#employers a.btn-primary', el => el.getAttribute('href'));
        assert(empBtnHref.includes('pages/employer.html'), 'Employer button should link to pages/employer.html');
        console.log(`  ✓ Employer CTA verified: "${empBtnText.trim()}" -> ${empBtnHref}`);

        // 4. Command search query
        console.log('Checking Command Search Palette...');
        await page.click('#nav-search-bar');
        await page.fill('#cmd-search-input', 'software');
        await page.waitForTimeout(300);
        const searchResults = await page.$eval('#cmd-results-list', el => el.innerText);
        assert(!searchResults.toLowerCase().includes('undefined'), 'Search results must not contain undefined');
        assert(searchResults.toLowerCase().includes('full-stack'), 'Search results should contain Full-Stack');
        console.log('  ✓ Command search palette returns clean results without "undefined".');

        // 5. Opportunities Apply button target
        console.log('Checking Opportunities Apply Link...');
        const applyBtn = await page.$('.opp-card .opp-footer-actions a.btn-primary');
        assert(applyBtn, 'Apply button should be an anchor element');
        const target = await applyBtn.getAttribute('target');
        const href = await applyBtn.getAttribute('href');
        assert.equal(target, '_blank', 'Apply link should open in a new tab');
        assert(/^https?:\/\//.test(href), `Apply link should be a valid URL, got ${href}`);
        console.log(`  ✓ Opportunities Apply link opens in new tab (${href}).`);

        // 6. Offline login & saved email
        console.log('Checking Offline Auth & Saved Email Account Switcher...');
        await page.goto(`${serverUrl}/pages/auth.html`);
        await page.waitForLoadState('networkidle');

        await page.fill('#login-email', 'student@damanhour.edu.eg');
        await page.fill('#login-password', 'StudentPass2026!');
        await page.click('#login-submit-btn');

        // Should successfully redirect to student.html even with NO backend running on port 3000!
        await page.waitForURL('**/pages/student.html', { timeout: 8000 });
        assert(page.url().includes('student.html'), 'Should redirect to student.html');
        console.log('  ✓ Offline simulated login successfully authenticated student.');

        // Return to auth.html and check saved email picker
        await page.goto(`${serverUrl}/pages/auth.html`);
        await page.waitForSelector('#saved-accounts-container', { state: 'visible' });
        const savedText = await page.$eval('#saved-accounts-container', el => el.innerText);
        assert(savedText.includes('student@damanhour.edu.eg'), 'Saved accounts should display logged-in email');
        console.log('  ✓ Logged-in email was saved locally for quick selection.');

        // Click saved email chip
        await page.fill('#login-email', '');
        await page.click('#saved-accounts-container button.tag-pill');
        const filledEmail = await page.$eval('#login-email', el => el.value);
        assert.equal(filledEmail, 'student@damanhour.edu.eg');
        console.log('  ✓ Clicking saved account chip auto-fills email input.');

        console.log('\n🎉 ALL USER FLOW PLAYWRIGHT VERIFICATION CHECKS PASSED WITH 100% SUCCESS!');
    } finally {
        await browser.close();
        server.close();
    }
}

run().catch((err) => {
    console.error('❌ Test failed:', err);
    process.exit(1);
});
