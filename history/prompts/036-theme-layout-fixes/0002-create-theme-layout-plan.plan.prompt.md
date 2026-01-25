---
id: 0002
title: Create Theme Layout Plan
stage: plan
date: 2026-01-25
surface: agent
model: gemini-2.0-flash-exp
feature: 036-theme-layout-fixes
branch: 036-theme-layout-fixes
user: User
command: /sp.plan
labels: ["plan", "theme", "refactoring"]
links:
  spec: specs/036-theme-layout-fixes/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/036-theme-layout-fixes/plan.md
  - specs/036-theme-layout-fixes/research.md
  - specs/036-theme-layout-fixes/data-model.md
  - specs/036-theme-layout-fixes/quickstart.md
tests:
  - null
---

## Prompt

Generate the `speckit.plan` for **Phase 5: Simplification & Layout Fixes**.

## Response snapshot

Generated implementation plan and design artifacts for theme simplification and layout fixes.
- **Research**: Identified hardcoded positioning in ChatWidget and custom theme logic to remove.
- **Plan**: Defined steps to revert to standard next-themes and fix positioning.
- **Quickstart**: Detailed manual verification steps.

## Outcome

- ✅ Impact: Clear roadmap for frontend refactoring.
- 🧪 Tests: Defined manual verification protocols.
- 📁 Files: plan.md, research.md, quickstart.md, data-model.md
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Research phase clarified the CSS conflict causing the layout issue.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null