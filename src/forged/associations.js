import { projects, projectMeta } from "./catalog";
import { experiences } from "./content";
// Explicit spelling aliases and the documented MERN acronym only.
const aliases = {
  "express.js": "express",
  "nest.js": "nestjs",
  "tailwind css": "tailwind",
};
export const technologyKey = (label) =>
  aliases[label.toLowerCase()] || label.toLowerCase();
export function referencesFor(label) {
  const key = technologyKey(label);
  return {
    projects: projects.flatMap((project, index) => {
      const technologies = project.tools.flatMap((tool) =>
        /^mern(?: stack)?$/i.test(tool)
          ? ["mongodb", "express", "react", "node.js"]
          : [technologyKey(tool)],
      );
      return technologies.includes(key)
        ? [{ project, meta: projectMeta[index] }]
        : [];
    }),
    experiences: experiences.filter((entry) =>
      entry.tech.some((tech) => technologyKey(tech) === key),
    ),
  };
}
