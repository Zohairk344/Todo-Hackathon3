---
id: "0001"
title: "create-theme-reconstruction-spec"
stage: "spec"
date: "2026-01-25"
surface: "agent"
model: "Gemini 2.0 Flash"
feature: "035-theme-reconstruction"
branch: "035-theme-reconstruction"
user: "zohair"
command: "/sp.specify Phase 5: Total Theme Reconstruction"
labels: ["theme", "css", "specification"]
links:
  spec: "specs/035-theme-reconstruction/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/035-theme-reconstruction/spec.md"
  - "specs/035-theme-reconstruction/checklists/requirements.md"
tests:
  - "N/A (Specification phase)"
---

## Prompt

Update `speckit.md` to define **Phase 5: Total Theme Reconstruction**. **Context:** The current theme implementation suffers from CSS specificity conflicts and "leaking" styles. We are abandoning the previous patch-work approach. **Instruction:** We will effectively "Rewrite" the theme engine from scratch. **Requirement 1: Clean Slate CSS (`app/globals.css`)** * **Action:** 1. Keep ONLY the standard Tailwind directives (`@tailwind base;` etc.) and the basic `layer base` setup for defaults. 2. **DELETE** all existing `.theme-hacker`, `.theme-forest`, `.theme-playful` class blocks. 3. **Implement New Architecture:** Use **Data Attributes** (`[data-theme="name"]`) placed at the **VERY BOTTOM** of the file to guarantee precedence. **Requirement 2: The Definitive Theme Palettes (CSS)** * Define these exact blocks at the bottom of `globals.css`: * **Pro (Default):** Defined in `:root` and `.dark`. Neutral Zinc/Slate colors. Radius: `0.5rem`. * **Hacker (Forced Dark):** * Selector: `[data-theme="hacker"]` * Variables: `--background: 0 0% 0%;` (True Black), `--primary: 142 70% 50%;` (Neon Green), `--radius: 0rem;` (Sharp). * **Forest (Forced Dark):** * Selector: `[data-theme="forest"]` * Variables: `--background: 150 30% 8%;` (Deep Green), `--primary: 142 70% 45%;` (Emerald), `--radius: 0.5rem;`. * **Playful (Adaptive):** * Selector: `[data-theme="playful"]` (Light Base): `--background: 262 20% 97%;` (Lavender), `--primary: 262 80% 60%;` (Purple), `--radius: 1.5rem;` (Round). * Selector: `[data-theme="playful"] .dark` (Dark Override): `--background: 262 20% 10%;` (Deep Purple). * **Vibrant (Adaptive):** * Selector: `[data-theme="vibrant"]` (Light Base): `--background: 0 0% 100%;` (White), `--primary: 330 80% 60%;` (Hot Pink), `--radius: 0.75rem;`. * Selector: `[data-theme="vibrant"] .dark` (Dark Override): `--background: 220 20% 10%;` (Navy Blue), `--primary: 190 90% 50%;` (Cyan). **Requirement 3: The "Brain" Logic (`components/theme-provider.tsx`)** * **Action:** Completely rewrite the `useEffect` hook handling theme changes. * **Logic:** 1. **Sanitize:** `root.removeAttribute("data-theme")`. 2. **Check Base Preference:** Is the system/user preferring Dark mode? 3. **Apply Logic:** * **If Hacker/Forest:** `setAttribute("data-theme", theme)` AND `classList.add("dark")`. (Always Dark). * **If Playful/Vibrant:** `setAttribute("data-theme", theme)`. Then, IF base preference is dark, `classList.add("dark")`, ELSE `classList.remove("dark")`. (Adaptive). * **If Pro/System:** Do NOT set attribute. Just toggle `.dark` class based on preference. **Requirement 4: The UI (`components/dashboard/ThemePicker.tsx`)** * **Action:** Update the options array to match these IDs exactly: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`. Update the specification to enforce this clean, conflict-free architecture.

## Response snapshot

Created the feature branch `035-theme-reconstruction`, defined the feature specification in `specs/035-theme-reconstruction/spec.md`, and completed the quality validation checklist.

## Outcome

- ✅ Impact: Established a solid architectural foundation for the theme engine rewrite.
- 🧪 Tests: Validated against specification quality criteria.
- 📁 Files: Created spec.md and requirements.md checklist.
- 🔁 Next prompts: /sp.plan to build the technical implementation strategy.
- 🧠 Reflection: The prompt was highly technical, requiring a balance between standard user-focused specification and capturing the mandatory architectural constraints.

## Evaluation notes (flywheel)

- Failure modes observed: Shell error when creating checklist (fixed by using write_file).
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null