"use client";

import { THEME_STORAGE_KEY } from "@/constants";
import { ThemeName } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ThemeContextType {
  mode: ThemeName;
  setMode: Dispatch<SetStateAction<ThemeName>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeName>("system");

  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    setMode(currentTheme);
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (
      currentTheme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
