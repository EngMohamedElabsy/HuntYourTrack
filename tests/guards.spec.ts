import { test, expect } from '@playwright/test';

const protectedRoutes = ['/admin.html', '/student.html'];

for (const route of protectedRoutes) {
  test(`unauthenticated access to ${route} redirects to auth.html`, async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(route);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.goto(route);
    await expect(page).toHaveURL(/auth\.html/);
  });
}

test('RBAC: authenticated student cannot access admin console', async ({ page }) => {
  await page.goto('/auth.html');
  await page.evaluate(() => {
    localStorage.setItem('user_role', 'student');
    localStorage.setItem('user_email', 'student@university.edu');
    localStorage.setItem('user_name', 'Student User');
  });
  await page.goto('/admin.html');
  // Student role must be redirected away from admin console
  await expect(page).not.toHaveURL(/admin\.html/);
});
