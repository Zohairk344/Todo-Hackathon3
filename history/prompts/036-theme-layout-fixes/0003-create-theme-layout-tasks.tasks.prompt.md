---
id: 0003
title: Create Theme Layout Tasks
stage: tasks
date: 2026-01-25
surface: agent
model: gemini-2.0-flash-exp
feature: 036-theme-layout-fixes
branch: 036-theme-layout-fixes
user: User
command: /sp.tasks
labels: ["tasks", "theme", "layout"]
links:
  spec: specs/036-theme-layout-fixes/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/036-theme-layout-fixes/tasks.md
tests:
  - null
---

## Prompt

Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.

## Response snapshot

Generated atomic tasks for CSS cleanup, theme logic simplification, and chat widget repositioning.
- **Phase 1**: CSS globals cleanup.
- **Phase 2**: Reverting ThemeProvider and removing ThemePicker.
- **Phase 3**: Fixing ChatWidget positioning logic.

## Outcome

- ✅ Impact: Broken down refactoring into safe, reversible steps.
- 🧪 Tests: Included verification steps for themes and layout.
- 📁 Files: tasks.md
- 🔁 Next prompts: /sp.analyze
- 🧠 Reflection: Tasks are grouped logically to minimize breakage during refactor.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null