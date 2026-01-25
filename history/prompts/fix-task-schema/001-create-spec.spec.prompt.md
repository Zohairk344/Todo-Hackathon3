---
id: 001
title: Create Spec for Task Schema Fix
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: fix-task-schema
branch: 015-fix-task-schema
user: zohair
command: /sp.specify
labels: ["bugfix", "database", "schema", "task"]
links:
  spec: specs/015-fix-task-schema/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/015-fix-task-schema/spec.md
 - specs/015-fix-task-schema/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve a Critical Schema Mismatch in the Task model that is causing 500 Errors. Context: column task.dueDate does not exist. Change due_date mapping to use snake_case for the database column. Implementation: due_date: Optional[datetime] = Field(default=None, sa_column=Column('due_date', DateTime, nullable=True))

## Response snapshot

Created feature branch `015-fix-task-schema` and specification `specs/015-fix-task-schema/spec.md` to resolve the `UndefinedColumnError`. The spec mandates changing the database mapping for `due_date` from camelCase (`dueDate`) to snake_case (`due_date`) while preserving other Ironclad mappings. Validated with quality checklist.

## Outcome

- ✅ Impact: Defined fix for high-priority 500 error.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: Bug fixes sometimes require breaking the "no implementation details" rule in specs to ensure exact column alignment.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
