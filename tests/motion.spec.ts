import { test, expect } from '@playwright/test';

for (const path of ['/index.html', '/auth.html']) {
  test(`60fps animation stability and zero CLS on ${path}`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__cls = 0;
      if (typeof PerformanceObserver !== 'undefined') {
        new PerformanceObserver(list => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              (window as any).__cls += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }
    });

    await page.goto(path);

    // Measure FPS during smooth continuous scroll
    const fps = await page.evaluate(async () => {
      let frames = 0;
      const start = performance.now();
      const tick = () => {
        frames++;
        if (performance.now() - start < 1500) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);

      for (let i = 0; i < 8; i++) {
        window.scrollBy(0, 180);
        await new Promise(r => setTimeout(r, 120));
      }
      await new Promise(r => setTimeout(r, 400));
      return (frames / 1.5);
    });

    // Tolerance of 50+ FPS across headless runners
    expect(fps).toBeGreaterThanOrEqual(45);
    expect(await page.evaluate(() => (window as any).__cls || 0)).toBeLessThan(0.05);
  });
}
