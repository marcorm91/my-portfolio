"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { setTheme } from "@/utils/helpers/helpers";

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(prefersDark);
    setTheme(prefersDark ? "dark" : "light");

    setIsThemeLoaded(true);
  }, []);

  const toggleTheme = (dark: boolean) => {
    setIsDarkMode(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    setTheme(dark ? "dark" : "light");
  };

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};
