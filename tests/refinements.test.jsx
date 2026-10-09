import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import {
  palettes,
  appearanceKey,
  readAppearance,
  saveAppearance,
} from "../src/forged/terminal/palettes";
import {
  execute,
  complete,
  initialSession,
} from "../src/forged/terminal/commands";
import { referencesFor } from "../src/forged/associations";
import { experiences } from "../src/forged/content";
import { projects } from "../src/forged/catalog";
import { PortfolioContext } from "../src/forged/context";
import Terminal from "../src/forged/terminal/Terminal";
import Skills from "../src/forged/Skills";
import ProjectArtwork from "../src/forged/ProjectArtwork";
afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});
describe("terminal appearance", () => {
  it("ignores the legacy default, validates and persists every explicit palette", () => {
    localStorage.setItem("forged-terminal-theme", "green");
    expect(readAppearance()).toBe("orange");
    for (const { id } of palettes) {
      expect(execute(`theme ${id}`).state.palette).toBe(id);
      expect(complete("theme ", initialSession)).toContain(`theme ${id}`);
      saveAppearance(id);
      expect(readAppearance()).toBe(id);
    }
    localStorage.setItem(appearanceKey, "unknown");
    expect(readAppearance()).toBe("orange");
    expect(execute("theme unknown").error).toBe(true);
  });
  it("survives blocked storage", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw Error("blocked");
    });
    expect(readAppearance()).toBe("orange");
    expect(() => saveAppearance("amber")).not.toThrow();
  });
  it("keeps the selector and command session synchronized", () => {
    window.matchMedia = vi.fn(() => ({ matches: false }));
    Element.prototype.scrollIntoView = vi.fn();
    function Harness() {
      const [terminal, setTerminal] = useState({
        session: initialSession,
        entries: [],
        input: "",
      });
      return (
        <PortfolioContext.Provider
          value={{
            terminal,
            setTerminal,
            switchMode: vi.fn(),
            setPaletteOpen: vi.fn(),
          }}
        >
          <Terminal />
        </PortfolioContext.Provider>
      );
    }
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Bone", exact: true }));
    expect(readAppearance()).toBe("bone");
    const input = screen.getByRole("textbox", { name: "Terminal command" });
    fireEvent.change(input, { target: { value: "theme amber" } });
    fireEvent.submit(input.closest("form"));
    expect(
      screen
        .getByRole("button", { name: "Amber", exact: true })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(readAppearance()).toBe("amber");
  });
});
describe("verified stack references", () => {
  it("uses exact records and explicit spelling/acronym aliases", () => {
    expect(referencesFor("Nest.js").experiences).toEqual([experiences[0]]);
    expect(referencesFor("Express.js").projects.map((x) => x.project)).toEqual(
      projects.slice(0, 4),
    );
    expect(referencesFor("MySql").experiences).toEqual([experiences[0]]);
    expect(referencesFor("Tailwind").projects).toHaveLength(5);
    expect(referencesFor("Figma")).toEqual({ projects: [], experiences: [] });
    expect(referencesFor("Git").projects).toEqual([]);
  });
  it("restores a pinned technology and renders original experience excerpts", () => {
    render(
      <MemoryRouter
        initialEntries={["/skills?category=backend&technology=Nest.js"]}
      >
        <Skills />
      </MemoryRouter>,
    );
    expect(document.querySelector(".technology-detail h3").textContent).toBe(
      "Nest.js",
    );
    for (const point of experiences[0].points)
      expect(screen.getByText(point)).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Find a technology"), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("No technologies found.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reset selection" }));
    expect(document.querySelector(".technology-detail")).toBeNull();
  });
});
it("falls back to the unchanged original project image on cover failure", () => {
  render(<ProjectArtwork project={projects[0]} slug="techtribe" />);
  const img = screen.getByRole("img");
  fireEvent.error(img);
  expect(img.getAttribute("src")).toBe(projects[0].image);
  expect(img.hasAttribute("srcset")).toBe(false);
});
