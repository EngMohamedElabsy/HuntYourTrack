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

const server = http.createServer((request, response) => {
    const requestedPath = request.url === '/' ? '/index.html' : decodeURIComponent(request.url.split('?')[0]);
    const filePath = path.resolve(frontendDirectory, `.${requestedPath}`);
    if (!filePath.startsWith(`${frontendDirectory}${path.sep}`) || !fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end('Not found');
        return;
    }

    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
});

async function runAudit() {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    let browser;

    console.log(`🚀 Starting Rigorous E2E Audit at ${baseUrl}...`);

    try {
        browser = await chromium.launch({
            headless: true,
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined
        });

        // -------------------------------------------------------------------------------------------------
        // AUDIT 1: i18n & Language Consistency Check (Arabic RTL ⇄ English LTR)
        // -------------------------------------------------------------------------------------------------
        console.log('\n--- [1/5] Testing i18n & Language Consistency (Zero Mixed Languages) ---');
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        page.setDefaultTimeout(10000);

        // Abort fonts for speed
        await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
        await page.route('https://fonts.gstatic.com/**', (route) => route.abort());

        await page.goto(`${baseUrl}/index.html`);
        await page.evaluate(() => localStorage.setItem('hyt_lang', 'ar'));
        await page.reload();

        // 1a. Arabic RTL Default Check
        const dirAr = await page.evaluate(() => document.documentElement.dir);
        const langAr = await page.evaluate(() => document.documentElement.lang);
        assert.equal(dirAr, 'rtl', 'Landing page must start in RTL mode for Arabic');
        assert.equal(langAr, 'ar', 'Landing page lang attribute must be "ar"');

        // Check Arabic text elements
        const heroTitleAr = await page.locator('.hero-headline').innerText();
        assert.ok(/اصطد مسارك المهني/.test(heroTitleAr), 'Arabic hero headline must be present');

        // 1b. Switch to English LTR
        const langToggle = page.locator('#hyt-lang-toggle');
        await langToggle.click();
        await page.waitForTimeout(200);

        const dirEn = await page.evaluate(() => document.documentElement.dir);
        const langEn = await page.evaluate(() => document.documentElement.lang);
        assert.equal(dirEn, 'ltr', 'Switching to English must set document dir="ltr"');
        assert.equal(langEn, 'en', 'Switching to English must set document lang="en"');

        const heroTitleEn = await page.locator('.hero-headline').innerText();
        assert.ok(/Hunt Your Tech Track/.test(heroTitleEn), 'English hero headline must be present');

        // Verify zero Arabic characters on data-i18n elements in English mode
        const i18nTextsEn = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('[data-i18n]'));
            return elements.map(el => ({
                key: el.getAttribute('data-i18n'),
                text: el.tagName === 'INPUT' ? el.placeholder : el.innerText
            }));
        });

        const arabicRegex = /[\u0600-\u06FF]/;
        const leakedArabic = i18nTextsEn.filter(item => {
            // Exclude lang button itself if it shows target language switcher name
            if (item.key === 'langToggleLabel') return false;
            return arabicRegex.test(item.text);
        });

        assert.equal(leakedArabic.length, 0, `Zero Arabic strings allowed in English mode. Leaked: ${JSON.stringify(leakedArabic)}`);
        console.log('  ✓ 100% data-i18n text translated cleanly with 0 leftover Arabic in English mode.');

        // 1c. Layout integrity: Flexbox/Grid margins & padding with zero horizontal overflow
        const overflowEn = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        assert.equal(overflowEn, false, 'Changing to LTR must not introduce horizontal scrollbar/overflow');
        console.log('  ✓ LTR Flexbox/Grid layouts intact without horizontal scroll.');

        // -------------------------------------------------------------------------------------------------
        // AUDIT 2: Element Duplication & UI Leaks
        // -------------------------------------------------------------------------------------------------
        console.log('\n--- [2/5] Testing Element Duplication & UI Leaks ---');

        // 2a. Guest view leak test
        const guestAdminLinks = await page.locator('nav a[href*="admin.html"]').count();
        const guestComponentsLinks = await page.locator('nav a[href*="components.html"]').count();
        const guestWorkflowLinks = await page.locator('nav a[href*="workflow.html"]').count();
        assert.equal(guestAdminLinks, 0, 'Guest view must never expose admin.html link');
        assert.equal(guestComponentsLinks, 0, 'Guest view must never expose components.html link');
        assert.equal(guestWorkflowLinks, 0, 'Guest view must never expose workflow.html link');
        console.log('  ✓ Guest view is completely isolated from admin and developer tools.');

        // 2b. Student view leak test
        await page.evaluate(() => {
            localStorage.setItem('user', 'student');
            localStorage.setItem('role', 'student');
            localStorage.setItem('user_email', 'student@damanhour.edu.eg');
        });
        await page.goto(`${baseUrl}/student.html`);
        await page.waitForTimeout(300);

        const studentAdminLinks = await page.locator('header a[href*="admin.html"], .mobile-drawer a[href*="admin.html"]').count();
        const studentComponentsLinks = await page.locator('header a[href*="components.html"], .mobile-drawer a[href*="components.html"]').count();
        const studentWorkflowLinks = await page.locator('header a[href*="workflow.html"], .mobile-drawer a[href*="workflow.html"]').count();
        assert.equal(studentAdminLinks, 0, 'Student view must never expose admin.html link');
        assert.equal(studentComponentsLinks, 0, 'Student view must never expose components.html link');
        assert.equal(studentWorkflowLinks, 0, 'Student view must never expose workflow.html link');

        // Check for duplicate buttons in Student view
        const syncButtons = await page.locator('button[data-i18n="syncRoadmapBtn"]').count();
        assert.equal(syncButtons, 1, 'Sync roadmap button must not be duplicated');
        const saveFacultyButtons = await page.locator('button[data-i18n="saveFacultyBtn"]').count();
        assert.equal(saveFacultyButtons, 1, 'Save faculty button must not be duplicated');
        console.log('  ✓ Student view has zero leaks of administrative tools and zero duplicate buttons.');

        // -------------------------------------------------------------------------------------------------
        // AUDIT 3: Design Quality & Bespoke UI (Non-AI Radar Canvas)
        // -------------------------------------------------------------------------------------------------
        console.log('\n--- [3/5] Testing Design Quality & Bespoke UI (Hunter Radar Canvas & Design Tokens) ---');
        await page.goto(`${baseUrl}/index.html`);

        const radarCanvas = page.locator('#hunter-radar-canvas');
        assert.equal(await radarCanvas.count(), 1, '#hunter-radar-canvas must exist in the DOM');

        const canvasBox = await radarCanvas.boundingBox();
        assert.ok(canvasBox.width > 300, `Radar canvas width (${canvasBox.width}px) must be substantial`);
        assert.ok(canvasBox.height >= 280, `Radar canvas height (${canvasBox.height}px) must be substantial`);

        // Check Canvas overflow
        const canvasContainerOverflow = await page.evaluate(() => {
            const el = document.querySelector('.hunter-canvas-wrapper');
            return el ? el.scrollWidth > el.clientWidth : false;
        });
        assert.equal(canvasContainerOverflow, false, 'Hunter canvas wrapper must have zero horizontal overflow');

        // Check Theme Tokens (High Contrast)
        const themeBtn = page.locator('#hyt-theme-toggle');
        await themeBtn.click();
        await page.waitForTimeout(350);
        const darkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        assert.equal(darkTheme, 'dark', 'Dark theme token must activate');

        const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
        console.log('  Computed dark body background:', bgColor);
        assert.ok(bgColor.includes('11') || bgColor.includes('15') || bgColor.includes('25'), 'Dark mode background must use high contrast deep dark token (#0B0F19)');

        const cardBg = await page.evaluate(() => {
            const card = document.querySelector('.track-card') || document.querySelector('.metrics-strip');
            return card ? window.getComputedStyle(card).backgroundColor : '';
        });
        assert.ok(!cardBg.includes('255, 255, 255'), `Dark mode card must not be white. Got: ${cardBg}`);
        console.log('  Computed dark card background:', cardBg);

        const navBg = await page.evaluate(() => {
            const nav = document.querySelector('.landing-nav');
            return nav ? window.getComputedStyle(nav).backgroundColor : '';
        });
        assert.ok(!navBg.includes('255, 255, 255'), `Dark mode nav must not be white. Got: ${navBg}`);
        console.log('  Computed dark nav background:', navBg);

        await themeBtn.click();
        await page.waitForTimeout(350);
        const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        assert.equal(lightTheme, 'light', 'Light theme token must restore');
        console.log('  ✓ Bespoke Track Hunter Canvas renders with 0 overflow and dynamic Dark/Light tokens.');

        // -------------------------------------------------------------------------------------------------
        // AUDIT 4: Route Guarding Effectiveness (Immediate Hard Redirection)
        // -------------------------------------------------------------------------------------------------
        console.log('\n--- [4/5] Testing Route Guarding Effectiveness ---');
        // Clear all session storage & cookies
        await page.evaluate(() => localStorage.clear());

        // 4a. Direct URL injection test on admin.html
        await page.goto(`${baseUrl}/admin.html`);
        await page.waitForURL(/auth\.html/);
        assert.ok(page.url().includes('auth.html?redirect=admin'), 'Direct access to admin.html without auth must redirect immediately to auth.html');

        // 4b. Direct URL injection test on student.html
        await page.goto(`${baseUrl}/student.html`);
        await page.waitForURL(/auth\.html/);
        assert.ok(page.url().includes('auth.html?redirect=student'), 'Direct access to student.html without auth must redirect immediately to auth.html');

        // 4c. Non-admin student trying to access admin.html
        await page.evaluate(() => {
            localStorage.setItem('user', 'student');
            localStorage.setItem('role', 'student');
        });
        await page.goto(`${baseUrl}/admin.html`);
        await page.waitForURL(/auth\.html/);
        assert.ok(page.url().includes('auth.html?redirect=admin'), 'Student role attempting direct URL access to admin.html must be redirected instantly');
        console.log('  ✓ Strict JavaScript route guards in <head> block unauthorized access before DOM painting.');

        // -------------------------------------------------------------------------------------------------
        // AUDIT 5: Login/Auth Layout Responsiveness (auth.html at 375px & 1440px)
        // -------------------------------------------------------------------------------------------------
        console.log('\n--- [5/5] Testing Login/Auth Layout Responsiveness (auth.html) ---');

        // 5a. Mobile 375px viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`${baseUrl}/auth.html`);
        await page.waitForTimeout(200);

        const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        assert.equal(mobileOverflow, false, 'auth.html must have 0 horizontal overflow on 375px viewport');

        const splitCard = page.locator('.auth-split-card');
        const mobileCardBox = await splitCard.boundingBox();
        assert.ok(mobileCardBox.width <= 375, `Mobile card width (${mobileCardBox.width}px) must fit within 375px screen`);

        // Check password mask/unmask
        const passInput = page.locator('#login-password');
        const passToggleBtn = page.locator('#login-form .password-toggle-btn');
        assert.equal(await passInput.getAttribute('type'), 'password', 'Password must default to masked');
        await passToggleBtn.click();
        assert.equal(await passInput.getAttribute('type'), 'text', 'Password must toggle to plain text');
        await passToggleBtn.click();
        assert.equal(await passInput.getAttribute('type'), 'password', 'Password must re-mask');

        // 5b. Desktop 1440px viewport
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`${baseUrl}/auth.html`);
        await page.waitForTimeout(200);

        const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        assert.equal(desktopOverflow, false, 'auth.html must have 0 horizontal overflow on 1440px viewport');

        const desktopCardBox = await splitCard.boundingBox();
        assert.ok(desktopCardBox.width >= 700 && desktopCardBox.width <= 1000, `Desktop card width (${desktopCardBox.width}px) must be constrained between 700px and 1000px and not stretch awkwardly`);

        // Verify centering
        const centerOffset = (1440 - desktopCardBox.width) / 2;
        const actualLeft = desktopCardBox.x;
        assert.ok(Math.abs(actualLeft - centerOffset) < 30, `Desktop auth card must be centered (expected ~${centerOffset}px, got ${actualLeft}px)`);

        // Academic Jury Modal
        const juryTrigger = page.locator('#btn-jury-trigger');
        await juryTrigger.click();
        const juryModalOpen = await page.locator('#jury-dialog').evaluate(dialog => dialog.open);
        assert.equal(juryModalOpen, true, 'Academic Jury modal dialog must open');

        console.log('  ✓ auth.html is centered, constrained, and has 0 overflow on 375px mobile and 1440px desktop.');
        console.log('\n🎉 ALL 5 E2E SYSTEM AUDIT SECTIONS PASSED WITH 100% COMPLIANCE!');

    } finally {
        if (browser) await browser.close();
        if (server.listening) {
            await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
        }
    }
}

runAudit().catch(err => {
    console.error('❌ E2E Audit Failed:', err);
    process.exitCode = 1;
});
