---
id: 0001
title: fix theme logic spec
stage: spec
date: 2026-01-24
surface: agent
model: gemini-2.0-flash-exp
feature: 032-fix-theme-logic
branch: 032-fix-theme-logic
user: User
command: /sp.specify
labels: ["spec", "theme", "css", "fix"]
links:
  spec: specs/032-fix-theme-logic/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/032-fix-theme-logic/spec.md
  - specs/032-fix-theme-logic/checklists/requirements.md
tests:
  - null
---

## Prompt

Update `speckit.md` to define **Phase 4.5: The Definitive Theme Fix**. **Context:** All custom themes fail to apply and revert to the default "Pro" look. This is a CSS specificity issue. Additionally, "Vibrant" needs to adapt to Light/Dark mode, whereas "Hacker" and "Forest" should force Dark mode. **Requirement 1: Global CSS Restructure (`app/globals.css`)** * **Strategy:** Use `data-theme` attributes for higher reliability than classes. * **Action:** Rewrite the file structure: 1. **Keep:** Standard `:root` and `.dark` (Base Shadcn). 2. **Append (At the VERY BOTTOM):** * `[data-theme="hacker"]` (Force Dark/Green variables). * `[data-theme="forest"]` (Force Dark/Emerald variables). * `[data-theme="playful"]` (Light Mode: Purple/White) & `[data-theme="playful"].dark` (Dark Mode: Purple/Black). * `[data-theme="vibrant"]` (Light Mode: Cyan/White) & `[data-theme="vibrant"].dark` (Dark Mode: Cyan/Deep Blue). * **Variable Fix:** Ensure ALL variables (background, foreground, card, primary, radius) are explicitly redefined in each block. **Requirement 2: Theme Provider Logic (`components/theme-provider.tsx`)** * **Action:** Update the `useEffect` logic. * **Logic:** 1. `const root = window.document.documentElement;` 2. `root.setAttribute("data-theme", theme);` (This triggers the CSS selectors above). 3. **The "Vibrant/Playful" Adaptive Check:** * If `theme` is "vibrant" or "playful": Use the user's *previous* mode preference (recover `savedMode` from localStorage, defaulting to system). Toggle the `.dark` class accordingly. * If `theme` is "hacker" or "forest": **Force** the `.dark` class (add it). * If `theme` is "pro" or "system": Remove `data-theme` attribute and rely on standard `.dark` toggling. **Requirement 3: Vibrant Theme Definition** * **Light:** `--background: 0 0% 100%`, `--primary: 320 90% 60%` (Hot Pink). * **Dark:** `--background: 240 20% 10%`, `--primary: 190 90% 50%` (Cyan). * **Radius:** `0.75rem`. Update the specification to use `data-theme` selectors and adaptive logic.

## Response snapshot

Created feature branch `032-fix-theme-logic` and generated specification file `specs/032-fix-theme-logic/spec.md`. The spec incorporates user-defined technical requirements for Global CSS restructuring using `data-theme` attributes and adaptive Theme Provider logic. A quality checklist was created at `specs/032-fix-theme-logic/checklists/requirements.md` and validated (all passed, with notes on technical constraints).

## Outcome

- ✅ Impact: Defined technical path for resolving theme specificity issues and enabling adaptive themes.
- 🧪 Tests: Defined acceptance scenarios for theme switching, forced dark mode, and adaptive mode restoration.
- 📁 Files: Created spec.md and requirements.md checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: User provided a technical spec in the guise of a feature request. Adapted the Spec template to accommodate specific implementation requirements while maintaining the structure of Scenarios -> Requirements -> Success Criteria.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null