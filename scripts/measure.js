import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const results = [];
await mkdir("artifacts", { recursive: true });
try {
  for (const mode of ["mobile", "desktop"]) {
    const context = await browser.newContext({
      viewport:
        mode === "mobile"
          ? { width: 390, height: 844 }
          : { width: 1440, height: 1000 },
      colorScheme: "dark",
    });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    if (mode === "mobile") {
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 93750,
      });
      await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() => {
      window.forgedMetrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.forgedMetrics.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.forgedMetrics.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const metrics = await page.evaluate(() => ({
      ...window.forgedMetrics,
      bytes: performance
        .getEntriesByType("resource")
        .reduce((sum, r) => sum + r.transferSize, 0),
      canvas: document.querySelectorAll("canvas").length,
    }));
    results.push({ mode, ...metrics, errors });
    await page.screenshot({
      path: `artifacts/final-${mode}.png`,
      fullPage: true,
    });
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/projects/techtribe/");
  results.push({
    staticProject: await page.locator("h1").textContent(),
    description: await page.locator(".detail-description").textContent(),
  });
  await context.close();
  await writeFile(
    "artifacts/performance.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
