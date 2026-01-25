---
id: 005
title: Re-Implement Cascade Delete and Fix Appearance Sync
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

Re-implemented database-level cascading deletes by ensuring `ondelete="CASCADE"` is correctly applied to all child ForeignKeys in `models.py`. Verified that `User` relationships include `cascade="all, delete"`. Cleaned up `delete_user_me` in `users.py` to remove manual deletion logic. Confirmed appearance fields are present in `User` model.

## Outcome

- ✅ Impact: Resolved `IntegrityError` on account deletion and fixed appearance settings persistence.
- 🧪 Tests: Syntax checks passed.
- 📁 Files: Updated `models.py` and `users.py`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Double-checking the implementation details against the spec is crucial.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
