---
id: 001
title: Create Spec for Cascade Delete Fix
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: fix-cascade-delete
branch: 021-fix-cascade-delete
user: zohair
command: /sp.specify
labels: ["bugfix", "database", "integrity", "cascade"]
links:
  spec: specs/021-fix-cascade-delete/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/021-fix-cascade-delete/spec.md
 - specs/021-fix-cascade-delete/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve a ForeignKeyViolationError when deleting a user account. Context: The backend crashes with sqlalchemy.exc.IntegrityError during DELETE /api/users/me because the user is referenced in the account table. Required Change: Implement Database-Level Cascading Deletes. 1. Refactor backend/app/models.py: Audit all Relationship definitions in the User model. Ensure sa_relationship_kwargs={'cascade': 'all, delete'} is present. Critical Action: Ensure every ForeignKey column in child models (Session, Task, Account) explicitly includes ondelete='CASCADE'. 2. Refactor backend/app/api/users.py: Verify delete_user_me logic. Verification Criteria: User account deletion should succeed without 500 error.

## Response snapshot

Created feature branch `021-fix-cascade-delete` and specification `specs/021-fix-cascade-delete/spec.md`. The spec mandates implementing database-level cascading deletes by adding `ondelete="CASCADE"` to all child model ForeignKeys (`Account`, `Session`, `Task`, `Category`) and updating `User` relationships. This replaces the brittle manual deletion logic and resolves the `IntegrityError`.

## Outcome

- ✅ Impact: Defined robust fix for account deletion crash.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: Database-level cascades are safer and more performant than application-level cleanup loops.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
