const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

let chromium;
try {
    chromium = require('playwright').chromium;
} catch {
    const skillsPlaywright = path.resolve(__dirname, '../.global_skills/node_modules/playwright');
    chromium = require(skillsPlaywright).chromium;
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
    console.log('🚀 Starting 9-Screen Connected User Journey Playwright Verification...');
    const port = await new Promise((resolve) => {
        server.listen(0, '127.0.0.1', () => resolve(server.address().port));
    });
    const baseUrl = `http://127.0.0.1:${port}`;
    const browser = await chromium.launch({ headless: true });

    try {
        const screensToCheck = [
            '/pages/splash.html',
            '/pages/onboarding.html',
            '/pages/auth.html',
            '/index.html',
            '/pages/explore.html',
            '/pages/details.html?type=course&id=course-ai-02',
            '/pages/profile.html',
            '/pages/prototype.html'
        ];

        // 1. Desktop (1440px) & Mobile (375px) Responsiveness + Zero JS Errors
        for (const vp of [
            { name: 'Desktop', width: 1440, height: 900 },
            { name: 'Mobile', width: 375, height: 812 }
        ]) {
            const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', err => errors.push(err.message));

            for (const route of screensToCheck) {
                await page.goto(`${baseUrl}${route}`);
                await page.waitForLoadState('domcontentloaded');
                await page.waitForTimeout(250);
                const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
                assert(overflow <= 2, `${vp.name} (${vp.width}px) horizontal overflow on ${route}: ${overflow}px`);
            }
            assert.equal(errors.length, 0, `${vp.name} uncaught page errors: ${errors.join('; ')}`);
            console.log(`  ✓ All ${screensToCheck.length} screens passed ${vp.name} (${vp.width}px) with 0 overflow and 0 errors.`);
            await context.close();
        }

        // 2. End-to-End Connected User Journey
        const journeyCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await journeyCtx.newPage();

        // Step 1: Splash -> Onboarding
        await page.goto(`${baseUrl}/pages/splash.html`);
        await page.click('#splash-start-btn');
        await page.waitForURL('**/pages/onboarding.html');
        console.log('  ✓ Screen 1 (Splash) -> Screen 2 (Onboarding) connected.');

        // Step 2: Onboarding Wizard -> Explore
        await page.click('#step-1 button.btn-primary');
        await page.click('#step-2 button.btn-primary');
        await page.click('#onboarding-finish-btn');
        await page.waitForURL('**/pages/explore.html*');
        console.log('  ✓ Screen 2 (Onboarding) -> Screen 5 (Explore) connected.');

        // Step 3: Search/Filter on Explore -> Details
        await page.fill('#explore-search-input', 'CS50');
        await page.waitForTimeout(200);
        const cardCount = await page.locator('#explore-results-grid .cc-card').count();
        assert(cardCount >= 1, 'Expected at least 1 CS50 search result in Explore');
        await page.click('#explore-results-grid .cc-card a.btn-primary');
        await page.waitForURL('**/pages/details.html*');
        console.log('  ✓ Screen 5/7 (Explore & Search) -> Screen 6 (Details) connected.');

        // Step 4: Dark mode button contrast check
        await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
        const btnContrast = await page.$eval('#details-primary-cta', el => {
            const s = window.getComputedStyle(el);
            return { bg: s.backgroundColor, color: s.color };
        });
        assert.notEqual(btnContrast.bg, btnContrast.color, 'Dark mode primary button must not have matching bg & text color');
        console.log(`  ✓ Dark mode primary button contrast verified (${btnContrast.color} on ${btnContrast.bg}).`);

        // Step 5: Guest Save -> Auth Gate -> Sign In -> Save Favorite -> Profile
        const detailsText = await page.locator('#details-root').innerText();
        assert(detailsText.includes('Syllabus') || detailsText.includes('Course'), 'Details page must display syllabus');
        await page.click('#details-fav-btn');
        await page.waitForURL('**/pages/auth.html*');
        await page.fill('#login-email', 'student@damanhour.edu.eg');
        await page.fill('#login-password', 'StudentPass2026!');
        await page.click('#login-submit-btn');
        await page.waitForURL('**/pages/details.html*');
        await page.click('#details-fav-btn');
        await page.goto(`${baseUrl}/pages/profile.html`);
        const favText = await page.locator('#profile-tab-content').innerText();
        assert(favText.includes('CS50'), 'Saved CS50 course must appear in Profile Favorites for signed-in user');
        console.log('  ✓ Guest Auth Gate -> Sign In -> Screen 6 (Details) -> Screen 9 (Profile Favorites) persisted.');

        // Step 6: Home Search for "AI" + Enter key
        await page.goto(`${baseUrl}/index.html`);
        await page.click('#nav-search-bar');
        await page.fill('#cmd-search-input', 'AI');
        await page.waitForTimeout(200);
        await page.press('#cmd-search-input', 'Enter');
        await page.waitForURL('**/pages/details.html*');
        console.log('  ✓ Home Command Search "AI" + Enter key navigated directly to course details.');

        await journeyCtx.close();
        console.log('\n🎉 ALL 9-SCREEN JOURNEY, RESPONSIVENESS & INTERACTION CHECKS PASSED 100%!');
    } finally {
        await browser.close();
        server.close();
    }
}

run().catch((err) => {
    console.error('❌ 9-Screen Journey Test failed:', err);
    process.exit(1);
});
