import { filterProjects } from "./catalog";
import { experiences, education, profile } from "./content";
import { SectionHeading, ExternalLink } from "./ui";
import { Link } from "react-router-dom";
export default function Experience() {
  return (
    <section className="page">
      <SectionHeading
        number="03"
        label="EXPERIENCE / EDUCATION"
        title="The work behind"
      />
      <div className="timeline">
        {experiences.map((item, index) => (
          <article className="timeline-entry" key={item.company}>
            <div className="timeline-date">
              <span className="eyebrow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item.duration}</p>
              <small>{item.location}</small>
            </div>
            <div className="timeline-content">
              <span className="eyebrow">{item.type}</span>
              <h2>{item.role}</h2>
              <h3>{item.company}</h3>
              <details open>
                <summary>
                  Responsibilities <span aria-hidden="true">↗</span>
                </summary>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </details>
              <div className="tags">
                {item.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <ExternalLink href={item.logo} className="text-link">
                {item.company} ↗
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>
      <div className="education">
        <p className="eyebrow">ACADEMY_ARCHIVE</p>
        {education.map((item) => (
          <article key={item.degree}>
            <h2>{item.degree}</h2>
            <p>{item.institution}</p>
            <p className="muted">
              {item.duration} / {item.location}
            </p>
            <div className="tags">
              {item.courses.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Overview() {
  return (
    <section className="page overview-page">
      <SectionHeading
        number="00"
        label="QUICK OVERVIEW"
        title={profile.name}
        punctuate={false}
      />
      <p className="overview-intro">{profile.introduction}</p>
      <div className="overview-grid">
        <div>
          <h2>Experience</h2>
          {experiences.map((e) => (
            <article key={e.company}>
              <h3>{e.role}</h3>
              <p>{e.company}</p>
              <p>{e.duration}</p>
              <div className="tags">
                {e.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div>
          <h2>Selected work</h2>
          {filterProjects({ featured: true }).map(({ project, meta }) => (
            <article key={meta.slug}>
              <h3>
                <Link to={"/projects/" + meta.slug}>{project.title} ↗</Link>
              </h3>
              <div className="tags">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          ))}
          <h2>Explore</h2>
          <Link to="/projects">All projects ↗</Link>
          <Link to="/skills">Technology categories ↗</Link>
          <Link to="/experience">Experience & education ↗</Link>
          <ExternalLink href={profile.resume}>VIEW_RESUME ↗</ExternalLink>
          <Link to="/contact">Contact ↗</Link>
          <ExternalLink href={profile.phone}>REQUEST_A_CALLBACK ↗</ExternalLink>
          {profile.socials.map((s) => (
            <ExternalLink key={s.label} href={s.url}>
              {s.label} ↗
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}
