---
id: 001
title: Create Spec for Naive UTC Fix
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: fix-naive-utc
branch: 019-fix-naive-utc
user: zohair
command: /sp.specify
labels: ["bugfix", "datetime", "database", "backend"]
links:
  spec: specs/019-fix-naive-utc/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/019-fix-naive-utc/spec.md
 - specs/019-fix-naive-utc/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve a DataError when updating tasks. Context: asyncpg.exceptions.DataError: invalid input for query argument $2. Offset-naive vs offset-aware timestamp mismatch. Refactor backend/app/models.py: Update all DateTime fields to use datetime.utcnow or a naive UTC factory. Remove timezone-aware defaults. Refactor backend/app/api/routes/tasks.py: Ensure task.updated_at is set to a naive UTC datetime. Refactor backend/app/api/deps.py: Use naive UTC for session expiration checks.

## Response snapshot

Created feature branch `019-fix-naive-utc` and specification `specs/019-fix-naive-utc/spec.md`. The spec mandates enforcing naive UTC timestamps across `models.py`, `tasks.py`, and `deps.py` to resolve `DataError` crashes caused by mixing offset-naive (DB) and offset-aware (Python) datetimes. Validated with quality checklist.

## Outcome

- ✅ Impact: Defined fix for high-priority 500 error.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: Database drivers like `asyncpg` are strict about timestamp formats; consistency (naive vs aware) is key.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
