---
id: 0003
title: reconstruct-theme-engine-plan
stage: plan
date: 2026-01-24
surface: agent
model: gemini-2.0-flash-exp
feature: 033-theme-reconstruction
branch: 033-theme-reconstruction
user: user
command: /sp.plan
labels: ["theme", "refactor", "plan"]
links:
  spec: specs/033-theme-reconstruction/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/033-theme-reconstruction/plan.md
  - specs/033-theme-reconstruction/research.md
  - specs/033-theme-reconstruction/data-model.md
  - specs/033-theme-reconstruction/quickstart.md
tests:
  - null
---

## Prompt

Generate the `speckit.plan` for **Phase 5: Total Theme Reconstruction**.

**Execution Strategy: "The Clean Slate Protocol"**

# 1. CSS Clean Sweep & Reconstruction (`app/globals.css`)
* **Goal:** Eliminate specificity conflicts by removing all old theme classes and replacing them with a strict `data-theme` architecture.
* **Step A: The Purge:**
    * **Action:** Delete ALL existing `.theme-hacker`, `.theme-forest`, `.theme-playful`, `.theme-vibrant` blocks.
    * **Keep:** Only standard Tailwind directives, base overrides (for defaults), and standard utilities.
* **Step B: The New Foundation (At the Bottom of File):**
    * **Action:** Implement the new styling blocks using `[data-theme="..."]` selectors.
    * **Definitions:**
        * **Hacker:** `[data-theme="hacker"]` -> Force Black BG, Neon Green, Radius 0.
        * **Forest:** `[data-theme="forest"]` -> Force Dark Green BG, Emerald, Radius 0.5rem.
        * **Playful:** `[data-theme="playful"]` (Light) & `[data-theme="playful"].dark` (Dark).
        * **Vibrant:** `[data-theme="vibrant"]` (Light) & `[data-theme="vibrant"].dark` (Dark).

# 2. Logic Engine Rewrite (`components/theme-provider.tsx`)
* **Goal:** Ensure the JavaScript logic correctly forces Dark Mode for specific themes and adapts for others.
* **Step A: The Logic Check:**
    * **Action:** Rewrite the `useEffect` hook.
    * **Flow:**
        1. **Reset:** `removeAttribute("data-theme")`.
        2. **Check Base:** Determine if the user/system wants Dark Mode (`isDarkPreferred`).
        3. **Apply:**
           * If `hacker`/`forest`: `setAttribute` AND `add("dark")`. (Forced).
           * If `playful`/`vibrant`: `setAttribute`. IF `isDarkPreferred`, `add("dark")`, ELSE `remove("dark")`. (Adaptive).
           * If `pro`/`system`: Do NOT set attribute. Toggle `dark` class purely on `isDarkPreferred`.

# 3. UI Alignment (`components/dashboard/ThemePicker.tsx`)
* **Goal:** Ensure the picker sends the exact IDs expected by the CSS.
* **Action:** Verify/Update the themes array: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`.

Generate the plan.

## Response snapshot

Generated Implementation Plan for Phase 5: Total Theme Reconstruction. Created plan.md, research.md, data-model.md, and quickstart.md. The plan follows the "Clean Slate Protocol" to replace class-based themes with data attributes and rewrite the logic engine.

## Outcome

- ✅ Impact: Defined execution strategy for technical refactor.
- 🧪 Tests: N/A
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Clear and precise plan derived from specific user instructions.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None