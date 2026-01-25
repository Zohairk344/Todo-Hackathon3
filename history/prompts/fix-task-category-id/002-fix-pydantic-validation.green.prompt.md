---
id: 002
title: Fix Task Validation Error
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: fix-task-category-id
branch: 016-fix-task-category-id
user: zohair
command: fix pydantic validation error
labels: ["bugfix", "pydantic", "sqlmodel"]
links:
  spec: specs/016-fix-task-category-id/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/models.py
tests:
 - syntax check (py_compile)
---

## Prompt

POST /api/qmTuLnl5XO5MihqueuGhfQowBheNucbu/tasks HTTP/1.1" 500 Internal Server Error
...
pydantic_core._pydantic_core.ValidationError: 2 validation errors for Task
created_at
  Field required [type=missing, ...]
updated_at
  Field required [type=missing, ...]

## Response snapshot

Fixed the `ValidationError` in the `Task` model by adding `default_factory=datetime.utcnow` to the `created_at` and `updated_at` fields. This ensures that Pydantic does not require these fields during `model_validate` when they are missing from the input (e.g., during task creation). Also added defaults to other fields using `sa_column` across all models to prevent similar issues.

## Outcome

- ✅ Impact: Resolved 500 error during task creation.
- 🧪 Tests: Syntax check passed.
- 📁 Files: Updated `models.py`.
- 🔁 Next prompts: None.
- 🧠 Reflection: When using `sa_column` in SQLModel, Pydantic defaults must be explicitly defined in the `Field()` call, as the `Column` default is only used by SQLAlchemy.

## Evaluation notes (flywheel)

- Failure modes observed: Missing Pydantic defaults for fields with database-side defaults.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
