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

async function run() {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined
        });
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        page.setDefaultTimeout(10000);

        // Abort external fonts to keep test fast and reliable
        await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
        await page.route('https://fonts.gstatic.com/**', (route) => route.abort());

        // -------------------------------------------------------------
        // 1. TEST PRODUCT LANDING PAGE & UNIFIED SHELL (index.html)
        // -------------------------------------------------------------
        await page.goto(`http://127.0.0.1:${address.port}/index.html`);
        assert.match(await page.title(), /HuntYourTrack/, 'Landing page title should match HuntYourTrack');
        
        // Initial Default Language must be Arabic (RTL) as instructed
        const initialDir = await page.evaluate(() => document.documentElement.dir);
        assert.equal(initialDir, 'rtl', 'Default initial document direction must be RTL (Arabic)');

        // Hunter Radar Canvas verification
        const canvas = page.locator('#hunter-radar-canvas');
        assert.equal(await canvas.count(), 1, 'Track Hunter Interactive Radar Canvas must exist in Hero');
        
        // Internationalization (i18n) toggle verification
        const langToggle = page.locator('#hyt-lang-toggle');
        assert.equal(await langToggle.count(), 1, 'Language toggle button must be present in header');
        await langToggle.click();
        assert.equal(await page.evaluate(() => document.documentElement.dir), 'ltr', 'Clicking language toggle should switch to English LTR');
        await langToggle.click();
        assert.equal(await page.evaluate(() => document.documentElement.dir), 'rtl', 'Clicking language toggle again should return to Arabic RTL');

        // Theme toggle verification (Dark / Light)
        const themeToggle = page.locator('#hyt-theme-toggle');
        assert.equal(await themeToggle.count(), 1, 'Theme toggle button must be present in header');
        await themeToggle.click();
        assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'dark', 'Theme toggle should activate dark mode');
        await themeToggle.click();
        assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'light', 'Theme toggle should revert to light mode');

        // Pre-seeded Corporate Opportunities verification (US17)
        const oppCards = page.locator('#opportunities-catalog-container .opp-card');
        await page.waitForTimeout(300);
        assert.ok(await oppCards.count() >= 3, 'Pre-seeded opportunities (Vodafone, ITIDA, Valeo) must render in catalog');
        
        // Countdown badges verification
        const countdownBadges = page.locator('.opp-countdown-badge');
        assert.ok(await countdownBadges.count() >= 3, 'All opportunity cards must feature active countdown timers');

        // -------------------------------------------------------------
        // 2. TEST STRICT ROUTE GUARDING (admin.html & student.html)
        // -------------------------------------------------------------
        // Clear session
        await page.evaluate(() => localStorage.clear());

        // 2a. Unauthorized access to admin.html should immediately hard-redirect to auth.html
        await page.goto(`http://127.0.0.1:${address.port}/admin.html`);
        await page.waitForURL(/auth\.html/);
        assert.ok(page.url().includes('auth.html'), 'Strict route guard must redirect unauthenticated access away from admin.html');

        // 2b. Unauthorized access to student.html should immediately hard-redirect to auth.html
        await page.goto(`http://127.0.0.1:${address.port}/student.html`);
        await page.waitForURL(/auth\.html/);
        assert.ok(page.url().includes('auth.html'), 'Strict route guard must redirect unauthenticated access away from student.html');

        // -------------------------------------------------------------
        // 3. TEST AUTH SCREEN & LOGIN LAYOUT (auth.html)
        // -------------------------------------------------------------
        await page.goto(`http://127.0.0.1:${address.port}/auth.html`);
        assert.match(await page.title(), /HuntYourTrack/, 'Auth page title should load');

        // Centered layout verification
        const splitCard = page.locator('.auth-split-card');
        assert.equal(await splitCard.count(), 1, 'Auth page must feature centered split card architecture');
        const cardBox = await splitCard.boundingBox();
        assert.ok(cardBox.width > 300 && cardBox.width <= 980, 'Card width must be constrained and not stretch awkwardly');

        // Password Show/Hide Toggle
        const passwordInput = page.locator('#login-password');
        const passwordToggle = page.locator('#login-form .password-toggle-btn');
        assert.equal(await passwordInput.getAttribute('type'), 'password', 'Password must initially be hidden');
        await passwordToggle.click();
        assert.equal(await passwordInput.getAttribute('type'), 'text', 'Password must unmask to plain text');
        await passwordToggle.click();
        assert.equal(await passwordInput.getAttribute('type'), 'password', 'Password must re-mask');

        // Academic Jury Modal
        await page.locator('#btn-jury-trigger').click();
        const juryDialog = page.locator('#jury-dialog');
        assert.equal(await juryDialog.evaluate(d => d.open), true, 'Academic Jury modal should open');
        
        // Select Student Persona via Jury Modal
        await page.evaluate(() => selectJuryPersona('student'));
        await page.waitForURL(/student\.html/);
        assert.ok(page.url().includes('student.html'), 'Selecting Student persona should navigate to student.html');

        // -------------------------------------------------------------
        // 4. TEST STUDENT CAREER HUB & ROLE ISOLATION (student.html)
        // -------------------------------------------------------------
        // Verify NO Admin or UI Kit links exist in student navigation
        const adminLinksInStudent = await page.locator('header.navbar a[href="admin.html"]').count();
        assert.equal(adminLinksInStudent, 0, 'Role Isolation: student.html header must NEVER contain admin.html links');

        const uiKitLinksInStudent = await page.locator('header.navbar a[href="components.html"]').count();
        assert.equal(uiKitLinksInStudent, 0, 'Role Isolation: student.html header must NEVER contain components.html (UI Kit) links');

        // Multi-Faculty & Department Selector verification
        const facSelect = page.locator('#student-faculty-select');
        assert.equal(await facSelect.count(), 1, 'Multi-faculty dropdown must exist in student portal');
        await facSelect.selectOption('engineering');
        await page.evaluate(() => onStudentFacultyChange('engineering'));
        const deptOptions = await page.locator('#student-dept-select option').allInnerTexts();
        assert.ok(deptOptions.some(d => d.includes('هندسة')), 'Department options must dynamically update for Engineering');

        // CV upload simulation
        await page.locator('.cv-drop-zone').click();
        await page.waitForTimeout(1400);
        const cvStatus = await page.locator('#cv-status-text').textContent();
        assert.ok(cvStatus.includes('تم رفع السيرة الذاتية بنجاح'), 'CV upload simulation should confirm successful alignment');

        // -------------------------------------------------------------
        // 5. TEST AUTHORIZED ADMIN CONSOLE (admin.html)
        // -------------------------------------------------------------
        await page.evaluate(() => {
            localStorage.setItem('user', 'admin');
            localStorage.setItem('role', 'admin');
            localStorage.setItem('user_email', 'elabsy@damanhour.edu.eg');
        });
        await page.goto(`http://127.0.0.1:${address.port}/admin.html`);
        assert.ok(page.url().includes('admin.html'), 'Authorized admin must be granted access to admin.html');
        assert.equal(await page.locator('.kpi-card').count(), 4, 'Four KPI summary cards must render for Admin');

        // -------------------------------------------------------------
        // 6. MULTI-DEVICE RESPONSIVENESS & TOUCH TARGETS (US15 + US17)
        // -------------------------------------------------------------
        // 6a. Mobile 375px
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`http://127.0.0.1:${address.port}/index.html`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, 'Landing page should have zero horizontal overflow on 375px mobile');

        const mobileToggle = page.locator('#mobile-toggle');
        assert.equal(await mobileToggle.isVisible(), true, 'Hamburger menu should be visible on 375px');
        const box = await mobileToggle.boundingBox();
        assert.ok(box.width >= 44 && box.height >= 44, 'Mobile hamburger toggle must have minimum 44x44px touch target');

        // 6b. Mobile Auth Screen
        await page.goto(`http://127.0.0.1:${address.port}/auth.html`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, 'Auth page should have zero horizontal overflow on 375px mobile');

        console.log('✅ All US17 smoke assertions passed: Unified portal, Track Hunter canvas, bilingual i18n, dark/light themes, strict route guarding, role isolation, multi-faculty selector, pre-seeded opportunities, and responsive layouts.');
    } finally {
        if (browser) await browser.close();
        if (server.listening) {
            await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
        }
    }
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
