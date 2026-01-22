"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeStyle = "pro" | "playful" | "hacker";

interface ThemeStyleContextType {
  style: ThemeStyle;
  setStyle: (style: ThemeStyle) => void;
}

const ThemeStyleContext = createContext<ThemeStyleContextType | undefined>(undefined);

export function ThemeStyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState<ThemeStyle>("pro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedStyle = localStorage.getItem("theme-style") as ThemeStyle;
    if (savedStyle) {
      setStyle(savedStyle);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-style", style);
    localStorage.setItem("theme-style", style);
  }, [style, mounted]);

  return (
    <ThemeStyleContext.Provider value={{ style, setStyle }}>
      {children}
    </ThemeStyleContext.Provider>
  );
}

export function useThemeStyle() {
  const context = useContext(ThemeStyleContext);
  if (!context) {
    throw new Error("useThemeStyle must be used within a ThemeStyleProvider");
  }
  return context;
}