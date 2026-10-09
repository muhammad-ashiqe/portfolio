# FORGED validation — 9 October 2026

## Baseline

- Original Vite production build passed.
- Original lint: 74 errors, 4 warnings.
- Original main JavaScript bundle: 1,207.10 KB (351.57 KB gzip).
- No existing automated test suite.

## Initial redesign checks

- Content preservation tests compare the original project/skill declarations and comments, experience, education, introduction, links, original source archive, and every original public asset checksum.
- Vitest: 17 tests covering preservation, terminal commands/navigation/completion/errors, storage failures, GUI content consistency, and mocked EmailJS success/error/validation/missing configuration.
- Playwright: 24 passing tests — eight scenarios in Chromium, Firefox, and WebKit. They cover routing, filters, detail pages, history, completion, mode persistence, scroll restoration, keyboard exit, mobile navigation, palette search, WebGL failure, and accessibility.
- Viewport sweep: 320, 360, 390, 430, 768, 1024, 1440 and 1920 pixels across home, work, stack, experience, contact and terminal, with no horizontal overflow.
- Axe scans: home, archive, project detail, stack, experience, contact, overview and terminal in light/dark system themes. No serious or critical violations.
- Build: production client and SSR render module compile; 12 public pages plus sitemap/robots generated.
- Production runtime screenshot checks recorded no JavaScript page errors.
- All six original GitHub project URLs and six demo URLs returned HTTP 200 to HEAD requests. This establishes reachability, not complete third-party application functionality.
- Original resume and every other public file pass SHA-256 verification.
- Dependency audit: zero vulnerabilities after compatible dependency updates and using the patched Vitest 5 test runner.

## Performance method

`node scripts/measure.js` runs against `npm run preview` on port 4173 with isolated Playwright contexts. The mobile run uses 390×844, 150 ms latency, 200 KB/s download, 93.75 KB/s upload and 4× CPU slowdown. Native PerformanceObserver records LCP and layout shift. Desktop is an unthrottled local preview and should not be compared with field measurements. Screenshots and exact current numbers are in ignored `artifacts/performance.json`.

Two production measurements recorded mobile LCP of 1.54 seconds and 0.572 seconds, with CLS approximately 0.0002 in both, below the 2.5-second / 0.1 targets. Desktop showed zero layout shift. The optional desktop WebGL scene is absent on mobile and in terminal mode. The main bundle is approximately 259 KB before compression (91 KB gzip); the separately loaded WebGL chunk is approximately 831 KB (225 KB gzip) and still triggers Vite's large-chunk advisory.

## Visual review

Reviewed desktop dark/light hero, mobile hero, desktop/mobile work, mobile stack and mobile terminal screenshots. Mobile uses a static Engineering Core diagram; capable desktops have damped pointer/drag inspection and keyboard rotation/reset. Source project illustrations remain unchanged by design. Every project description is fully expanded and readable.

## Limits and remaining checks

- No site deployment was performed.
- EmailJS was tested with mocks; a real delivery remains an owner-side integration check.
- Browser tests emulate viewport/input conditions, not every physical phone or virtual keyboard implementation. Screen-reader reading behavior merits a manual assistive-technology pass beyond axe and keyboard checks.
- The large optional Three.js chunk can be further optimized later; it does not block the hero text or load in mobile/terminal mode.
- Performance measurements are local lab samples, not field Core Web Vitals.
- Missing case-study narratives and new screenshots are intentionally omitted to honor the exact-content contract.

## Refinement validation — 2026-10-09

The latest pass has 24 passing unit tests and 33 passing browser tests across all three engines. Original records/assets still pass the unchanged preservation gates. Build and lint pass. The six new covers, palette migration, contact duplicate guard and interactive stack were checked. Full methods, measurements, screenshots and limits are recorded in [REFINEMENTS.md](REFINEMENTS.md).

## Hero, skills and identity follow-up

Latest checks cover 24 unit tests and 39 browser scenarios, including stable hover layout and scroll, click-only details, exact silhouette compositing, hidden mobile sculpture, visible branding removal, gallery removal and the new favicon. See the follow-up section in [REFINEMENTS.md](REFINEMENTS.md). The initial failed hover test was corrected to keep all tested buttons onscreen; the affected scenarios passed in all three engines on rerun.
