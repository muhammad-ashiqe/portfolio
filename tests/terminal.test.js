import { describe, it, expect } from "vitest";
import {
  execute,
  complete,
  initialSession,
} from "../src/forged/terminal/commands.js";
import { projects } from "../src/assets/data.js";
const run = (input, state = initialSession) => execute(input, state);
describe("portfolio terminal", () => {
  it("returns every unchanged project description in source order", () => {
    expect(
      run("projects --all")
        .output.filter((x) => x.kind === "project")
        .map((x) => x.project),
    ).toEqual(projects);
  });
  it("resolves a project slug and supports React aliases", () => {
    expect(run("project techtribe").output[0].project).toEqual(projects[0]);
    expect(run("projects --filter react").output).toHaveLength(6);
    expect(run("projects --featured").output).toHaveLength(2);
  });
  it("navigates the virtual filesystem without escaping its root", () => {
    const state = run("cd projects").state;
    expect(run("pwd", state).output[0].text).toBe("/home/ashiqe/projects");
    expect(run("cat techtribe.txt", state).output[0].project).toEqual(
      projects[0],
    );
    expect(run("cd ../../../../", state).state.cwd).toBe("/home/ashiqe");
  });
  it("rejects shell syntax and unknown flags safely", () => {
    expect(run("projects; alert(1)").error).toBe(true);
    expect(run("projects --wrong").error).toBe(true);
    expect(run('project "techtribe').error).toBe(true);
    expect(run("cat /etc/passwd").error).toBe(true);
  });
  it("supports theme, aliases, helpful errors and completions", () => {
    expect(run("theme amber").state.palette).toBe("amber");
    expect(run("exit").action).toBe("gui");
    expect(run("gui").action).toBe("gui");
    expect(run("hlep").output[0].text).toContain("help");
    expect(complete("project tech", initialSession)).toContain(
      "project techtribe",
    );
    expect(complete("cd pro", initialSession)).toContain("cd projects");
  });
});
