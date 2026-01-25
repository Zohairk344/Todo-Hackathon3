---
id: "0001"
title: "Create spec for theme simplification and layout fix"
stage: "spec"
date: "2026-01-24"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "034-theme-layout-simplification"
branch: "034-theme-layout-simplification"
user: "zohair"
command: "/sp.specify"
labels: ["theme", "simplification", "layout", "chat-widget"]
links:
  spec: "specs/034-theme-layout-simplification/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/034-theme-layout-simplification/spec.md"
  - "specs/034-theme-layout-simplification/checklists/requirements.md"
tests:
  - "null"
---

# Prompt History Record (PHR)

## Prompt Text

Update `speckit.md` to define **Phase 5: Simplification & Layout Fixes**. **Context:** The user wants to abandon the complex multi-theme system in favor of a standard, reliable Light/Dark toggle in the header. Additionally, the Chat Widget is incorrectly nested inside the task area and needs to be moved to the bottom-left of the screen. **Requirement 1: Theme Simplification (`app/globals.css`)** * **Action:** 1. **DELETE** all custom `[data-theme="..."]` blocks (Hacker, Forest, Playful, Vibrant). 2. **Revert** to standard Shadcn CSS variables for `:root` (Light) and `.dark` (Dark). 3. **Verify** variables: `--background`, `--foreground`, `--primary`, etc., are correctly set for standard black/white contrast. **Requirement 2: Remove Custom Logic (`components/theme-provider.tsx` & `ThemePicker.tsx`)** * **Action:** 1. Revert `ThemeProvider` to use the standard `next-themes` logic without custom `useEffect` hooks for data attributes. 2. **Delete/Disable** the `ThemePicker` component (the card selection UI) since it's no longer needed. 3. **Ensure** the Header has the standard `ModeToggle` (Sun/Moon icon) for switching modes. **Requirement 3: Fix Chat Button Position (`app/dashboard/layout.tsx` or `page.tsx`)** * **Problem:** The chat button is currently rendered *inside* the main grid container, which clips it or positions it awkwardly. * **Fix:** Move the `<ChatWidget />` component out of the dashboard grid and into the root `DashboardLayout`. * **CSS:** Apply `fixed bottom-6 left-6 z-50` to the widget container. (User specifically requested **Bottom Left**). Update the specification to reflect this clean-up.

## Response Text

I have created the feature specification for "Theme Simplification & Layout Fixes".
- **Branch**: `034-theme-layout-simplification`
- **Spec File**: `specs/034-theme-layout-simplification/spec.md`
- **Checklist**: `specs/034-theme-layout-simplification/checklists/requirements.md`

The specification defines the removal of custom themes, reverting to standard Shadcn Light/Dark variables, and repositioning the Chat Widget to the bottom-left of the Dashboard Layout.

## Outcome/Evaluation

The specification is complete and validated against the quality checklist. No clarifications are needed as the user requirements were explicit. The project is ready for the planning phase (`/sp.plan`).