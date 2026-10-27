const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const frontendDirectory = path.resolve(__dirname, '../../frontend');
const requests = [];
const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8'
};

const gsapStub = `
    window.__gsapCalls = [];
    const elements = (target) => Array.isArray(target) ? target : [target];
    const apply = (element, values) => {
        const state = Object.assign({ x: 0, y: 0, xPercent: 0, yPercent: 0 }, element.__testGsapState, values);
        element.__testGsapState = state;
        if ('opacity' in values) element.style.opacity = values.opacity;
        if ('background' in values) element.style.background = values.background;
        element.style.transform = 'translate(calc(' + state.xPercent + '% + ' + state.x + 'px), calc(' + state.yPercent + '% + ' + state.y + 'px))';
    };
    window.gsap = {
        from() {},
        set(target, values) { elements(target).forEach((element) => apply(element, values)); },
        killTweensOf() {},
        timeline() {
            return {
                kill() {},
                to(target, values) {
                    elements(target).forEach((element) => {
                        window.__gsapCalls.push({ id: element.id, values });
                        apply(element, values);
                    });
                    return this;
                }
            };
        }
    };
`;

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url.startsWith('/api/auth/')) {
        let body = '';
        request.setEncoding('utf8');
        request.on('data', (chunk) => { body += chunk; });
        request.on('end', () => {
            const mode = request.url.split('/').at(-1);
            const payload = JSON.parse(body);
            requests.push({ mode, body: payload });
            const isDuplicateEmail = payload.email === 'taken@example.edu';
            response.writeHead(isDuplicateEmail ? 409 : 200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(isDuplicateEmail
                ? { message: 'That email is already registered.' }
                : {
                    message: mode === 'password-reset' ? 'If that address is registered, a reset link will be sent.' : 'Request accepted.',
                    redirectTo: mode === 'login' ? 'https://example.invalid/redirect' : undefined
                }));
        });
        return;
    }

    const requestedPath = request.url === '/' ? '/auth.html' : decodeURIComponent(request.url.split('?')[0]);
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
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));
        await page.route('https://cdnjs.cloudflare.com/**', (route) => route.fulfill({
            status: 200,
            contentType: 'application/javascript',
            body: gsapStub
        }));
        await page.route('https://fonts.googleapis.com/**', (route) => route.abort());

        await page.goto(`http://127.0.0.1:${address.port}/auth.html`);
        const visualPanel = page.locator('#visual-panel');
        const formPanel = page.locator('#form-panel');
        const initialVisualBox = await visualPanel.boundingBox();
        const initialFormBox = await formPanel.boundingBox();
        assert.equal(initialVisualBox.width, 640, 'Desktop visual panel should occupy half the viewport');
        assert.equal(initialFormBox.width, 640, 'Desktop form panel should occupy half the viewport');
        assert.equal(initialFormBox.x, 640, 'Desktop form panel should begin at the viewport midpoint');
        assert.equal(await page.locator('#login-form').evaluate((form) => form.checkValidity()), false, 'Login should require its fields');
        await page.locator('#login-email').fill('not-an-email');
        await page.locator('#login-password').fill('password-value');
        assert.equal(await page.locator('#login-form').evaluate((form) => form.checkValidity()), false, 'Login should reject malformed email');

        await page.locator('#btn-login').focus();
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'btn-signup', 'The mode switch should be keyboard reachable');
        await page.keyboard.press('Enter');
        let visualBox = await visualPanel.boundingBox();
        let formBox = await formPanel.boundingBox();
        assert.equal(visualBox.x, 640, 'Sign-up should move the visual panel completely right');
        assert.equal(formBox.x, 0, 'Sign-up should move the form panel completely left');
        assert.equal(formBox.x + formBox.width, visualBox.x, 'The desktop panels should meet without a gap or overlap');
        assert.equal(await page.locator('#signup-form').evaluate((form) => form.inert), false, 'The active form should be interactive');
        assert.equal(await page.locator('#signup-faculty').getAttribute('required'), '');
        const desktopMotion = await page.evaluate(() => window.__gsapCalls.filter((call) =>
            ['visual-panel', 'form-panel'].includes(call.id) && call.values.xPercent !== undefined
        ));
        assert.equal(desktopMotion.length, 2, 'Both panels should animate on the same switch');
        assert.ok(desktopMotion.every(({ values }) => values.duration === 1 && values.ease === 'power3.inOut'), 'Panel motion should use the required one-second easing');

        await page.locator('#btn-login').click();
        visualBox = await visualPanel.boundingBox();
        formBox = await formPanel.boundingBox();
        assert.equal(visualBox.x, 0, 'Sign-in should return the visual panel completely left');
        assert.equal(formBox.x, 640, 'Sign-in should return the form panel completely right');

        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForFunction(() => matchMedia('(max-width: 700px)').matches);
        await page.waitForTimeout(50);
        assert.equal((await visualPanel.boundingBox()).height, 422, 'Mobile panels should each occupy half the viewport height');
        assert.equal((await formPanel.boundingBox()).height, 422, 'Mobile form panel should occupy half the viewport height');
        await page.locator('#btn-signup').click();
        visualBox = await visualPanel.boundingBox();
        formBox = await formPanel.boundingBox();
        assert.equal(visualBox.y, 422, 'Mobile sign-up should move the visual panel fully down');
        assert.equal(formBox.y, 0, 'Mobile sign-up should move the form panel fully up');
        assert.equal(formBox.y + formBox.height, visualBox.y, 'The mobile panels should meet without a gap or overlap');

        await page.locator('#signup-name').fill('Test Student');
        await page.locator('#signup-email').fill('student@example.edu');
        await page.locator('#signup-faculty').fill('Engineering');
        await page.locator('#signup-password').fill('strong-pass-123');
        await Promise.all([
            page.waitForResponse((response) => response.url().endsWith('/api/auth/register')),
            page.locator('#signup-form button[type="submit"]').click()
        ]);
        assert.deepEqual(requests.at(-1).body, {
            name: 'Test Student',
            email: 'student@example.edu',
            faculty: 'Engineering',
            password: 'strong-pass-123'
        }, 'Registration should submit the expected student fields');
        await page.locator('#signup-name').fill('Existing Student');
        await page.locator('#signup-email').fill('taken@example.edu');
        await Promise.all([
            page.waitForResponse((response) => response.status() === 409 && response.url().endsWith('/api/auth/register')),
            page.locator('#signup-form button[type="submit"]').click()
        ]);
        assert.equal(await page.locator('#auth-status').textContent(), 'That email is already registered.', 'The form should display backend validation errors');

        await page.locator('#btn-login').click();
        await page.locator('#forgot-password-link').click();
        assert.equal(await page.locator('#forgot-password-dialog').evaluate((dialog) => dialog.open), true, 'Forgot password should open its dialog');
        await page.locator('#reset-email').fill('student@example.edu');
        await Promise.all([
            page.waitForResponse((response) => response.url().endsWith('/api/auth/password-reset')),
            page.locator('#forgot-password-form button[type="submit"]').click()
        ]);
        assert.equal(requests.at(-1).mode, 'password-reset', 'Password reset should call the configured auth route');
        await page.locator('#close-reset-dialog').click();

        await page.locator('#login-email').fill('student@example.edu');
        await page.locator('#login-password').fill('correct-horse-battery-staple');
        await Promise.all([
            page.waitForResponse((response) => response.url().endsWith('/api/auth/login')),
            page.locator('#login-form button[type="submit"]').click()
        ]);
        assert.equal(requests.at(-1).mode, 'login', 'Sign-in should call the login route');
        assert.equal(page.url(), `http://127.0.0.1:${address.port}/auth.html`, 'External redirect targets should be ignored');

        await page.goto(`http://127.0.0.1:${address.port}/components.html`);
        assert.equal(await page.locator('.btn').count(), 9, 'The component preview should show button variants and disabled state');
        await page.locator('#open-demo-modal').click();
        assert.equal(await page.locator('#demo-modal').evaluate((dialog) => dialog.open), true, 'The shared modal should open');
        await page.locator('#demo-modal button[type="submit"]').click();
        assert.equal(await page.locator('#demo-modal').evaluate((dialog) => dialog.open), false, 'The shared modal should close');
        await page.locator('.demo-tooltip').hover();
        await page.waitForTimeout(200);
        assert.equal(await page.locator('.demo-tooltip').evaluate((element) => getComputedStyle(element, '::after').opacity), '1', 'The tooltip should become visible on hover');
        assert.deepEqual(pageErrors, [], 'The page should not raise JavaScript errors');

        console.log('Frontend smoke check passed: auth panel swaps, validation, login/register/reset requests, redirect safety, shared components, and modal/tooltip interactions.');
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
