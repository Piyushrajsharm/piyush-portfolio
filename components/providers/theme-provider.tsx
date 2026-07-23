"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  contrast: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleContrast: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("piyush-theme") as Theme | null;
    const storedContrast = window.localStorage.getItem("piyush-contrast");
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
    if (storedContrast) setContrast(storedContrast === "true");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.dataset.contrast = String(contrast);
    window.localStorage.setItem("piyush-theme", theme);
    window.localStorage.setItem("piyush-contrast", String(contrast));
  }, [contrast, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      contrast,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
      toggleContrast: () => setContrast((current) => !current)
    }),
    [contrast, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
