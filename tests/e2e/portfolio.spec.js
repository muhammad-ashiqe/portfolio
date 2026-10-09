import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("visual routes, exact descriptions and project filters", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/projects");
  await expect(
    page.getByRole("heading", { name: "Built to work" }),
  ).toBeVisible();
  await expect(page.locator(".project-entry")).toHaveCount(6);
  await page.getByRole("button", { name: "Featured 02" }).click();
  await expect(page.locator(".project-entry")).toHaveCount(2);
  await page.getByRole("button", { name: "All projects 06" }).click();
  await page.getByLabel("Type", { exact: true }).selectOption("frontend");
  await expect(page.locator(".project-entry")).toHaveCount(2);
  await page.getByLabel("Type", { exact: true }).selectOption("");
  await page
    .getByRole("heading", { name: "TechTribe - Social media platform" })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(/projects\/techtribe/);
  await expect(page.locator(".detail-description")).toContainText(
    "TechTribe is a social media platform designed to connect tech professionals across diverse industries.",
  );
  await page.getByRole("link", { name: "Next project" }).click();
  await expect(page).toHaveURL(/fragrencia/);
  for (const route of [
    "/skills",
    "/experience",
    "/contact",
    "/overview",
    "/missing",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("terminal executes, completes, preserves session, exits and supports browser history", async ({
  page,
}) => {
  await page.goto("/projects?mode=visual");
  await page.getByRole("button", { name: "Terminal", exact: true }).click();
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await expect(input).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await input.fill("project tech");
  await input.press("Tab");
  await expect(input).toHaveValue("project techtribe");
  await input.press("Enter");
  await expect(page.locator(".terminal-project")).toHaveCount(1);
  await input.press("ArrowUp");
  await expect(input).toHaveValue("project techtribe");
  await input.fill("cd projects");
  await input.press("Enter");
  await input.fill("cat techtribe.txt");
  await input.press("Enter");
  await expect(page.locator(".terminal-project")).toHaveCount(2);
  await input.fill("theme amber");
  await input.press("Enter");
  await expect(page.locator(".terminal-page")).toHaveClass(/palette-amber/);
  await input.fill("exit");
  await input.press("Enter");
  await expect(page.locator(".projects-page")).toBeVisible();
  await page.goBack();
  await expect(input).toBeVisible();
  await expect(page.locator(".terminal-project")).toHaveCount(2);
  await input.press("Control+l");
  await expect(page.locator(".terminal-entry")).toHaveCount(0);
  await page.reload();
  await expect(input).toBeVisible();
  await expect(page.locator(".terminal-page")).toHaveClass(/palette-amber/);
});
test("all requested viewport widths have no horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/projects",
      "/skills",
      "/experience",
      "/contact",
      "/?mode=terminal",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
});
test("dark and light pages pass serious accessibility checks", async ({
  page,
}) => {
  for (const colorScheme of ["dark", "light"]) {
    await page.emulateMedia({ colorScheme });
    for (const route of [
      "/",
      "/projects",
      "/projects/techtribe",
      "/skills",
      "/experience",
      "/contact",
      "/overview",
      "/?mode=terminal",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(
        results.violations
          .filter((v) => ["serious", "critical"].includes(v.impact))
          .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
        `${route} ${colorScheme}`,
      ).toEqual([]);
    }
  }
});
test("mobile navigation, command palette and contact validation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("link", { name: "Contact", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Name is required")).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search portfolio" })
    .fill("techtribe");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/projects\/techtribe/);
  await page.keyboard.press("Control+k");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("mode switching restores scroll and terminal Tab does not trap focus", async ({
  page,
}) => {
  await page.goto("/projects?mode=visual");
  await expect(page.locator(".project-entry")).toHaveCount(6);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(80);
  await page.keyboard.press("Control+k");
  await page
    .getByRole("textbox", { name: "Search portfolio" })
    .fill("Terminal Mode");
  await page.keyboard.press("Enter");
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await expect(input).toBeVisible();
  await input.fill("help");
  await input.press("Tab");
  await expect(input).not.toBeFocused();
  await page.getByRole("button", { name: "Return to visual" }).click();
  await expect(page.locator(".projects-page")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(800);
  await page.goBack();
  await expect(input).toBeVisible();
  await page.goBack();
  await expect(page.locator(".projects-page")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(800);
});
test("WebGL failure keeps the hero usable and terminal has no canvas", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const get = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl" || type === "webgl2"
        ? null
        : get.call(this, type, ...args);
    };
  });
  await page.goto("/?mode=visual");
  await expect(
    page.getByRole("img", {
      name: "Engineering Core: three interconnected modules",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore Work" })).toBeVisible();
  await page.getByRole("button", { name: "Terminal", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Terminal command" }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("technology search and mobile command palette open exact skill records", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?mode=visual");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("button", { name: "Search portfolio", exact: true })
    .click();
  await page.getByRole("textbox", { name: "Search portfolio" }).fill("Nest.js");
  await page.keyboard.press("Enter");
  await expect(page.locator(".technology-detail h3")).toHaveText("Nest.js");
  await expect(page.locator("#stack-title")).toHaveText("Backend & Database");
  await page.reload();
  await expect(page.locator(".technology-detail h3")).toHaveText("Nest.js");
});

test("palette migration, selector, commands and all palette contrast", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("forged-terminal-theme", "green"),
  );
  await page.goto("/?mode=terminal");
  await expect(page.locator(".terminal-page")).toHaveClass(/palette-orange/);
  for (const label of ["Orange", "Green", "Amber", "Bone"]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".terminal-page")).toHaveClass(
      new RegExp("palette-" + label.toLowerCase()),
    );
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact),
      ),
    ).toEqual([]);
  }
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await input.fill("theme o");
  await input.press("Tab");
  await expect(input).toHaveValue("theme orange");
  await input.press("Enter");
  await expect(
    page.getByRole("button", { name: "Orange", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator(".terminal-page")).toHaveClass(/palette-orange/);
});

test("stack map keyboard pinning, search, history and mobile groups", async ({
  page,
}) => {
  await page.goto("/skills?category=backend");
  const node = page
    .locator(".stack-map")
    .getByRole("button", { name: "Nest.js" });
  await node.focus();
  await expect(page.locator(".technology-detail")).toHaveCount(0);
  await node.press("Enter");
  await expect(page.locator(".technology-detail")).toContainText(
    "Behind The Scene App",
  );
  await expect(page).toHaveURL(/technology=Nest.js/);
  await page.reload();
  await expect(page.locator(".technology-detail h3")).toHaveText("Nest.js");
  await page.getByRole("button", { name: "Reset selection" }).click();
  await expect(page.locator(".technology-detail")).toHaveCount(0);
  await page.goBack();
  await expect(page.locator(".technology-detail h3")).toHaveText("Nest.js");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Find a technology").fill("Stripe");
  await page
    .locator(".mobile-technologies")
    .getByRole("button", { name: "Stripe" })
    .click();
  await expect(page.locator(".technology-detail")).toContainText("QuickBite");
  await expect(page.locator(".technology-detail")).not.toContainText(
    "Fragrencia",
  );
  await page.reload();
  await expect(page.locator(".technology-detail h3")).toHaveText("Stripe");
  const mobileAxe = await new AxeBuilder({ page }).analyze();
  expect(
    mobileAxe.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact),
    ),
  ).toEqual([]);
  await page.getByLabel("Find a technology").fill("");
  const category = page.getByRole("button", { name: /07 Payment Gateways/ });
  await category.click();
  await expect(category).toHaveAttribute("aria-expanded", "false");
  await category.click();
  await expect(category).toHaveAttribute("aria-expanded", "true");
});

test("hero links and inspection strip remain separate in both themes", async ({
  page,
}) => {
  for (const colorScheme of ["dark", "light"]) {
    await page.emulateMedia({ colorScheme, reducedMotion: "no-preference" });
    for (const width of [320, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/?mode=visual");
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter((a) => a.effect?.getTiming().iterations !== Infinity)
            .map((a) => a.finished),
        ),
      );
      if (width > 760) {
        const art = await page.locator(".hero-art").boundingBox();
        const composition = await page
          .locator(".hero-composition")
          .boundingBox();
        expect(art.width / composition.width).toBeCloseTo(0.56, 1);
        await expect(page.locator(".name-overlap")).toHaveAttribute(
          "aria-hidden",
          "true",
        );
        const layers = await page.evaluate(() =>
          [
            ".name-fill",
            ".core-viewport > div:not(.core-crosshair), .core-fallback",
            ".name-overlap",
          ].map((selector) =>
            Number(getComputedStyle(document.querySelector(selector)).zIndex),
          ),
        );
        expect(layers).toEqual([0, 1, 2]);
        const viewport = await page.locator(".core-viewport").boundingBox();
        const controls = await page.locator(".core-controls").boundingBox();
        expect(viewport.y + viewport.height).toBeLessThanOrEqual(
          controls.y + 1,
        );
        expect(controls.x + controls.width).toBeLessThanOrEqual(width);
      } else {
        await expect(page.locator(".hero-art")).toBeHidden();
        await expect(page.locator("canvas")).toHaveCount(0);
      }
      for (const name of [
        "github",
        "linkedin",
        "View Resume",
        "Request a Callback",
      ]) {
        const link = page.getByRole("link", { name, exact: true });
        await expect(link).toBeVisible();
        await link.focus();
        await expect(link).toBeFocused();
      }
    }
  }
});

test("skill hover leaves layout, scroll, URL and pinned details stable", async ({
  page,
}) => {
  await page.goto("/skills?category=backend");
  await page.locator(".stack-map").scrollIntoViewIfNeeded();
  const snapshot = () =>
    page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      y: window.scrollY,
      url: location.href,
      detail: document.querySelector(".technology-detail")?.textContent || "",
    }));
  const before = await snapshot();
  for (const name of ["Nest.js", "MongoDB", "Express.js", "MySql", "Node.js"]) {
    await page
      .locator(".stack-map")
      .getByRole("button", { name, exact: false })
      .hover();
    expect(await snapshot()).toEqual(before);
  }
  await page
    .locator(".stack-map")
    .getByRole("button", { name: "Nest.js" })
    .click();
  await expect(page.locator(".technology-detail h3")).toHaveText("Nest.js");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before.y);
  const pinned = await snapshot();
  for (const name of ["MongoDB", "Express.js", "MySql"]) {
    await page.locator(".stack-map").getByRole("button", { name }).hover();
    expect(await snapshot()).toEqual(pinned);
  }
  await page.goBack();
  await expect(page.locator(".technology-detail")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before.y);
});

test("visible identity and artwork are updated without removing covers", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/projects/techtribe",
    "/skills",
    "/contact",
    "/overview",
    "/?mode=terminal",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator("body").innerText()).not.toMatch(/forged/i);
    await expect(page.locator(".original-artwork")).toHaveCount(0);
    await expect(page.locator("link[rel=icon]")).toHaveAttribute(
      "href",
      "/ashiqe-icon.svg",
    );
  }
  const response = await page.request.get("/ashiqe-icon.svg");
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("<svg");
  await page.goto("/projects/techtribe");
  await expect(page.locator(".detail-layout img")).toHaveAttribute(
    "src",
    /artwork\/techtribe/,
  );
});

test("sculpture visibility toggle keeps its control and layout available", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const reducedMotion of ["reduce", "no-preference"]) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/?mode=visual");
    const hide = page.getByRole("button", { name: "Hide 3D sculpture" });
    await expect(hide).toBeVisible();
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished),
      ),
    );
    const initial = await page.locator(".hero-bottom").boundingBox();
    await hide.focus();
    await hide.press("Enter");
    const show = page.getByRole("button", { name: "Show 3D sculpture" });
    await expect(show).toBeFocused();
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator(".core-viewport")).toBeHidden();
    expect((await page.locator(".hero-bottom").boundingBox()).y).toBe(
      initial.y,
    );
    await show.press("Enter");
    await expect(page.locator(".core-viewport")).toBeVisible();
    await expect(hide).toBeFocused();
    await page.reload();
    await expect(hide).toBeVisible();
  }
});

test("theme follows system changes until a visitor explicitly overrides it", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/?mode=visual");
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.evaluate(() => localStorage.setItem("portfolio-theme", "system"));
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(root).toHaveAttribute("data-theme", "light");
});
