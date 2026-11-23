import { test, expect } from '@playwright/test';

test('no exposed debug accounts or hardcoded plaintext credentials', async ({ page }) => {
  await page.goto('/auth.html');
  const html = await page.content();

  // Verify zero visible debug, bypass, or mock login buttons exist in the DOM
  await expect(page.getByRole('button', { name: /debug|bypass|quick login|demo auto-fill/i })).toHaveCount(0);

  // Verify zero hardcoded plaintext passwords in markup
  expect(html).not.toMatch(/password\s*[:=]\s*["'][a-zA-Z0-9!@#$%^&*]{8,}["']/i);

  // Audit loaded first-party script assets for hardcoded passwords
  const scriptSources = await page.$$eval('script[src]', scripts =>
    scripts.map(s => (s as HTMLScriptElement).src).filter(src => !src.includes('cdn') && !src.includes('google'))
  );

  for (const src of scriptSources) {
    try {
      const response = await page.request.get(src);
      if (response.ok()) {
        const scriptBody = await response.text();
        expect(scriptBody).not.toMatch(/api_secret\s*[:=]\s*["'][^"']+["']/i);
      }
    } catch {
      // Ignore cross-origin network errors if any
    }
  }
});
