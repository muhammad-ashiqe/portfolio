import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { projects, projectMeta, filterProjects } from "./catalog";
import { ExternalLink, SectionHeading } from "./ui";
import PropTypes from "prop-types";
function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      <ExternalLink href={project.github}>
        SRC_CODE <ArrowUpRight size={15} />
      </ExternalLink>
      <ExternalLink href={project.demo}>
        DEPLOY <ArrowUpRight size={15} />
      </ExternalLink>
    </div>
  );
}
ProjectLinks.propTypes = { project: PropTypes.object.isRequired };
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const technology = params.get("technology") || "";
  const type = ["frontend", "full-stack"].includes(params.get("type"))
    ? params.get("type")
    : "";
  const featured = params.get("show") === "featured";
  const list = params.get("view") === "list";
  const update = (key, value) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };
  const matches = filterProjects({ featured, technology, type });
  return (
    <section className="page projects-page">
      <SectionHeading
        number="02"
        label="SELECTED WORK / ARCHIVE"
        title="Built to work"
      />
      <div className="project-toolbar">
        <div className="segmented">
          <button aria-pressed={!featured} onClick={() => update("show", "")}>
            All projects <span>06</span>
          </button>
          <button
            aria-pressed={featured}
            onClick={() => update("show", "featured")}
          >
            Featured <span>02</span>
          </button>
        </div>
        <div className="filter-controls">
          <label htmlFor="technology-filter">Technology</label>
          <select
            id="technology-filter"
            value={technology}
            onChange={(e) => update("technology", e.target.value)}
          >
            <option value="">All technologies</option>
            {[...new Set(["react", ...projects.flatMap((p) => p.tools)])].map(
              (t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ),
            )}
            {technology &&
              !["react", ...projects.flatMap((p) => p.tools)].includes(
                technology,
              ) && <option value={technology}>{technology}</option>}
          </select>
          <label htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            value={type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="">All types</option>
            <option value="full-stack">Full-stack</option>
            <option value="frontend">Frontend</option>
          </select>
          <button
            className="icon-button"
            aria-label={list ? "Switch to grid view" : "Switch to list view"}
            onClick={() => update("view", list ? "" : "list")}
          >
            {list ? <LayoutGrid size={19} /> : <List size={19} />}
          </button>
        </div>
      </div>
      <div
        className={list ? "project-collection list-view" : "project-collection"}
      >
        {matches.map(({ project, meta, index }) => (
          <article className={"project-entry project-" + index} key={meta.slug}>
            <div className="project-number">
              {String(index + 1).padStart(2, "0")}
              <span>/ 06</span>
            </div>
            <Link to={"/projects/" + meta.slug} className="project-image">
              <img
                src={project.image}
                alt={project.title}
                width="400"
                height="300"
                loading="lazy"
              />
              <span className="image-corner">
                <ArrowUpRight size={25} />
              </span>
            </Link>
            <div className="project-copy">
              <p className="eyebrow">
                {meta.type} {meta.featured ? " / FEATURED" : ""}
              </p>
              <h2>
                <Link to={"/projects/" + meta.slug}>{project.title}</Link>
              </h2>
              <p className="project-description">{project.description}</p>
              <div className="tags">
                {project.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
      {!matches.length && (
        <div className="empty-state">
          <p>No projects match these filters.</p>
          <button
            className="button"
            onClick={() =>
              setParams((current) => {
                const next = new URLSearchParams(current);
                ["technology", "type", "show"].forEach((k) => next.delete(k));
                return next;
              })
            }
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
export function ProjectDetail() {
  const { slug } = useParams();
  const index = projectMeta.findIndex((m) => m.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  return (
    <section className="page project-detail">
      <Link className="text-link" to="/projects">
        <ArrowLeft size={16} /> All projects
      </Link>
      <SectionHeading
        number={String(index + 1).padStart(2, "0")}
        label="PROJECT ARCHIVE"
        title={project.title}
        punctuate={false}
      />
      <div className="detail-layout">
        <img src={project.image} alt={project.title} width="400" height="300" />
        <div>
          <p className="detail-description">{project.description}</p>
          <div className="tags">
            {project.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
      <nav className="project-pagination" aria-label="Project navigation">
        <Link to={"/projects/" + projectMeta[(index + 5) % 6].slug}>
          <ArrowLeft size={18} /> Previous project
        </Link>
        <Link to={"/projects/" + projectMeta[(index + 1) % 6].slug}>
          Next project <ArrowRight size={18} />
        </Link>
      </nav>
    </section>
  );
}
export function NotFound() {
  return (
    <section className="page not-found">
      <SectionHeading
        number="404"
        label="PAGE NOT FOUND"
        title="Out of bounds"
      />
      <p>This page is not in the archive.</p>
      <Link className="button primary" to="/">
        Return home <ArrowUpRight size={18} />
      </Link>
      <Link className="text-link" to="/?mode=terminal">
        Open terminal
      </Link>
    </section>
  );
}
