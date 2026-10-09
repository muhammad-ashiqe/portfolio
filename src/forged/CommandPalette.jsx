import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { usePortfolio } from "./context";
import { useTheme } from "../context/theme-context";
import { projects, projectMeta, skillGroups } from "./catalog";
import { profile } from "./content";
export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, switchMode, mode } = usePortfolio();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dialog = useRef();
  const input = useRef();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const actions = [
    ...[
      ["Home", "/"],
      ["Work", "/projects"],
      ["Experience", "/experience"],
      ["Stack", "/skills"],
      ["Contact", "/contact"],
      ["Quick overview", "/overview"],
    ].map(([label, url]) => ({
      label,
      run: () => navigate(url + "?mode=visual"),
    })),
    ...projects.map((p, i) => ({
      label: p.title,
      run: () => navigate("/projects/" + projectMeta[i].slug + "?mode=visual"),
    })),
    ...skillGroups.map((g) => ({
      label: g.label,
      run: () => navigate("/skills?mode=visual&category=" + g.id),
    })),
    ...skillGroups.flatMap((g) =>
      g.skills.map((skill) => ({
        label: skill.name,
        run: () =>
          navigate(
            "/skills?mode=visual&category=" +
              g.id +
              "&technology=" +
              encodeURIComponent(skill.name),
          ),
      })),
    ),
    {
      label: mode === "visual" ? "Terminal Mode" : "Visual Mode",
      run: () => switchMode(mode === "visual" ? "terminal" : "visual"),
    },
    { label: "Toggle theme", run: toggleTheme },
    { label: "VIEW_RESUME", href: profile.resume },
    { label: "REQUEST_A_CALLBACK", href: profile.phone },
    ...profile.socials.map((s) => ({ label: s.label, href: s.url })),
  ];
  const results = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (paletteOpen) {
      dialog.current.showModal();
      input.current?.focus();
    } else dialog.current.close();
  }, [paletteOpen]);
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setPaletteOpen]);
  const close = () => {
    setPaletteOpen(false);
    setQuery("");
    setActive(0);
  };
  const run = (action) => {
    if (action.run) action.run();
    close();
  };
  return (
    <dialog
      ref={dialog}
      className="command-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      aria-labelledby="command-title"
    >
      <div className="command-panel">
        <div className="command-search">
          <Search size={19} />
          <label
            className="sr-only"
            id="command-title"
            htmlFor="palette-search"
          >
            Search portfolio
          </label>
          <input
            ref={input}
            id="palette-search"
            placeholder="Where would you like to go?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.max(
                  0,
                  Math.min(
                    results.length - 1,
                    active + (e.key === "ArrowDown" ? 1 : -1),
                  ),
                );
                setActive(next);
                document
                  .getElementById("palette-result-" + next)
                  ?.scrollIntoView({ block: "nearest" });
              }
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("palette-result-" + active)?.click();
              }
            }}
          />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close command palette"
          >
            <X size={18} />
          </button>
        </div>
        <div className="command-results">
          {results.map((action, i) =>
            action.href ? (
              <a
                id={"palette-result-" + i}
                className={active === i ? "selected" : ""}
                key={action.label}
                href={action.href}
                target={action.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={close}
              >
                {action.label}
                <span>↗</span>
              </a>
            ) : (
              <button
                id={"palette-result-" + i}
                className={active === i ? "selected" : ""}
                key={action.label}
                onClick={() => run(action)}
              >
                {action.label}
                <span>↗</span>
              </button>
            ),
          )}
          {!results.length && <p>No results found.</p>}
        </div>
        <div className="command-hint">
          ↑ ↓ to browse · Enter to select · Esc to close
        </div>
      </div>
    </dialog>
  );
}
