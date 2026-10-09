import { ThemeContext } from "./theme-context";
import PropTypes from "prop-types";
import { readPreference, savePreference } from "../forged/storage";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

const getSystemTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = readPreference(STORAGE_KEY, ["light", "dark"], null);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return getSystemTheme();
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [hasExplicitPreference, setHasExplicitPreference] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const storedTheme = readPreference(STORAGE_KEY, ["light", "dark"], null);
    return storedTheme === "light" || storedTheme === "dark";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (hasExplicitPreference) {
      return undefined;
    }

    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [hasExplicitPreference]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    if (hasExplicitPreference) {
      savePreference(STORAGE_KEY, theme);
    } else {
      savePreference(STORAGE_KEY, "system");
    }
  }, [hasExplicitPreference, theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme: () => {
        setHasExplicitPreference(true);
        setTheme((currentTheme) =>
          currentTheme === "dark" ? "light" : "dark",
        );
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = { children: PropTypes.node };
