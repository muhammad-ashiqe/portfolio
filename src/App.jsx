import { readAppearance } from "./forged/terminal/palettes";
import { ScrollProgress } from "./forged/Motion";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { PortfolioContext } from "./forged/context";
import { readPreference, resolveMode, savePreference } from "./forged/storage";
import { initialSession } from "./forged/terminal/commands";
import { Navigation, Footer } from "./forged/Shell";
import Hero from "./forged/Hero";
import CommandPalette from "./forged/CommandPalette";
import { profile } from "./forged/content";
import { projects, projectMeta } from "./forged/catalog";
const Projects = lazy(() => import("./forged/Projects"));
const ProjectDetail = lazy(() =>
  import("./forged/Projects").then((m) => ({ default: m.ProjectDetail })),
);
const NotFound = lazy(() =>
  import("./forged/Projects").then((m) => ({ default: m.NotFound })),
);
const Experience = lazy(() => import("./forged/Experience"));
const Overview = lazy(() =>
  import("./forged/Experience").then((m) => ({ default: m.Overview })),
);
const Skills = lazy(() => import("./forged/Skills"));
const Contact = lazy(() => import("./forged/Contact"));
const Terminal = lazy(() => import("./forged/terminal/Terminal"));
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollPositions = useRef(new Map());
  const visualScroll = useRef(0);
  const [savedMode, setSavedMode] = useState(() =>
    readPreference("forged-mode", ["visual", "terminal"], "visual"),
  );
  const mode = resolveMode(location.search, savedMode);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminal, setTerminal] = useState(() => ({
    session: {
      ...initialSession,
      palette: readAppearance(),
    },
    entries: [],
    input: "",
  }));
  const switchMode = useCallback(
    (next) => {
      if (mode === "visual") visualScroll.current = window.scrollY;
      scrollPositions.current.set(location.key, window.scrollY);
      const params = new URLSearchParams(location.search);
      params.set("mode", next);
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
          hash: location.hash,
        },
        { state: { visualScroll: visualScroll.current } },
      );
      savePreference("forged-mode", next);
      setSavedMode(next);
    },
    [location, mode, navigate],
  );
  useEffect(() => {
    // Canonicalize once so browser Back restores an explicit mode, independent of preferences.
    if (
      !["visual", "terminal"].includes(
        new URLSearchParams(location.search).get("mode"),
      )
    ) {
      const params = new URLSearchParams(location.search);
      params.set("mode", mode);
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
          hash: location.hash,
        },
        { replace: true, state: location.state },
      );
    }
  }, [location, mode, navigate]);
  useEffect(() => {
    const key = location.key;
    const positions = scrollPositions.current;
    const y =
      positions.get(key) ??
      (mode === "visual" ? (location.state?.visualScroll ?? 0) : 0);
    const remember = () => positions.set(key, window.scrollY);
    const frame = requestAnimationFrame(() => window.scrollTo(0, y));
    window.addEventListener("scroll", remember, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", remember);
    };
  }, [location.key, location.state, mode]);
  useEffect(() => {
    const index = projectMeta.findIndex(
      (m) => location.pathname === "/projects/" + m.slug,
    );
    const title =
      index >= 0
        ? projects[index].title
        : {
            "/": "Ashiqe | Portfolio",
            "/projects": "Projects",
            "/skills": "Skills",
            "/experience": "Experience",
            "/contact": "Contact",
            "/overview": "Quick overview",
          }[location.pathname] || "Page not found";
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        index >= 0 ? projects[index].description : profile.introduction,
      );
    const canonical = "https://muhammad-ashiqe.vercel.app" + location.pathname;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", canonical);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", canonical);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute(
        "content",
        index >= 0 ? projects[index].description : profile.introduction,
      );
  }, [location.pathname]);
  const value = useMemo(
    () => ({
      mode,
      switchMode,
      paletteOpen,
      setPaletteOpen,
      terminal,
      setTerminal,
    }),
    [mode, switchMode, paletteOpen, terminal],
  );
  return (
    <PortfolioContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {mode === "terminal" ? (
          <main id="main-content">
            <Suspense
              fallback={<p className="loading-state">Opening terminal…</p>}
            >
              <Terminal />
            </Suspense>
          </main>
        ) : (
          <>
            <ScrollProgress />
            <Navigation />
            <main id="main-content" className="visual-main">
              <Suspense fallback={<p className="loading-state">Loading…</p>}>
                <div className="route-frame" key={location.pathname}>
                  <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </Suspense>
            </main>
            <Footer />
          </>
        )}
        <CommandPalette />
      </MotionConfig>
    </PortfolioContext.Provider>
  );
}
