import { test, expect } from '@playwright/test';

test('icon-only theme toggle with accessible tooltip or title', async ({ page }) => {
  await page.goto('/index.html');
  const toggle = page.locator('#theme-toggle, [data-theme-toggle], button:has-text("theme"), button:has([class*="theme"])').first();
  await expect(toggle).toBeVisible();
  
  // Verify presence of vector icon inside toggle
  const iconCount = await toggle.locator('svg, i, img').count();
  expect(iconCount).toBeGreaterThanOrEqual(1);

  // Verify accessibility title, aria-label, or tooltip
  const ariaLabel = await toggle.getAttribute('aria-label');
  const title = await toggle.getAttribute('title');
  expect(ariaLabel || title).toBeTruthy();
});
