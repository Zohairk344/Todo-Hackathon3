---
id: "0001"
title: "create-theme-reset-spec"
stage: "spec"
date: "2026-01-25"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "037-theme-reset"
branch: "037-theme-reset"
user: "zohair"
command: "/sp.specify Update speckit.md to define Phase 6: Total Theme Reset (Light/Dark Only)..."
labels: ["theme", "reset", "specification"]
links:
  spec: "specs/037-theme-reset/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "specs/037-theme-reset/spec.md"
  - "specs/037-theme-reset/checklists/requirements.md"
tests:
  - "Manual validation against spec quality checklist"
---

# Prompt History Record (PHR): create-theme-reset-spec

## Prompt Text

Update `speckit.md` to define **Phase 6: Total Theme Reset (Light/Dark Only)**. **Context:** The current theme implementation is broken, missing dependencies, and causing build errors. The user wants to abandon all custom themes and revert to a standard, bulletproof Light/Dark toggle. **Requirement 1: Dependencies Check** * **Action:** Ensure the following packages are installed (and install them if missing): `tailwindcss-animate`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`. **Requirement 2: Global CSS Reset (`app/globals.css`)** * **Action:** **DELETE** the entire file content. * **Replace With:** The standard Shadcn UI CSS template. * **Directives:** `@tailwind base; @tailwind components; @tailwind utilities;` * **Layer Base:** Define `:root` (Light Mode variables) and `.dark` (Dark Mode variables). * **Variables:** Use standard Zinc/Slate values (e.g., `--background: 0 0% 100%` vs `224 71% 4%`). * **Layer Utilities:** `body { @apply bg-background text-foreground; }`. **Requirement 3: Tailwind Config Reset (`tailwind.config.ts`)** * **Action:** **DELETE** the entire file content. * **Replace With:** A clean configuration that: * Enables `darkMode: ["class"]`. * Maps the `colors` theme to the CSS variables (e.g., `border: "hsl(var(--border))"`). * Includes the `tailwindcss-animate` plugin. **Requirement 4: Logic Reset (`components/theme-provider.tsx`)** * **Action:** Replace with a clean, standard wrapper: ```typescript "use client" import * as React from "react" import { ThemeProvider as NextThemesProvider } from "next-themes" import { type ThemeProviderProps } from "next-themes/dist/types" export function ThemeProvider({ children, ...props }: ThemeProviderProps) { return <NextThemesProvider {...props}>{children}</NextThemesProvider> } ``` **Requirement 5: UI Cleanup (`components/dashboard/Header.tsx` & `Settings`)** * **Action:** * In `Header.tsx`, ensure the `<ModeToggle />` (Sun/Moon icon) is the **only** theme control. * **DELETE** `components/dashboard/ThemePicker.tsx` entirely (delete the file). * Remove any reference to `<ThemePicker />` in `app/dashboard/settings/page.tsx`. Update the specification to strictly enforce this standard setup.

## Assistant Response

I have created the specification for "Phase 6: Total Theme Reset (Light/Dark Only)".
- **Branch**: `037-theme-reset`
- **Spec File**: `specs/037-theme-reset/spec.md`
- **Checklist**: `specs/037-theme-reset/checklists/requirements.md`

The specification captures the user's intent to revert to a standard Light/Dark mode system, removing all custom theme complexities that were causing issues. It defines clear user scenarios for toggling and persistence, and functional requirements to ensure a bulletproof implementation.

## Outcome/Evaluation

- [x] Spec file created correctly
- [x] Quality checklist created and validated
- [x] Branch created and checked out
- [x] All requirements from prompt captured in spec (translated to WHAT/WHY)