for (const route of ['/admin.html', '/student.html']) {
  test(`unauthenticated ${route} -> auth.html`, async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(route);
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.goto(route);
    await expect(page).toHaveURL(/auth\.html/);
  });
}
// RBAC: اعمل login كـ student وحاول تفتح admin.html -> لازم يتحول