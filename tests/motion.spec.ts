import { test, expect } from '@playwright/test';

for (const p of ['/index.html', '/auth.html']) {
  test(`60fps + no CLS on ${p}`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__cls = 0;
      new PerformanceObserver(l => {
        for (const e of l.getEntries() as any[]) if (!e.hadRecentInput) (window as any).__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(p);

    // قياس FPS أثناء الـ scroll
    const fps = await page.evaluate(async () => {
      let frames = 0;
      const start = performance.now();
      const tick = () => { frames++; if (performance.now() - start < 2000) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      for (let i = 0; i < 10; i++) { window.scrollBy(0, 200); await new Promise(r => setTimeout(r, 150)); }
      await new Promise(r => setTimeout(r, 600));
      return frames / 2;
    });

    expect(fps).toBeGreaterThanOrEqual(55); // سماحية بسيطة للـ 60
    expect(await page.evaluate(() => (window as any).__cls)).toBeLessThan(0.01);
  });
}