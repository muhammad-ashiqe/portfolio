import {
  projects,
  programmingLanguages,
  frontendDevelopment,
  backendAndDatabase,
  librariesAndDevTools,
  cloudAndDeployment,
  designAndContent,
  paymentGateways,
} from "../assets/data";
export { projects };
export const projectMeta = [
  "techtribe",
  "fragrencia",
  "quickbite",
  "connectu",
  "moviemap",
  "coinwatch",
].map((slug, index) => ({
  slug,
  featured: index < 2,
  type: index < 4 ? "full-stack" : "frontend",
  aliases:
    index < 4 ? ["react", "mongodb", "express", "node.js", "mern"] : ["react"],
}));
export const skillGroups = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: programmingLanguages,
  },
  {
    id: "frontend",
    label: "Frontend Development",
    skills: frontendDevelopment,
  },
  { id: "backend", label: "Backend & Database", skills: backendAndDatabase },
  { id: "tools", label: "Dev Tools & Libraries", skills: librariesAndDevTools },
  { id: "cloud", label: "Cloud & Deployment", skills: cloudAndDeployment },
  { id: "design", label: "Design & Content", skills: designAndContent },
  { id: "payments", label: "Payment Gateways", skills: paymentGateways },
];
export function filterProjects({
  featured = false,
  technology = "",
  type = "",
} = {}) {
  const term = technology.toLowerCase();
  return projects
    .map((project, index) => ({ project, meta: projectMeta[index], index }))
    .filter(
      ({ project, meta }) =>
        (!featured || meta.featured) &&
        (!type || meta.type === type) &&
        (!term ||
          [...project.tools.map((x) => x.toLowerCase()), ...meta.aliases].some(
            (x) => x.includes(term),
          )),
    );
}
