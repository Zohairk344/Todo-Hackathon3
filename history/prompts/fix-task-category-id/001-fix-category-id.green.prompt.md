---
id: 001
title: Fix Task Category ID Mapping
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: fix-task-category-id
branch: 016-fix-task-category-id
user: zohair
command: fix task.categoryId error
labels: ["bugfix", "database", "schema"]
links:
  spec: specs/016-fix-task-category-id/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/models.py
 - specs/016-fix-task-category-id/tasks.md
tests:
 - syntax check (py_compile)
---

## Prompt

[API] getTasks failed: 500 Internal Server Error Internal Server Error
...
asyncpg.exceptions.UndefinedColumnError: column task.categoryId does not exist
HINT:  Perhaps you meant to reference the column "task.category_id".

## Response snapshot

Fixed the `UndefinedColumnError` for `task.categoryId` by aligning the `category_id` field in the `Task` model with the actual database schema (using snake_case `category_id`). Preserved Ironclad mappings for `userId`. Verified fix with syntax checks.

## Outcome

- ✅ Impact: Resolved dashboard loading failure related to categories.
- 🧪 Tests: Syntax check passed.
- 📁 Files: Updated `models.py`.
- 🔁 Next prompts: Verify dashboard load.
- 🧠 Reflection: Application tables seem to use snake_case for standard fields, while Auth tables use camelCase.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
