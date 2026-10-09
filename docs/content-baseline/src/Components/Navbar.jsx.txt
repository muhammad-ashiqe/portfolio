import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NavItem = ({ to, label, index, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
          isActive ? "theme-accent" : "theme-text-muted theme-hover-text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`text-[10px] opacity-70 ${
              isActive ? "theme-accent" : "theme-text-faint"
            }`}
          >
            0{index}
          </span>
          {label}
          {isActive && (
            <motion.div
              layoutId="navIndicator"
              className="absolute inset-0 -skew-x-12 border theme-border-strong theme-accent-soft"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t theme-border opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r theme-border opacity-0 transition-opacity group-hover:opacity-100" />
        </>
      )}
    </NavLink>
  );
};

const ThemeToggle = ({ mobile = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group inline-flex items-center gap-3 border px-3 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-all theme-hover-border-strong ${
        mobile ? "w-full justify-between" : ""
      } theme-border theme-surface`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="flex items-center gap-2 theme-text-secondary">
        {isDark ? <SunMedium size={14} /> : <MoonStar size={14} />}
        {isDark ? "LIGHT" : "DARK"}
      </span>
      <span className="relative flex h-5 w-10 items-center rounded-full p-0.5 theme-panel">
        <span
          className={`h-4 w-4 rounded-full transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </span>
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 px-6 py-6 transition-all duration-500 md:px-12 ${
          scrolled
            ? "py-4 theme-surface-strong border-b theme-border backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-4">
            <div className="theme-logo flex h-8 w-8 items-center justify-center text-xs font-black shadow-[0_0_0_1px_var(--color-border-strong)] transition-transform duration-300 group-hover:scale-105">
              MA
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-mono tracking-widest theme-text-primary">
                ASHIQE_SYSTEMS
              </div>
              <div className="text-[10px] tracking-tight theme-text-faint">
                STATUS: <span className="theme-success">ONLINE</span>
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <nav>
              <ul className="flex items-center gap-2">
                <NavItem to="/" label="CORE" index={1} />
                <NavItem to="/projects" label="WORKS" index={2} />
                <NavItem to="/experience" label="LOGS" index={3} />
                <NavItem to="/skills" label="TECH" index={4} />
                <NavItem to="/contact" label="COMM" index={5} />
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border px-3 py-2 font-mono text-xs transition-colors theme-border theme-text-primary theme-hover-border-strong"
            >
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 right-0 top-0 z-[60] w-[280px] border-l theme-border theme-surface-strong md:hidden"
          >
            <div className="p-6 pt-24">
              <nav>
                <ul className="flex flex-col gap-4">
                  <NavItem to="/" label="CORE" index={1} />
                  <NavItem to="/projects" label="WORKS" index={2} />
                  <NavItem to="/experience" label="LOGS" index={3} />
                  <NavItem to="/skills" label="TECH" index={4} />
                  <NavItem to="/contact" label="COMM" index={5} />
                </ul>
              </nav>

              <div className="mt-8">
                <ThemeToggle mobile />
              </div>

              <div className="mt-12 border-t pt-6 theme-border">
                <div className="space-y-1 text-xs font-mono theme-text-muted">
                  <p>SYSTEM_VER: 2.0.4</p>
                  <p>BUILD: CYBER_BRUTALIST</p>
                  <p className="flex items-center gap-2">
                    STATUS:
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--color-success)" }}
                    />
                    ONLINE
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[59] backdrop-blur-sm theme-overlay md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
