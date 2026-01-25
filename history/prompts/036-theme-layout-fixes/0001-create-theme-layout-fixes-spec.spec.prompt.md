---
id: 0001
title: Create Theme Layout Fixes Spec
stage: spec
date: 2026-01-25
surface: agent
model: gemini-2.0-flash-exp
feature: 036-theme-layout-fixes
branch: 036-theme-layout-fixes
user: User
command: /sp.specify
labels: ["spec", "theme", "layout"]
links:
  spec: specs/036-theme-layout-fixes/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/036-theme-layout-fixes/spec.md
  - specs/036-theme-layout-fixes/checklists/requirements.md
tests:
  - null
---

## Prompt

Update `speckit.md` to define **Phase 5: Simplification & Layout Fixes**. **Context:** The user wants to abandon the complex multi-theme system in favor of a standard, reliable Light/Dark toggle in the header. Additionally, the Chat Widget is incorrectly nested inside the task area and needs to be moved to the bottom-left of the screen. **Requirement 1: Theme Simplification (`app/globals.css`)** * **Action:** 1. **DELETE** all custom `[data-theme="..."]` blocks (Hacker, Forest, Playful, Vibrant). 2. **Revert** to standard Shadcn CSS variables for `:root` (Light) and `.dark` (Dark). 3. **Verify** variables: `--background`, `--foreground`, `--primary`, etc., are correctly set for standard black/white contrast. **Requirement 2: Remove Custom Logic (`components/theme-provider.tsx` & `ThemePicker.tsx`)** * **Action:** 1. Revert `ThemeProvider` to use the standard `next-themes` logic without custom `useEffect` hooks for data attributes. 2. **Delete/Disable** the `ThemePicker` component (the card selection UI) since it's no longer needed. 3. **Ensure** the Header has the standard `ModeToggle` (Sun/Moon icon) for switching modes. **Requirement 3: Fix Chat Button Position (`app/dashboard/layout.tsx` or `page.tsx`)** * **Problem:** The chat button is currently rendered *inside* the main grid container, which clips it or positions it awkwardly. * **Fix:** Move the `<ChatWidget />` component out of the dashboard grid and into the root `DashboardLayout`. * **CSS:** Apply `fixed bottom-6 left-6 z-50` to the widget container. (User specifically requested **Bottom Left**). Update the specification to reflect this clean-up.

## Response snapshot

Created feature branch `036-theme-layout-fixes` and initial specification.
Generated spec file: `specs/036-theme-layout-fixes/spec.md`
Generated checklist: `specs/036-theme-layout-fixes/checklists/requirements.md`

## Outcome

- ✅ Impact: Defined requirements for theme simplification and layout fixes.
- 🧪 Tests: N/A
- 📁 Files: Created spec and checklist.
- 🔁 Next prompts: /sp.clarify
- 🧠 Reflection: User provided detailed requirements, enabling a complete spec without clarification cycles.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null