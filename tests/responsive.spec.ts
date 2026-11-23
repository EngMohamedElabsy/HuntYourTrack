import { test, expect } from '@playwright/test';

const pages = ['/index.html', '/auth.html', '/admin.html', '/student.html'];

for (const targetPage of pages) {
  test(`no horizontal overflow on ${targetPage}`, async ({ page }) => {
    await page.goto(targetPage);
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > (document.documentElement.clientWidth + 2)
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}
