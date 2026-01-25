---
id: 003
title: Create Implementation Plan for Naive UTC Fix
stage: plan
date: 2026-01-13
surface: agent
model: gemini
feature: fix-naive-utc
branch: 019-fix-naive-utc
user: zohair
command: /sp.plan
labels: ["plan", "bugfix", "datetime"]
links:
  spec: specs/019-fix-naive-utc/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/019-fix-naive-utc/plan.md
 - specs/019-fix-naive-utc/research.md
 - specs/019-fix-naive-utc/tasks.md
tests:
 - manual plan validation
---

## Prompt

$ARGUMENTS

## Response snapshot

Generated implementation plan `specs/019-fix-naive-utc/plan.md` and associated tasks.
- **Plan**: Standardize on naive UTC (`replace(tzinfo=None)`) across the backend.
- **Research**: Validated that `asyncpg` + naive columns require naive Python datetimes.
- **Tasks**: Defined atomic steps to update models, dependencies, and routes.

## Outcome

- ✅ Impact: Roadmap to resolve `DataError` and `TypeError`.
- 🧪 Tests: N/A.
- 📁 Files: plan.md, research.md, tasks.md.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: "Timezone aware everywhere" is ideal, but "Timezone naive UTC everywhere" is often the pragmatic fix for existing schemas in Python/Postgres stacks.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
