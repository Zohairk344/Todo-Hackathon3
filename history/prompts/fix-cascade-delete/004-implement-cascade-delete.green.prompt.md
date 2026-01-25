---
id: 004
title: Implement Cascade Delete and Fix Appearance Sync
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: fix-cascade-delete
branch: 021-fix-cascade-delete
user: zohair
command: /sp.implement
labels: ["implementation", "bugfix", "database", "integrity"]
links:
  spec: specs/021-fix-cascade-delete/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/models.py
 - todo-hackathon3/app/api/users.py
tests:
 - syntax check (py_compile)
---

## Prompt

$ARGUMENTS

## Response snapshot

Implemented database-level cascading deletes by adding `ondelete="CASCADE"` to all child ForeignKeys (`Session`, `Account`, `Task`, `Category`) and updating `User` relationships. Refactored `delete_user_me` to remove manual deletion logic. Also fixed the appearance sync issue by adding `theme` and `font_size` fields to the `User` model and updating `update_user_me` to handle them. Verified syntax.

## Outcome

- ✅ Impact: Resolved `IntegrityError` on account deletion and fixed appearance settings persistence.
- 🧪 Tests: Syntax checks passed.
- 📁 Files: Updated `models.py` and `users.py`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Database-level constraints provide a much more robust solution for data integrity than application-level logic.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
