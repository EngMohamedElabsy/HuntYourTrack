test('icon-only theme toggle with tooltip', async ({ page }) => {
  await page.goto('/index.html');
  const toggle = page.getByRole('button', { name: /theme|dark|light/i });
  await expect(toggle).toBeVisible();
  expect((await toggle.innerText()).trim()).toBe('');        // icon-only
  await expect(toggle.locator('svg, i, img')).toHaveCount(1);
  await toggle.hover();
  const title = await toggle.getAttribute('title');
  const tip = page.getByRole('tooltip');
  expect(title || (await tip.count()) > 0).toBeTruthy();
});