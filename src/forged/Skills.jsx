import { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { skillGroups } from "./catalog";
import { referencesFor } from "./associations";
import { SectionHeading } from "./ui";
export default function Skills() {
  const location = useLocation();
  const updateParams = (next, replace = false) =>
    setParams(next, {
      replace,
      state: { ...location.state, visualScroll: window.scrollY },
    });
  const [params, setParams] = useSearchParams();
  const [hovered, setHovered] = useState(null);
  const [collapsed, setCollapsed] = useState(null);
  const group =
    skillGroups.find((g) => g.id === params.get("category")) ||
    skillGroups.find((g) => g.id === "frontend");
  const selected = group.skills.find(
    (s) => s.name === params.get("technology"),
  );
  const query = params.get("q") || "";
  function select(category, technology) {
    const next = new URLSearchParams(window.location.search);
    next.set("category", category);
    if (technology) next.set("technology", technology);
    else next.delete("technology");
    setHovered(null);
    setCollapsed(null);
    updateParams(next);
  }
  function reset() {
    const next = new URLSearchParams(window.location.search);
    ["category", "technology", "q"].forEach((key) => next.delete(key));
    setHovered(null);
    setCollapsed(null);
    updateParams(next);
  }
  const preview = selected ? { skill: selected, group } : null;
  const highlight = hovered || preview;
  const refs = preview
    ? referencesFor(preview.skill.name)
    : { projects: [], experiences: [] };
  const visibleGroups = skillGroups.filter(
    (g) =>
      !query ||
      g.skills.some((s) => s.name.toLowerCase().includes(query.toLowerCase())),
  );
  const visibleSkills = group.skills.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );
  const technologyButton = (skill, category, extra = "") => (
    <button
      key={skill.name}
      className={extra}
      aria-pressed={selected?.name === skill.name && group.id === category.id}
      onMouseEnter={() => setHovered({ skill, group: category })}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered({ skill, group: category })}
      onBlur={() => setHovered(null)}
      onClick={() => select(category.id, skill.name)}
    >
      {skill.icon && <skill.icon aria-hidden="true" />}
      {skill.name}
      <span aria-hidden="true">+</span>
    </button>
  );
  return (
    <section className="page skills-page">
      <SectionHeading
        number="04"
        label="CAPABILITIES / EXPLORE MY STACK"
        title="Connected thinking"
      />
      <div className="stack-toolbar">
        <label htmlFor="stack-search">Find a technology</label>
        <input
          id="stack-search"
          type="search"
          value={query}
          placeholder="Search technologies…"
          onChange={(e) => {
            const next = new URLSearchParams(window.location.search);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            updateParams(next, true);
          }}
        />
        <button className="button" onClick={reset}>
          Reset selection
        </button>
      </div>
      <div className="stack-layout">
        <div
          className="stack-layers"
          role="group"
          aria-label="Technology categories"
        >
          {visibleGroups.map((g) => (
            <div
              className="stack-category"
              key={g.id}
              data-highlighted={highlight?.group.id === g.id}
            >
              <button
                aria-pressed={g.id === group.id}
                aria-expanded={
                  (g.id === group.id && collapsed !== g.id) || !!query
                }
                aria-controls={"mobile-" + g.id}
                onClick={() => {
                  const collapse = g.id === group.id && collapsed !== g.id;
                  select(g.id);
                  setCollapsed(collapse ? g.id : null);
                }}
              >
                <span className="layer-index">
                  0{skillGroups.indexOf(g) + 1}
                </span>
                <span>{g.label}</span>
                <span aria-hidden="true">↗</span>
              </button>
              <div
                id={"mobile-" + g.id}
                className="mobile-technologies technology-list"
                hidden={(g.id !== group.id || collapsed === g.id) && !query}
              >
                {g.skills
                  .filter((s) =>
                    s.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((s) => technologyButton(s, g))}
              </div>
            </div>
          ))}
          {!visibleGroups.length && <p>No technologies found.</p>}
        </div>
        <section className="stack-panel" aria-labelledby="stack-title">
          <p className="eyebrow">SELECT A TECHNOLOGY / CLICK TO PIN</p>
          <h2 id="stack-title">{group.label}</h2>
          <svg
            className="stack-map"
            viewBox={`0 0 640 ${Math.max(240, visibleSkills.length * 66 + 20)}`}
            aria-label={`${group.label} technology map`}
          >
            <path
              d={`M90 25V${visibleSkills.length * 66 - 10}`}
              stroke="var(--border)"
              fill="none"
            />
            <circle cx="90" cy="25" r="12" fill="var(--accent)" />
            {visibleSkills.map((skill, i) => (
              <g key={skill.name}>
                <path
                  d={`M90 25V${i * 66 + 44}H200`}
                  fill="none"
                  stroke={
                    highlight?.skill.name === skill.name
                      ? "var(--accent)"
                      : "var(--border)"
                  }
                  strokeWidth="2"
                />
                <foreignObject x="200" y={i * 66 + 18} width="420" height="52">
                  <div className="technology-list">
                    {technologyButton(skill, group, "map-node")}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
          <div className="stack-search-results technology-list">
            {query &&
              visibleGroups.flatMap((g) =>
                g.skills
                  .filter((s) =>
                    s.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((s) => technologyButton(s, g)),
              )}
          </div>
          {preview && (
            <div className="technology-detail" data-pinned={!!selected}>
              <p className="eyebrow">PINNED / {preview.group.label}</p>
              <h3>{preview.skill.name}</h3>
              {refs.projects.length > 0 && (
                <>
                  <p className="eyebrow">PROJECTS</p>
                  {refs.projects.map(({ project, meta }) => (
                    <Link key={meta.slug} to={"/projects/" + meta.slug}>
                      {project.title} ↗
                    </Link>
                  ))}
                </>
              )}
              {refs.experiences.map((entry) => (
                <div className="stack-experience" key={entry.company}>
                  <Link to="/experience">{entry.company} ↗</Link>
                  <p>{entry.role}</p>
                  <ul>
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {!refs.projects.length && !refs.experiences.length && (
                <p className="muted">{preview.group.label}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
