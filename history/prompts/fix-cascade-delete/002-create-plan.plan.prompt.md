---
id: 002
title: Create Implementation Plan for Cascade Delete Fix
stage: plan
date: 2026-01-13
surface: agent
model: gemini
feature: fix-cascade-delete
branch: 021-fix-cascade-delete
user: zohair
command: /sp.plan
labels: ["plan", "bugfix", "database"]
links:
  spec: specs/021-fix-cascade-delete/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/021-fix-cascade-delete/plan.md
 - specs/021-fix-cascade-delete/research.md
 - specs/021-fix-cascade-delete/tasks.md
tests:
 - manual plan validation
---

## Prompt

$ARGUMENTS

## Response snapshot

Generated implementation plan `specs/021-fix-cascade-delete/plan.md` and associated tasks.
- **Plan**: Implement database-level cascading deletes (`ondelete="CASCADE"`) and simplify API logic.
- **Research**: Confirmed this is the standard way to handle referential integrity cleanup in SQL/ORM.
- **Tasks**: Defined atomic steps to update models and refactor the delete endpoint. Also included a task to fix the "appearance not saving" issue by auditing the update route.

## Outcome

- ✅ Impact: Roadmap to resolve `IntegrityError` and simplify code.
- 🧪 Tests: N/A.
- 📁 Files: plan.md, research.md, tasks.md.
- 🔁 Next prompts: /sp.tasks (already generated), then /sp.implement.
- 🧠 Reflection: Database constraints are powerful; leaning on them reduces application code complexity.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
