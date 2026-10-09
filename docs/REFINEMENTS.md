# FORGED visual and interaction refinements

Implemented locally on 2026-10-09. No deployment or live EmailJS messages.

## Presentation changes

- The opaque name and Engineering Core have separate desktop columns. Links sit immediately under DEV_; callback joins the main actions. The sculpture viewport ends before the rotation/reset strip and annotations.
- The home mark is an inline geometric SVG A; the original favicon is unchanged.
- The contact panel has persistent labels, bounded fields, a prominent submit control, distinct status treatments and a synchronous duplicate-submission guard. All EmailJS configuration and field names remain unchanged.
- The stack uses an interactive SVG membership map on wide screens and expandable technology groups on narrow screens/tablets. Hover/focus previews; click pins. Search and selection live in `q`, `category`, and `technology` URL parameters. Reset preserves unrelated URL state.
- `associations.js` derives verified links from original tool lists and experience technology arrays. Explicit aliases handle Express.js/Express, Nest.js/NestJS, Tailwind/Tailwind CSS and case differences. MERN expands only to MongoDB, Express, React and Node.js. Source labels and displayed experience excerpts remain verbatim.
- Terminal appearance is independent of visual light/dark. A single registry supplies Orange, Green, Amber and Bone to selector, commands, help and completion. `forged-terminal-theme-v2` intentionally ignores the legacy automatically saved green value. Explicit choices are validated and safely persisted.

## Generated artwork

All six covers were generated with the built-in image-generation tool, individually reviewed, then converted with `cwebp -q 82 -resize WIDTH 0` into 640px and 1280px landscape variants. Exact generation prompts are in [artwork-prompts.json](artwork-prompts.json).

| Project | Workspace assets (under `public/artwork/`) |
| --- | --- |
| TechTribe | `techtribe-640.webp`, `techtribe-1280.webp` |
| Fragrencia | `fragrencia-640.webp`, `fragrencia-1280.webp` |
| QuickBite | `quickbite-640.webp`, `quickbite-1280.webp` |
| ConnectU | `connectu-640.webp`, `connectu-1280.webp` |
| MovieMap | `moviemap-640.webp`, `moviemap-1280.webp` |
| CoinWatch | `coinwatch-640.webp`, `coinwatch-1280.webp` |

`src/forged/artwork.js` contains separate presentation paths and descriptive alt text. Covers are decorative interpretations, not screenshots or representations of implemented architecture. They contain no embedded text, statistics or prices. Responsive candidates are approximately 22–42 KB at 640px and 65–117 KB at 1280px. The archive lazy-loads covers; detail headers load eagerly. Dimensions reserve space. Failed covers fall back to the original project image, which also remains directly accessible in each detail page's Original artwork gallery.

Every original portfolio data record, order, description, URL, original public asset checksum, resume and commented-out source record remains unchanged. Preservation baselines were not modified.

## Validation

- Build, lint and 24 unit tests pass, including five preservation gates, exact source associations, artwork fallback, all palettes/completion, legacy preference migration, blocked storage, selector synchronization and mocked EmailJS validation/success/failure/missing configuration/duplicate submission.
- 33 browser tests pass across Chromium, Firefox and WebKit. Checks cover navigation/history, mobile expansion and search, keyboard pinning, all palette contrast, mobile pinned contrast, mode switching, WebGL fallback and absence of canvas in terminal mode.
- Viewport sweep: 320, 360, 390, 430, 768, 1024, 1440 and 1920 pixels, with no horizontal overflow. Hero links and separated controls checked in both themes. Axe reports no serious or critical violations on checked routes/states.
- Reviewed all six covers, desktop dark/light hero, live WebGL and static fallback, desktop/mobile work, stack, contact, terminal and original-artwork gallery screenshots. Artifacts are local under ignored `artifacts/`.
- Production lab run (`node scripts/measure.js`): throttled mobile hero LCP **1.348 s**, CLS **0**; projects LCP **2.100 s**, CLS **0.0575**. Desktop local hero LCP 0.036 s / CLS 0.00013, projects 0.060 s / CLS 0.0575. No runtime page errors. The script now measures both routes before scrolling to load all covers for screenshots.
- Main JavaScript is about 261 KB (91.5 KB gzip). The optional lazy WebGL chunk remains about 831 KB (225 KB gzip), with Vite's existing advisory retained.

## Practical limits

Performance is a local lab sample, not field Core Web Vitals. EmailJS delivery is mocked; no live message was sent. Physical mobile keyboards and screen-reader workflows still merit owner testing. WebGL uses the existing static fallback for reduced motion, mobile/coarse pointers, save-data and unavailable graphics. Deployment remains outside this pass.

## Follow-up polish — 2026-10-09

This follow-up supersedes the earlier separate-column hero, hover preview, favicon and gallery descriptions above.

- Restored the desktop sculpture to 56% of the hero width with a 540px scene (680px on wide desktops and 460px on compact desktops). Rotation/reset controls remain below the viewport.
- The solid name, alpha-transparent WebGL canvas, and decorative outline share a stacking context in that order. Only actual sculpture pixels cover the name fill; even a partially covered Q remains solid everywhere else. This replaces the originally proposed rectangular CSS mask: no pixel readback, resize measurements, or animation-frame React updates are necessary. The duplicate outline is hidden from assistive technology. Desktop reduced-motion/WebGL-failure fallback remains available.
- At widths up to 760px, the sculpture and its static illustration/controls are hidden entirely at the user's request. Name, social/resume links and main actions remain visible.
- Skill hover/focus changes highlights only. Details change on click/Enter, and remain pinned during other hover events. Query updates carry current scroll through existing navigation state; Back/Forward and mode-switch restoration remain intact.
- Removed visible FORGED labels from header/footer. Header subtitle is now PORTFOLIO. Removed the Original artwork gallery; original files and image-error fallback remain untouched.
- Added `public/ashiqe-icon.svg` using the geometric A and updated the icon link in `index.html` and all prerendered routes. Original favicon remains unchanged.
- Validation: 24 unit tests, lint, production build and 39 browser scenarios across Chromium/Firefox/WebKit. New regressions cover stable hover layout/URL/scroll/pinned details, identity/gallery/favicon changes, hero layering and hidden mobile sculpture. The hover test first brings the entire map into view so Playwright's automatic scrolling to offscreen buttons is not mistaken for application scroll behavior. Reviewed desktop dark/light, compact desktop and final mobile screenshots in `artifacts/polish-*`.
- Original content and asset checksum baselines remain unchanged. No deployment or live EmailJS delivery.

## Optional sculpture visibility

The eye button beside the rotation/reset controls toggles the sculpture, defaulting to visible on each hero mount. It also works with the desktop static fallback. Hiding unmounts the WebGL scene, hides viewport decoration, disables rotation/reset, and preserves the control strip and layout so the eye remains available to restore it. The mobile sculpture remains hidden. Visibility is deliberately not persisted.

System theme behavior was verified without changing its existing preference policy: absent/system preferences follow both initial and live OS color-scheme changes; an explicit visitor selection overrides the OS and persists across reloads. Browser regressions cover both policies, eye-toggle keyboard focus, no canvas while hidden, stable layout, and visible-by-default reloads across Chromium, Firefox and WebKit. Build, lint and all 24 unit/preservation tests pass.

## Header wordmark

Replaced the header A symbol and ASHIQE_SYSTEMS caption with a lowercase `ashiqe.` typographic wordmark in the existing Syne font. Letters enter with a brief stagger; hover/keyboard focus draws an orange underline and lifts the orange period. Reduced motion disables the entrance and motion transitions. The home link's accessible name and the A favicon remain unchanged. Responsive sizing was checked from 320–1920px in Chromium, Firefox and WebKit with no horizontal overflow; build and lint pass.
