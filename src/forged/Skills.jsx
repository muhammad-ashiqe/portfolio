import { Link, useSearchParams } from "react-router-dom";
import { skillGroups, filterProjects } from "./catalog";
import { SectionHeading } from "./ui";
export default function Skills() {
  const [params, setParams] = useSearchParams();
  const group =
    skillGroups.find((g) => g.id === params.get("category")) ||
    skillGroups.find((g) => g.id === "frontend");
  const active = group.id;
  const selected = group.skills.find(
    (skill) => skill.name === params.get("technology"),
  );
  const select = (category, technology) => {
    const next = new URLSearchParams(window.location.search);
    next.set("category", category);
    if (technology) next.set("technology", technology);
    else next.delete("technology");
    setParams(next);
  };
  const matches = selected ? filterProjects({ technology: selected.name }) : [];
  return (
    <section className="page">
      <SectionHeading
        number="04"
        label="CAPABILITIES / EXPLORE MY STACK"
        title="Connected thinking"
      />
      <div className="stack-layout">
        <div
          className="stack-layers"
          role="group"
          aria-label="Technology categories"
        >
          {skillGroups.map((g, i) => (
            <button
              key={g.id}
              aria-pressed={g.id === active}
              onClick={() => {
                select(g.id);
              }}
            >
              <span className="layer-index">0{i + 1}</span>
              <span>{g.label}</span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <section className="stack-panel" aria-labelledby="stack-title">
          <div className="stack-diagram" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>+</i>
          </div>
          <p className="eyebrow">SELECT A TECHNOLOGY</p>
          <h2 id="stack-title">{group.label}</h2>
          <div className="technology-list">
            {group.skills.map((skill) => (
              <button
                key={skill.name}
                aria-pressed={selected?.name === skill.name}
                onClick={() => select(active, skill.name)}
              >
                {skill.icon && <skill.icon aria-hidden="true" />}
                {skill.name}
                <span aria-hidden="true">+</span>
              </button>
            ))}
          </div>
          {selected && (
            <div className="technology-detail">
              <h3>{selected.name}</h3>
              {matches.length ? (
                <>
                  <p className="eyebrow">PROJECTS</p>
                  {matches.map(({ project, meta }) => (
                    <Link key={meta.slug} to={"/projects/" + meta.slug}>
                      {project.title} ↗
                    </Link>
                  ))}
                </>
              ) : (
                <p className="muted">{group.label}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
