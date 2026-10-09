import { build } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
process.env.NODE_ENV = "production";
await build({
  build: {
    ssr: "src/forged/static-entry.js",
    outDir: "dist-ssr",
    rollupOptions: { output: { entryFileNames: "static.mjs" } },
  },
});
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
{
  const { renderPage, projects, projectMeta, profile } =
    await import("../dist-ssr/static.mjs");
  const template = await readFile("dist/index.html", "utf8");
  const routes = [
    "/",
    "/projects",
    "/skills",
    "/experience",
    "/contact",
    "/overview",
    ...projectMeta.map((m) => "/projects/" + m.slug),
  ];
  for (const path of routes) {
    const index = projectMeta.findIndex((m) => path === "/projects/" + m.slug);
    const title =
      index < 0
        ? path === "/"
          ? "Ashiqe | Portfolio"
          : path.slice(1)[0].toUpperCase() + path.slice(2)
        : projects[index].title;
    const description =
      index < 0 ? profile.introduction : projects[index].description;
    const canonical = "https://muhammad-ashiqe.vercel.app" + path;
    const html = template
      .replace(
        '<div id="root"></div>',
        '<div id="root">' + renderPage(path) + "</div>",
      )
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /(<meta name="description" content=")[^"]*/,
        `$1${escape(description)}`,
      )
      .replace(
        /(<meta property="og:description" content=")[^"]*/,
        `$1${escape(description)}`,
      )
      .replace(
        /(<meta property="og:title" content=")[^"]*/,
        `$1${escape(title)}`,
      )
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonical}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`);
    const directory = resolve("dist", "." + path);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, "index.html"), html);
  }
  await writeFile(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      routes
        .map(
          (path) =>
            `<url><loc>https://muhammad-ashiqe.vercel.app${path}</loc></url>`,
        )
        .join("") +
      "</urlset>",
  );
  await writeFile(
    "dist/robots.txt",
    "User-agent: *\nAllow: /\nSitemap: https://muhammad-ashiqe.vercel.app/sitemap.xml\n",
  );
  console.log(
    `Pre-rendered ${routes.length} public pages from unchanged portfolio data.`,
  );
}
