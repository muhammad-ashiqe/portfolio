import { projects, projectMeta, skillGroups } from "../catalog";
import { profile, experiences, education } from "../content";
export const HOME = "/home/ashiqe";
export const text = (value) => ({ kind: "text", text: value });
export const projectOutput = (project) => ({ kind: "project", project });
export const experienceOutput = () =>
  experiences.flatMap((x) => [
    text([x.company, x.role, x.duration, x.location, x.type].join("\n")),
    ...x.points.map(text),
    text(x.tech.join(" · ")),
    { kind: "link", text: x.company, href: x.logo },
  ]);
export const educationOutput = () =>
  education.flatMap((x) => [
    text([x.degree, x.institution, x.duration, x.location].join("\n")),
    ...x.courses.map(text),
  ]);
export const skillOutput = (groups) =>
  groups.flatMap((x) => [text(x.label), ...x.skills.map((s) => text(s.name))]);
export const contactOutput = () => [
  { kind: "link", text: profile.phone, href: profile.phone },
  { kind: "link", text: "Contact", href: "/contact?mode=visual" },
  ...profile.socials.map((s) => ({ kind: "link", text: s.label, href: s.url })),
];
export const files = {
  [HOME + "/about.txt"]: () => [text(profile.name), text(profile.introduction)],
  [HOME + "/contact.txt"]: contactOutput,
  [HOME + "/resume.pdf"]: () => [
    { kind: "link", text: "resume.pdf", href: profile.resume },
  ],
  [HOME + "/experience/work.txt"]: experienceOutput,
  [HOME + "/experience/education.txt"]: educationOutput,
  ...Object.fromEntries(
    projects.map((p, i) => [
      HOME + "/projects/" + projectMeta[i].slug + ".txt",
      () => [projectOutput(p)],
    ]),
  ),
  ...Object.fromEntries(
    skillGroups.map((g) => [
      HOME + "/skills/" + g.id + ".txt",
      () => skillOutput([g]),
    ]),
  ),
};
export const directories = [
  HOME,
  HOME + "/projects",
  HOME + "/experience",
  HOME + "/skills",
];
export function resolvePath(path = "~", cwd = HOME) {
  if (path === "~") return HOME;
  const expanded = path.startsWith("~/") ? HOME + path.slice(1) : path;
  const parts = (
    expanded.startsWith("/") ? expanded : cwd + "/" + expanded
  ).split("/");
  const result = [];
  for (const part of parts) {
    if (part === "..") result.pop();
    else if (part && part !== ".") result.push(part);
  }
  const resolved = "/" + result.join("/");
  if (resolved === "/" || resolved === "/home") return HOME;
  return resolved;
}
export function entries(cwd) {
  return [
    ...directories.filter((x) => x !== cwd).map((x) => x + "/"),
    ...Object.keys(files),
  ]
    .filter(
      (x) =>
        x.startsWith(cwd + "/") &&
        !x
          .slice(cwd.length + 1)
          .replace(/\/$/, "")
          .includes("/"),
    )
    .map((x) => x.slice(cwd.length + 1));
}
