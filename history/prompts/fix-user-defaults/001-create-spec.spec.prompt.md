---
id: 001
title: Create Spec for User Defaults Fix
stage: spec
date: 2026-01-17
surface: agent
model: gemini
feature: fix-user-defaults
branch: 022-fix-user-defaults
user: zohair
command: /sp.specify
labels: ["bugfix", "database", "auth", "schema"]
links:
  spec: specs/022-fix-user-defaults/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/022-fix-user-defaults/spec.md
 - specs/022-fix-user-defaults/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve a Critical Validation Error in the User model during sign-up. Context: Better-Auth is failing to create users because the 'theme' and 'font_size' columns in the database have a NOT NULL constraint, but the sign-up payload from Better-Auth does not include these fields. The Python model defaults are not being applied at the DB level during the INSERT operation performed by Better-Auth. Required Change: Update the User model in backend/app/models.py to make 'theme' and 'font_size' optional in the database by setting nullable=True in the sa_column definition. Implementation: theme: Optional[str] = Field(default='system', sa_column=Column('theme', Text, nullable=True)), font_size: Optional[str] = Field(default='medium', sa_column=Column('fontSize', Text, nullable=True)). Verification Criteria: Sign-up should succeed without 422/500 error.

## Response snapshot

Created feature branch `022-fix-user-defaults` and specification `specs/022-fix-user-defaults/spec.md`. The spec mandates updating the `User` model to allow `NULL` values for `theme` and `font_size` in the database, resolving the `not-null constraint` violation during Better-Auth sign-up. Validated with quality checklist.

## Outcome

- ✅ Impact: Defined fix for sign-up blocker.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: Third-party auth libraries often insert records directly, bypassing ORM defaults unless those defaults are defined at the database level (or columns are nullable).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
