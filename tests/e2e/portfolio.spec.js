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
  await page.getByRole("button", { name: "EXECUTE_SEND" }).click();
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

test('technology search and mobile command palette open exact skill records', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?mode=visual');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('button', { name: 'Search portfolio', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search portfolio' }).fill('Nest.js');
  await page.keyboard.press('Enter');
  await expect(page.locator('.technology-detail h3')).toHaveText('Nest.js');
  await expect(page.locator('#stack-title')).toHaveText('Backend & Database');
  await page.reload();
  await expect(page.locator('.technology-detail h3')).toHaveText('Nest.js');
});
