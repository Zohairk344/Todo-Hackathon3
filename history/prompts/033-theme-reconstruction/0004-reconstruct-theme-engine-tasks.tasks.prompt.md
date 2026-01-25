---
id: 0004
title: reconstruct-theme-engine-tasks
stage: tasks
date: 2026-01-24
surface: agent
model: gemini-2.0-flash-exp
feature: 033-theme-reconstruction
branch: 033-theme-reconstruction
user: user
command: /sp.tasks
labels: ["theme", "refactor", "tasks"]
links:
  spec: specs/033-theme-reconstruction/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/033-theme-reconstruction/tasks.md
tests:
  - null
---

## Prompt

Generate actionable tasks for **Phase 5: Total Theme Reconstruction**.

Context for task generation: Break down **Phase 5: Total Theme Reconstruction** into atomic, robust coding tasks. # Group 1: The CSS Re-Architecture * **T-9501: Clean Slate & Data Attribute Implementation** * **Objective:** Remove all conflicting class-based themes and install the strict Data Attribute engine. * **File:** `app/globals.css` * **Action 1 (The Purge):** DELETE all existing blocks for `.theme-hacker`, `.theme-forest`, `.theme-playful`, and `.theme-vibrant`. * **Action 2 (The New Engine):** Append the following blocks to the **VERY BOTTOM** of the file: * **Hacker (Forced Dark):** `[data-theme="hacker"]` -> `--background: 0 0% 0%;`, `--primary: 142 70% 50%;`, `--radius: 0rem;`, `--card: 0 0% 5%;`. * **Forest (Forced Dark):** `[data-theme="forest"]` -> `--background: 150 30% 8%;`, `--primary: 142 70% 45%;`, `--radius: 0.5rem;`. * **Playful (Light Base):** `[data-theme="playful"]` -> `--background: 262 20% 97%;`, `--primary: 262 80% 60%;`, `--radius: 1.5rem;`. * **Playful (Dark Override):** `[data-theme="playful"] .dark` -> `--background: 262 20% 10%;`, `--card: 262 20% 13%;`. * **Vibrant (Light Base):** `[data-theme="vibrant"]` -> `--background: 0 0% 100%;`, `--primary: 330 80% 60%;` (Hot Pink), `--radius: 0.75rem;`. * **Vibrant (Dark Override):** `[data-theme="vibrant"] .dark` -> `--background: 220 20% 10%;` (Navy), `--primary: 190 90% 50%;` (Cyan). # Group 2: The Logic Core * **T-9502: Rewrite Theme Provider Logic** * **Objective:** Implement the "Smart Switch" that forces Dark Mode when necessary. * **File:** `components/theme-provider.tsx` (or `ThemeContext.tsx`). * **Action:** Replace the `useEffect` logic for `[theme]`: 1. **Reset:** `root.removeAttribute("data-theme")`. 2. **Determine Preference:** `const isDarkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;` (Or use `localStorage` if you have a separate toggle). 3. **Logic Flow:** * **Case A (Hacker/Forest):** `setAttribute("data-theme", theme)` AND `classList.add("dark")`. * **Case B (Playful/Vibrant):** `setAttribute("data-theme", theme)`. IF `isDarkPreferred` -> `add("dark")`, ELSE -> `remove("dark")`. * **Case C (Pro/System):** Do NOT set attribute. Toggle `.dark` purely based on `isDarkPreferred` (or if theme explicitly == 'dark'). # Group 3: The UI Connection * **T-9503: Align Theme Picker IDs** * **Objective:** Ensure the frontend sends the correct IDs to the new logic. * **File:** `components/dashboard/ThemePicker.tsx`. * **Action:** Update the `themes` array to strictly use: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`.

## Response snapshot

Generated actionable tasks for Phase 5 Theme Reconstruction.
- Total tasks: 11
- Organized into 4 phases (CSS, Logic, UI, Polish)
- Strict dependency order enforced.

## Outcome

- ✅ Impact: Broken down refactor into 11 atomic tasks.
- 🧪 Tests: Independent tests defined for each phase.
- 📁 Files: tasks.md
- 🔁 Next prompts: /sp.analyze
- 🧠 Reflection: Tasks map 1:1 to the user's detailed groups and the implementation plan.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None