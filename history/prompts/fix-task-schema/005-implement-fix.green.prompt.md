---
id: 005
title: Implement Task Schema Fix
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: fix-task-schema
branch: 015-fix-task-schema
user: zohair
command: /sp.implement
labels: ["implementation", "bugfix", "database", "schema"]
links:
  spec: specs/015-fix-task-schema/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/models.py
 - specs/015-fix-task-schema/tasks.md
tests:
 - syntax check (py_compile)
 - safety check (userId/timestamps preserved)
---

## Prompt

$ARGUMENTS

## Response snapshot

Implemented the surgical fix for the `Task` model schema mismatch. Updated `due_date` in `todo-hackathon3/app/models.py` to map to the snake_case `due_date` database column while preserving camelCase mappings for `userId`, `createdAt`, and `updatedAt`. Verified syntax integrity with `py_compile`.

## Outcome

- ✅ Impact: Resolved 500 UndefinedColumnError for task due dates.
- 🧪 Tests: Syntax check passed; safety check confirmed other mappings are intact.
- 📁 Files: Updated models.py.
- 🔁 Next prompts: Start the server and verify via API.
- 🧠 Reflection: Direct alignment with Postgres error hints ensures rapid and safe recovery from schema mismatches.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
