import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "../src/forged/Contact";
import Projects from "../src/forged/Projects";
import { projects } from "../src/assets/data";
import {
  readPreference,
  savePreference,
  resolveMode,
} from "../src/forged/storage";
import {
  execute,
  initialSession,
  registry,
} from "../src/forged/terminal/commands";
import emailjs from "@emailjs/browser";
vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});
describe("content and browser behavior", () => {
  it("renders all original projects with unchanged full descriptions", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );
    const descriptions = [
      ...document.querySelectorAll(".project-description"),
    ].map((x) => x.textContent);
    expect(descriptions).toEqual(projects.map((p) => p.description));
  });
  it("handles unavailable and corrupted preferences and honors explicit URLs", () => {
    localStorage.setItem("mode", "obsolete");
    expect(readPreference("mode", ["visual", "terminal"], "visual")).toBe(
      "visual",
    );
    expect(resolveMode("?mode=visual", "terminal")).toBe("visual");
    expect(resolveMode("?mode=terminal", "visual")).toBe("terminal");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readPreference("mode", ["visual"], "visual")).toBe("visual");
    expect(() => savePreference("mode", "visual")).not.toThrow();
  });
  it("documents and executes every no-argument command", () => {
    const help = execute("help")
      .output.map((x) => x.text)
      .join("\n");
    for (const name of Object.keys(registry)) expect(help).toContain(name);
    for (const command of [
      "whoami",
      "about",
      "ls",
      "pwd",
      "skills",
      "skills --backend",
      "experience",
      "education",
      "timeline",
      "contact",
      "socials",
      "resume",
      "theme",
      "history",
      "clear",
      "date",
      "gui",
      "exit",
    ])
      expect(execute(command).error, command).not.toBe(true);
    expect(
      execute("history", { ...initialSession, history: ["help"] }).output[0]
        .text,
    ).toContain("help");
    expect(
      execute("date", initialSession, new Date(2026, 0, 1)).output[0].text,
    ).toBe(new Date(2026, 0, 1).toLocaleString());
  });
});
describe("contact", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test-service");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test-template");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test-public-key");
    emailjs.sendForm.mockReset();
  });
  const fill = () => {
    fireEvent.change(screen.getByLabelText("NAME_INPUT"), {
      target: { value: "Visitor" },
    });
    fireEvent.change(screen.getByLabelText("EMAIL_ADDRESS"), {
      target: { value: "visitor@example.com" },
    });
    fireEvent.change(screen.getByLabelText("MESSAGE_BODY"), {
      target: { value: "Hello" },
    });
  };
  it("focuses invalid fields without sending", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "EXECUTE_SEND" }));
    expect(document.activeElement.id).toBe("name");
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });
  it("sends with unchanged EmailJS field names and shows success", async () => {
    emailjs.sendForm.mockResolvedValue({ status: 200 });
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    fill();
    fireEvent.click(screen.getByRole("button", { name: "EXECUTE_SEND" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        "TRANSMISSION_COMPLETE",
      ),
    );
    expect(emailjs.sendForm.mock.calls[0][0]).toBe("test-service");
    expect(screen.getByLabelText("NAME_INPUT").value).toBe("");
  });
  it("preserves input and reports sending failures", async () => {
    emailjs.sendForm.mockRejectedValue(new Error("offline"));
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    fill();
    fireEvent.click(screen.getByRole("button", { name: "EXECUTE_SEND" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "Failed to send",
      ),
    );
    expect(screen.getByLabelText("MESSAGE_BODY").value).toBe("Hello");
  });
  it("offers contact links when configuration is missing", () => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "");
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    fill();
    fireEvent.click(screen.getByRole("button", { name: "EXECUTE_SEND" }));
    expect(screen.getByRole("status").textContent).toContain("unavailable");
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });
});
