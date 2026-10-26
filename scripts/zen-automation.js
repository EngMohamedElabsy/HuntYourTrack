const { firefox } = require('playwright');
const path = require('path');

(async () => {
  // 1. Configuration
  // Path to Zen Browser profile on Linux (Flatpak/Standard)
  const pathToZenProfile = '/home/elabsy/.var/app/org.zen_browser.zen/.zen/';

  // Path to Zen Browser executable
  // Note: Depending on installation, this might be /usr/bin/zen-browser or a Flatpak path
  const zenExecutablePath = '/usr/bin/zen-browser';

  console.log('🚀 Initializing Zen Browser Automation...');
  console.log(`Profile Path: ${pathToZenProfile}`);
  console.log(`Executable Path: ${zenExecutablePath}`);

  try {
    // 2. Launch Persistent Context
    // launchPersistentContext allows us to use the existing user profile (cookies, history, sessions)
    const context = await firefox.launchPersistentContext(pathToZenProfile, {
      headless: false,
      executablePath: zenExecutablePath,
      args: [
        '--start-maximized',
        '--no-first-run'
      ],
      viewport: null // Ensures the browser uses its native window size
    });

    console.log('✅ Zen Browser launched successfully with persistent profile!');

    // 3. Navigation Test
    const page = await context.newPage();
    const targetUrl = 'https://github.com/EngMohamedElabsy/HuntYourTrack';

    console.log(`Navigating to: ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    const title = await page.title();
    console.log(`🎉 Success! Connected to Zen Browser.`);
    console.log(`Page Title: ${title}`);

    // Keep browser open for a short while to verify visually
    console.log('Browser will remain open for 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    await context.close();
    console.log('Session closed.');
  } catch (error) {
    console.error('❌ Automation Error:', error.message);

    if (error.message.includes('profile is in use') || error.message.includes('locked')) {
      console.error('\n🚨 CRITICAL ERROR: Zen Browser is already running!');
      console.error('Playwright cannot open a persistent profile if the browser is already open.');
      console.error('Please CLOSE all Zen Browser windows completely and try again.');
    } else {
      console.error('\nPossible causes:');
      console.error('1. Incorrect executable path: Verify if /usr/bin/zen-browser is correct.');
      console.error('2. Profile path mismatch: Verify the Zen profile directory exists.');
    }
    process.exit(1);
  }
})();
