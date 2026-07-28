import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { GiSpanner } from "react-icons/gi";

const ProjectCard = ({ image, title, description, tools, github, demo }) => {
  return (
    <div className="group relative flex h-full w-full flex-col border transition-colors duration-300 theme-surface-strong theme-border theme-hover-border-strong">
      <div
        className="absolute -left-[1px] -top-[1px] h-4 w-4 border-l border-t opacity-0 transition-opacity group-hover:opacity-100"
        style={{ borderColor: "var(--color-accent)" }}
      />
      <div
        className="absolute -bottom-[1px] -right-[1px] h-4 w-4 border-b border-r opacity-0 transition-opacity group-hover:opacity-100"
        style={{ borderColor: "var(--color-accent)" }}
      />

      <div className="relative h-48 overflow-hidden border-b transition-colors theme-border">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-60 transition-all duration-300 group-hover:opacity-90"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-bg) 22%, transparent) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/2 translate-x-0 opacity-0 transition-all duration-500 group-hover:left-full group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-accent) 30%, transparent) 50%, transparent 100%)",
          }}
        />

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />

        <div className="absolute right-2 top-2 z-20">
          <span className="border px-2 py-1 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm theme-surface-strong theme-border theme-text-muted">
            {demo ? "LIVE_SIGNAL" : "OFFLINE"}
          </span>
        </div>
      </div>

      <div className="relative flex flex-grow flex-col p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--color-accent) 14%, transparent) 0%, transparent 48%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-5 right-5 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--color-accent) 18%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mb-4">
          <h3 className="group-hover-theme-accent font-mono text-xl font-bold uppercase tracking-tight theme-text-primary transition-colors">
            {title}
          </h3>
          <div className="mb-3 mt-2 h-px w-12 transition-all duration-500 group-hover:w-full theme-border-strong" />

          <p className="project-description h-[4.5rem] overflow-y-auto pr-2 text-sm font-light leading-relaxed theme-text-secondary">
            {description}
          </p>
        </div>

        <div className="relative z-10 mb-6 mt-auto">
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="border px-1.5 py-0.5 text-[10px] font-mono uppercase theme-border theme-text-muted"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto grid grid-cols-2 gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-hover-text-primary flex items-center justify-center gap-2 border py-2 transition-all duration-300 theme-border theme-text-secondary"
              style={{ backgroundColor: "var(--color-overlay-soft)" }}
            >
              <FaGithub className="text-sm" />
              <span className="text-xs font-mono font-bold uppercase">
                SRC_CODE
              </span>
            </a>
          )}

          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border py-2 text-white transition-all duration-300"
              style={{
                backgroundColor: "var(--color-accent)",
                borderColor: "var(--color-accent)",
              }}
            >
              <span className="text-xs font-mono font-bold uppercase">
                DEPLOY
              </span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          ) : (
            <div
              className="flex cursor-not-allowed items-center justify-center gap-2 border py-2"
              style={{
                borderColor: "color-mix(in srgb, var(--color-warning) 50%, transparent)",
                color: "var(--color-warning)",
                backgroundColor:
                  "color-mix(in srgb, var(--color-warning) 10%, transparent)",
              }}
            >
              <GiSpanner className="text-sm" />
              <span className="text-xs font-mono font-bold uppercase">
                WIP_..
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
