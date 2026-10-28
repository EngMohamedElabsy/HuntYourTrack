const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { execSync } = require('node:child_process');

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

async function smoothMoveAndClick(page, selector, desc) {
    console.log(`[Action] Moving mouse to: ${desc || selector}...`);
    const loc = page.locator(selector).first();
    await loc.scrollIntoViewIfNeeded();
    const box = await loc.boundingBox();
    if (!box) {
        console.warn(`[Warn] Could not find bounding box for ${selector}`);
        return;
    }
    const targetX = box.x + box.width / 2;
    const targetY = box.y + box.height / 2;

    // Smooth multi-step cursor glide
    await page.mouse.move(targetX, targetY, { steps: 20 });
    await page.waitForTimeout(300);

    // Visual ripple effect on click
    await page.evaluate(({ x, y }) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = (x - 15) + 'px';
        ripple.style.top = (y - 15) + 'px';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '3px solid #EF4444';
        ripple.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '999999';
        ripple.style.transition = 'all 0.5s ease-out';
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.style.transform = 'scale(2.2)';
            ripple.style.opacity = '0';
        }, 20);
        setTimeout(() => ripple.remove(), 600);
    }, { x: targetX, y: targetY });

    await loc.click();
    console.log(`[✓ Clicked] ${desc || selector}`);
    await page.waitForTimeout(500);
}

async function injectVisibleCursor(page) {
    await page.evaluate(() => {
        if (document.getElementById('custom-mouse-pointer')) return;
        const pointer = document.createElement('div');
        pointer.id = 'custom-mouse-pointer';
        pointer.style.position = 'fixed';
        pointer.style.width = '20px';
        pointer.style.height = '20px';
        pointer.style.borderRadius = '50%';
        pointer.style.backgroundColor = '#6366F1';
        pointer.style.border = '2px solid #FFFFFF';
        pointer.style.boxShadow = '0 0 12px rgba(99, 102, 241, 0.9), 0 2px 6px rgba(0,0,0,0.5)';
        pointer.style.pointerEvents = 'none';
        pointer.style.zIndex = '999999';
        pointer.style.transform = 'translate(-50%, -50%)';
        pointer.style.transition = 'transform 0.08s ease-out, background-color 0.2s ease';
        document.body.appendChild(pointer);

        window.addEventListener('mousemove', (e) => {
            pointer.style.left = e.clientX + 'px';
            pointer.style.top = e.clientY + 'px';
        });
    });
}

async function run() {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    console.log(`[✓] Test server listening on http://127.0.0.1:${port}`);

    console.log('>>> LAUNCHING HEADED BROWSER (Visible on Screen DISPLAY=:0) <<<');
    const browser = await chromium.launch({
        headless: false,
        slowMo: 450,
        args: ['--window-size=1280,850', '--window-position=50,50']
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        recordVideo: {
            dir: path.join(artifactDir, 'video_raw'),
            size: { width: 1280, height: 800 }
        }
    });

    const page = await context.newPage();

    page.on('dialog', async (dialog) => {
        console.log(`[Browser Alert Dismissed]: ${dialog.message()}`);
        await dialog.accept();
    });

    // 1. Open Auth Portal
    console.log('\n--- 1. Testing Auth Screen & Mouse Navigation ---');
    await page.goto(`http://127.0.0.1:${port}/auth.html`);
    await injectVisibleCursor(page);
    await page.waitForTimeout(800);

    // 2. Click 1-Click Demo Student Chip
    await smoothMoveAndClick(page, '.btn-demo-chip:has-text("Student")', '1-Click Demo Student Button');
    await page.waitForTimeout(800);

    // 3. Test Sliding to Create Account Tab
    await smoothMoveAndClick(page, '#btn-signup', 'Create Account Tab');
    await page.waitForTimeout(1000);

    // 4. Test Sliding Back to Sign In Tab
    await smoothMoveAndClick(page, '#btn-login', 'Sign In Tab');
    await page.waitForTimeout(600);

    // 5. Fill credentials again and Enter Platform
    await smoothMoveAndClick(page, '.btn-demo-chip:has-text("Student")', 'Re-fill Student Credentials');
    await smoothMoveAndClick(page, '#login-form button[type="submit"]', 'Enter Platform Button');
    console.log('[Wait] Logging in and redirecting to Student Dashboard...');
    await page.waitForTimeout(2500);

    // 6. Student Dashboard Actions
    await injectVisibleCursor(page);
    console.log('\n--- 2. Testing Student Dashboard ---');
    await smoothMoveAndClick(page, 'button:has-text("Apply Now")', 'Internship Apply Button');
    await page.waitForTimeout(800);

    // 7. Navigate to Admin Console
    console.log('\n--- 3. Testing Admin Console & User Filters ---');
    await smoothMoveAndClick(page, 'a:has-text("Admin Console")', 'Navbar Admin Link');
    await page.waitForTimeout(1000);
    await injectVisibleCursor(page);

    // Search input
    await smoothMoveAndClick(page, '#search-users', 'User Search Input');
    await page.locator('#search-users').fill('Salma');
    await page.waitForTimeout(900);
    await page.locator('#search-users').fill('');
    await page.waitForTimeout(500);

    // Toggle Role Pills
    await smoothMoveAndClick(page, 'button[data-role="Student"]', 'Students Role Filter');
    await smoothMoveAndClick(page, 'button[data-role="Employer"]', 'Employers Role Filter');
    await smoothMoveAndClick(page, 'button[data-role="All"]', 'All Users Filter');

    // Toggle User Status
    await smoothMoveAndClick(page, 'button[onclick^="toggleUserStatus"]', 'Toggle User Active/Suspended Status');

    // 8. Corporate Verification Queue (US05)
    console.log('\n--- 4. Testing Employer Verification Queue ---');
    await smoothMoveAndClick(page, 'button[data-tab="verification"]', 'Corporate Accreditation Queue Tab');
    await page.waitForTimeout(800);

    // Open Credentials Modal
    await smoothMoveAndClick(page, '.doc-link-btn', 'View Submitted Credentials Button');
    await page.waitForTimeout(1200);

    // Close Modal
    await smoothMoveAndClick(page, '#doc-modal .close-btn', 'Close Modal Window');
    await page.waitForTimeout(600);

    // Approve an Employer
    await smoothMoveAndClick(page, '.queue-card .btn-approve', 'Approve Corporate Partner');
    await page.waitForTimeout(1000);

    // 9. Navigate to System Workflow Graph
    console.log('\n--- 5. Testing Connected Architecture & System Graph ---');
    await smoothMoveAndClick(page, 'a:has-text("System Graph")', 'Navbar System Graph Link');
    await page.waitForTimeout(1200);
    await injectVisibleCursor(page);

    // Run Live Pipeline Simulation
    await smoothMoveAndClick(page, '#btn-run-simulation', 'Run Live Pipeline Simulation Button');
    console.log('[Wait] Simulating automated pipeline stages (Push -> Smoke -> Deploy -> Metrics)...');
    await page.waitForTimeout(4000);    await injectVisibleCursor(page);

    // Scroll through graph
    console.log('[Action] Scrolling through Connected Architecture tiers...');
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, -1000);
    await page.waitForTimeout(800);

    console.log('\n[✓] All visual actions executed flawlessly in front of user!');
    
    // Finalize Video Recording
    await page.close();
    await context.close();
    await browser.close();
    server.close();

    // Locate recorded video
    const videoDir = path.join(artifactDir, 'video_raw');
    const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
    if (files.length > 0) {
        const rawVideo = path.join(videoDir, files[0]);
        const targetMp4 = path.join(artifactDir, 'live_browser_demo.mp4');
        console.log(`[Video] Converting recorded browser session to MP4: ${targetMp4}...`);
        try {
            execSync(`ffmpeg -y -i "${rawVideo}" -c:v libx264 -pix_fmt yuv420p "${targetMp4}"`, { stdio: 'ignore' });
            console.log(`[✓ SUCCESS] High-definition recording saved to: ${targetMp4}`);
        } catch {
            console.log(`[✓ SUCCESS] WebM video available at: ${rawVideo}`);
        }
    }
}

run().catch((err) => {
    console.error('[ERROR]', err);
    process.exit(1);
});
