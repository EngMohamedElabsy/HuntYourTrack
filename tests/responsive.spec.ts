for (const p of ['/index.html', '/auth.html', '/admin.html', '/student.html']) {
  test(`no horizontal overflow ${p}`, async ({ page }) => {
    await page.goto(p);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
    await expect(page).toHaveScreenshot(`${p.replace(/\W/g, '')}.png`, { fullPage: true });
  });
}