import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Sun, Moon, Command, Menu, X } from "lucide-react";
import { useTheme } from "../context/theme-context";
import { usePortfolio } from "./context";
import { profile } from "./content";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { switchMode, setPaletteOpen } = usePortfolio();
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  const links = [
    ["/projects", "Work"],
    ["/experience", "Experience"],
    ["/skills", "Stack"],
    ["/contact", "Contact"],
  ];
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Muhammad Ashiqe home">
        <span className="brand-mark">
          ma<span>↗</span>
        </span>
        <span className="brand-caption">
          ASHIQE_SYSTEMS
          <br />
          <small>FORGED / PORTFOLIO</small>
        </span>
      </Link>
      <nav
        aria-label="Main navigation"
        className={open ? "main-nav open" : "main-nav"}
        key={location.pathname}
      >
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
        <button
          className="mobile-palette"
          onClick={() => {
            setOpen(false);
            setPaletteOpen(true);
          }}
        >
          Search portfolio <Command size={16} />
        </button>
      </nav>
      <div className="nav-tools">
        <button
          className="icon-button search-trigger"
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
        >
          <Command size={17} />
        </button>
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="terminal-toggle"
          onClick={() => switchMode("terminal")}
        >
          <span aria-hidden="true">&gt;_</span> <span>Terminal</span>
        </button>
        <button
          className="icon-button menu-toggle"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
      </p>
      <Link to="/overview">
        Quick overview <ArrowUpRight size={14} />
      </Link>
      <span>FORGED — 01</span>
    </footer>
  );
}
