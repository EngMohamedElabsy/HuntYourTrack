const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to a Chromium DevTools Protocol browser on port 9222...');

  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');

    // Get the active context (inherits all sessions, cookies, and profile settings)
    const defaultContext = browser.contexts()[0];

    // Use the first available tab or open a new one
    const pages = defaultContext.pages();
    const page = pages.length > 0 ? pages[0] : await defaultContext.newPage();

    console.log('Connected to the browser.');

    // Navigate to the local project page
    // Note: Adjust the path if the user is using a different local server port
    const projectUrl = 'http://localhost:8080/auth.html';
    console.log(`Navigating to: ${projectUrl}...`);

    try {
        await page.goto(projectUrl, { waitUntil: 'domcontentloaded' });
    } catch (e) {
        console.log('Local server not detected, trying file path...');
        // Fallback to local file path if server isn't running
        await page.goto('file:///home/elabsy/HuntYourTrack/frontend/auth.html');
    }

    console.log(`Now controlling the page: ${await page.title()}`);
    console.log('Monitoring UI for glitches...');

    // AUTOMATED UI AUDIT: Test the "Swap" logic
    console.log('Running UI Audit: Testing "Create Account" transition...');
    await page.click('#btn-signup');

    // Wait for the 1.0s animation to complete
    await page.waitForTimeout(1200);

    // Verify that the visual and form panels swapped their complete positions.
    const visualPanelBox = await page.locator('#visual-panel').boundingBox();
    const formPanelBox = await page.locator('#form-panel').boundingBox();
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    if (visualPanelBox && formPanelBox && visualPanelBox.x >= viewportWidth / 2 - 10 && formPanelBox.x < 10) {
        console.log('Verified: panels switched to their complete opposite positions.');
    } else {
        throw new Error('The panels did not reach their expected positions.');
    }

    await page.click('#btn-login');
    await page.waitForTimeout(1200);
    const returnedVisualBox = await page.locator('#visual-panel').boundingBox();
    const returnedFormBox = await page.locator('#form-panel').boundingBox();
    if (!returnedVisualBox || !returnedFormBox || returnedVisualBox.x >= 10 || returnedFormBox.x < viewportWidth / 2 - 10) {
        throw new Error('The panels did not return to the sign-in layout.');
    }

    console.log('Audit complete. Connection remains open for real-time fixing.');
  } catch (error) {
    console.error('Browser audit failed:', error.message);
    console.error('This connector requires a Chromium-based browser with DevTools Protocol enabled on port 9222.');
  }
})();
