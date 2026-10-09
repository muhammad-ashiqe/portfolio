// @vitest-environment node
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";
import { describe, it, expect } from "vitest";
import * as originalData from "../src/assets/data.js";
import { experiences, education, profile } from "../src/forged/content.js";
const source = (path) =>
  readFileSync("docs/content-baseline/" + path + ".txt", "utf8");
const baseline = JSON.parse(
  readFileSync("docs/content-baseline/checksums.json", "utf8"),
);
describe("sacred portfolio data", () => {
  it("preserves every original public asset byte for byte", () => {
    for (const [path, checksum] of Object.entries(baseline).filter(([path]) =>
      path.startsWith("public/"),
    ))
      expect(
        createHash("sha256").update(readFileSync(path)).digest("hex"),
        path,
      ).toBe(checksum);
  });
  it("retains a byte-exact copy of every original source file", () => {
    for (const [path, checksum] of Object.entries(baseline).filter(([path]) =>
      path.startsWith("src/"),
    ))
      expect(
        createHash("sha256").update(source(path)).digest("hex"),
        path,
      ).toBe(checksum);
  });
  it("keeps every project and commented-out record unchanged", () => {
    const original = source("src/assets/data.js");
    const current = readFileSync("src/assets/data.js", "utf8");
    expect(current.slice(current.indexOf("const programmingLanguages"))).toBe(
      original.slice(original.indexOf("const programmingLanguages")),
    );
    const records = original
      .slice(original.indexOf("export const projects ="))
      .replace("export const projects =", "const projects =")
      .split("\nexport {")[0];
    expect(originalData.projects).toEqual(
      vm.runInNewContext(records + "; projects"),
    );
  });
  it("extracts experience and education verbatim without reordering", () => {
    const s = source("src/pages/Experience.jsx");
    const records = s.slice(
      s.indexOf("const experiences"),
      s.indexOf("const Experience ="),
    );
    expect(experiences).toEqual(vm.runInNewContext(records + "; experiences"));
    expect(education).toEqual(vm.runInNewContext(records + "; education"));
  });
  it("preserves the original introduction and contact URLs", () => {
    const hero = source("src/Components/Hero.jsx");
    for (const url of [
      profile.resume,
      profile.phone,
      ...profile.socials.map((s) => s.url),
    ])
      expect(hero).toContain(url);
    expect(profile.introduction).toBe(
      "Software Engineer building scalable mobile and web apps with clean architecture and solid system design.",
    );
  });
});
