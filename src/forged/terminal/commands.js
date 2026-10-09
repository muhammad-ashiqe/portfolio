import { tokenize } from "./parser";
import { projects, projectMeta, skillGroups, filterProjects } from "../catalog";
import { profile } from "../content";
import {
  HOME,
  text,
  projectOutput,
  experienceOutput,
  educationOutput,
  skillOutput,
  contactOutput,
  files,
  directories,
  resolvePath,
  entries,
} from "./filesystem";
export const initialSession = { cwd: HOME, palette: "green", history: [] };
export const registry = {
  help: "List commands and arguments",
  whoami: "Professional introduction",
  about: "Read about.txt",
  ls: "ls [path] — list virtual files",
  pwd: "Print virtual directory",
  cd: "cd [path] — navigate; supports ~, .. and absolute paths",
  cat: "cat <file> — read portfolio content",
  projects: "projects [--featured | --all | --filter <technology>]",
  project: "project <slug> — full project details",
  skills: "skills [--backend] — technology categories",
  experience: "Professional experience",
  education: "Education details",
  timeline: "Experience and education",
  contact: "Contact options",
  socials: "Social profile links",
  resume: "Open resume link",
  theme: "theme [green | amber] — terminal palette",
  history: "Session command history",
  clear: "Clear output (Ctrl+L)",
  date: "Local date and time",
  gui: "Return to visual portfolio",
  exit: "Alias for gui",
};
function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      diagonal = old;
    }
  }
  return row[b.length];
}
export function execute(input, previous = initialSession, now = new Date()) {
  const state = { ...previous, history: [...previous.history, input] };
  const result = (output = [], extra = {}) => ({ output, state, ...extra });
  try {
    const [command, ...args] = tokenize(input);
    if (!command) return { output: [], state: previous };
    if (!Object.hasOwn(registry, command)) {
      const suggestion = Object.keys(registry).sort(
        (a, b) => distance(command, a) - distance(command, b),
      )[0];
      throw new Error(
        `Unknown command: ${command}. ${distance(command, suggestion) <= 3 ? "Did you mean " + suggestion + "? " : ""}Type help.`,
      );
    }
    const usage = () => {
      throw new Error("Usage: " + command + " — " + registry[command]);
    };
    if (
      !["ls", "cd", "cat", "projects", "project", "skills", "theme"].includes(
        command,
      ) &&
      args.length
    )
      usage();
    switch (command) {
      case "help":
        return result(
          Object.entries(registry).map(([name, desc]) =>
            text(`${name.padEnd(12)} ${desc}`),
          ),
        );
      case "whoami":
      case "about":
        return result(files[HOME + "/about.txt"]());
      case "pwd":
        return result([text(state.cwd)]);
      case "ls": {
        if (args.length > 1) usage();
        const path = args.length ? resolvePath(args[0], state.cwd) : state.cwd;
        if (!directories.includes(path))
          throw new Error("Directory not found: " + path);
        return result(entries(path).map(text));
      }
      case "cd": {
        if (args.length > 1) usage();
        const path = resolvePath(args[0], state.cwd);
        if (!directories.includes(path))
          throw new Error("Directory not found: " + path);
        state.cwd = path;
        return result([text(path)]);
      }
      case "cat": {
        if (args.length !== 1) usage();
        const read = files[resolvePath(args[0], state.cwd)];
        if (!read)
          throw new Error(
            "File not found. Use ls to discover available files.",
          );
        return result(read());
      }
      case "projects": {
        let options = {};
        if (args.length) {
          if (args.length === 1 && ["--featured", "--all"].includes(args[0]))
            options.featured = args[0] === "--featured";
          else if (args.length === 2 && args[0] === "--filter")
            options.technology = args[1];
          else usage();
        }
        const matches = filterProjects(options);
        return result(
          matches.length
            ? matches.map((x) => projectOutput(x.project))
            : [text("No matching projects. Try projects --all.")],
        );
      }
      case "project": {
        if (args.length !== 1) usage();
        const index = projectMeta.findIndex(
          (p) => p.slug === args[0].toLowerCase(),
        );
        if (index < 0)
          throw new Error(
            "Project not found. Available: " +
              projectMeta.map((p) => p.slug).join(", "),
          );
        return result([projectOutput(projects[index])]);
      }
      case "skills":
        if (args.length && (args.length !== 1 || args[0] !== "--backend"))
          usage();
        return result(
          skillOutput(
            args.length
              ? skillGroups.filter((g) => g.id === "backend")
              : skillGroups,
          ),
        );
      case "experience":
        return result(experienceOutput());
      case "education":
        return result(educationOutput());
      case "timeline":
        return result([...experienceOutput(), ...educationOutput()]);
      case "contact":
        return result(contactOutput());
      case "socials":
        return result(
          profile.socials.map((s) => ({
            kind: "link",
            text: s.label,
            href: s.url,
          })),
        );
      case "resume":
        return result(files[HOME + "/resume.pdf"]());
      case "theme":
        if (
          args.length > 1 ||
          (args.length && !["green", "amber"].includes(args[0]))
        )
          usage();
        if (args[0]) state.palette = args[0];
        return result([
          text(`Terminal theme: ${state.palette}. Options: green, amber.`),
        ]);
      case "history":
        return result(
          state.history.map((line, i) => text(`${i + 1}  ${line}`)),
        );
      case "clear":
        return result([], { action: "clear" });
      case "date":
        return result([text(now.toLocaleString())]);
      case "gui":
      case "exit":
        return result([], { action: "gui" });
    }
  } catch (error) {
    return result([text(error.message)], { error: true });
  }
}
export function complete(input, state = initialSession) {
  const words = input.split(/\s+/);
  const command = words[0];
  const fragment = words.at(-1);
  let candidates = Object.keys(registry);
  if (words.length > 1) {
    if (command === "project") candidates = projectMeta.map((p) => p.slug);
    else if (command === "theme") candidates = ["green", "amber"];
    else if (command === "projects")
      candidates =
        words[1] === "--filter"
          ? ["react", "mongodb", "express", "node.js", "tailwind", "stripe"]
          : ["--all", "--featured", "--filter"];
    else if (command === "skills") candidates = ["--backend"];
    else if (["cd", "ls", "cat"].includes(command)) {
      const slash = fragment.lastIndexOf("/");
      const prefix = slash >= 0 ? fragment.slice(0, slash + 1) : "";
      const folder = prefix ? resolvePath(prefix, state.cwd) : state.cwd;
      candidates = entries(folder)
        .filter((x) => command !== "cd" || x.endsWith("/"))
        .map((x) => prefix + x.replace(/\/$/, ""));
    } else candidates = [];
  }
  return candidates
    .filter((x) => x.startsWith(fragment))
    .map((x) => [...words.slice(0, -1), x].join(" "));
}
