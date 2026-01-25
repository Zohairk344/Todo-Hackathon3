---
id: 0003
title: Plan Theme Repair
stage: plan
date: 2026-01-23
surface: agent
model: gemini-2.0-flash-exp
feature: 030-fix-theme-add-forest
branch: 030-fix-theme-add-forest
user: User
command: /sp.plan
labels: ["plan", "theme", "css", "refactor"]
links:
  spec: specs/030-fix-theme-add-forest/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/030-fix-theme-add-forest/plan.md
 - specs/030-fix-theme-add-forest/research.md
 - specs/030-fix-theme-add-forest/data-model.md
tests:
 null
---

## Prompt

$ARGUMENTS

## Response snapshot

Created implementation plan for Theme Repair & Expansion.
- Strategy: Migrate from `data-style` attributes to class-based theming (`.theme-forest`).
- Context: Identified `next-themes` usage but custom provider logic that needs refactoring.
- Artifacts: research.md, data-model.md (ThemeStyle Enum), plan.md.

## Outcome

- ✅ Impact: Clear roadmap for CSS refactor and new theme addition.
- 🧪 Tests: Manual verification protocol defined (Visual UI checks).
- 📁 Files: Plan, Research, Data Model created.
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: The mismatch between user request (classes) and existing code (attributes) was the key architectural decision to resolve.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None