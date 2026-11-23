import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:3000' },
  webServer: { command: 'npx serve . -l 3000', port: 3000, reuseExistingServer: true },
  projects: [
    { name: 'mobile',  use: { viewport: { width: 375,  height: 812 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});