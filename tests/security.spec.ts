import { test, expect } from '@playwright/test';

test('no exposed debug accounts or credentials', async ({ page }) => {
  await page.goto('/auth.html');
  const html = await page.content();

  // مفيش أزرار bypass/debug/demo
  await expect(page.getByRole('button', { name: /debug|bypass|mock|demo|quick login/i })).toHaveCount(0);

  // مفيش credentials نصية
  expect(html).not.toMatch(/password\s*[:=]\s*["'][^"']+["']/i);
  expect(html).not.toMatch(/admin@|test@|student@.*\.(com|edu)/i);

  // افحص ملفات الـ JS كمان
  const scripts = await page.$$eval('script[src]', s => s.map(x => (x as HTMLScriptElement).src));
  for (const src of scripts) {
    const body = await (await page.request.get(src)).text();
    expect(body).not.toMatch(/password\s*[:=]\s*["'][^"']+["']/i);
  }
});