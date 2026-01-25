---
id: 001
title: Create Spec for Account Deletion Fix
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: fix-account-deletion
branch: 020-fix-account-deletion
user: zohair
command: /sp.specify
labels: ["bugfix", "database", "integrity", "auth"]
links:
  spec: specs/020-fix-account-deletion/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/020-fix-account-deletion/spec.md
 - specs/020-fix-account-deletion/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve an IntegrityError (ForeignKeyViolationError) when deleting an account. Context: sqlalchemy.exc.IntegrityError: update or delete on table 'user' violates foreign key constraint 'account_userId_fkey'. Cause: The Account table has records linked to the User, preventing User deletion. Required Change: Implement manual cascade delete for Account records in the delete_user_me endpoint. Implementation: 1. In backend/app/api/users.py, before deleting the User, fetch and delete all associated Account records. 2. Verify deletion order: Sessions -> Tasks -> Accounts -> User. Verification Criteria: User account deletion should succeed without foreign key violation errors.

## Response snapshot

Created feature branch `020-fix-account-deletion` and specification `specs/020-fix-account-deletion/spec.md`. The spec mandates adding a manual deletion step for `Account` records in `backend/app/api/users.py` to resolve the `ForeignKeyViolationError`. This ensures complete and safe user data cleanup. Validated with quality checklist.

## Outcome

- ✅ Impact: Defined fix for 500 error preventing account deletion.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: When DB cascade delete isn't configured, manual cleanup in the correct order is mandatory.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
