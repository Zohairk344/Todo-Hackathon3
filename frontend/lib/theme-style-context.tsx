"use client";

import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeStyleProvider({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) {
  useEffect(() => {
    // Legacy cleanup: Reset invalid themes to system
    const savedTheme = localStorage.getItem("theme");
    const legacyThemes = ["hacker", "forest", "playful", "vibrant", "pro"];
    if (savedTheme && legacyThemes.includes(savedTheme)) {
      localStorage.removeItem("theme"); // Let next-themes handle default (system)
    }
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="todo-app-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Compatibility hook - prefer useTheme() from next-themes directly in new code
export function useThemeStyle() {
  const { theme, setTheme } = useTheme();
  return {
    mode: theme,
    setMode: (m: string) => setTheme(m),
    theme: theme,
    setTheme: (t: string) => setTheme(t),
    isModeForced: false
  };
}

export type Mode = string;
export type Theme = string;