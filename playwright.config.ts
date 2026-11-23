import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'python3 -m http.server 8080 --directory frontend',
    port: 8080,
    reuseExistingServer: true,
    timeout: 10000,
  },
  projects: [
    { name: 'mobile',  use: { viewport: { width: 375,  height: 812 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
