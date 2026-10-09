import PropTypes from "prop-types";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PortfolioContext } from "./context";
import { ThemeContext } from "../context/theme-context";
import { Navigation, Footer } from "./Shell";
import Hero from "./Hero";
import Projects, { ProjectDetail } from "./Projects";
import Experience, { Overview } from "./Experience";
import Skills from "./Skills";
import Contact from "./Contact";
// Build-time HTML provides the same actual page content before JavaScript loads.
export default function StaticPage({ path }) {
  const noop = () => {};
  return (
    <MemoryRouter initialEntries={[path]}>
      <ThemeContext.Provider
        value={{ theme: "dark", isDark: true, toggleTheme: noop }}
      >
        <PortfolioContext.Provider
          value={{ mode: "visual", switchMode: noop, setPaletteOpen: noop }}
        >
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navigation />
          <main id="main-content" className="visual-main">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/overview" element={<Overview />} />
            </Routes>
          </main>
          <Footer />
        </PortfolioContext.Provider>
      </ThemeContext.Provider>
    </MemoryRouter>
  );
}
StaticPage.propTypes = { path: PropTypes.string.isRequired };
