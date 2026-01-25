---
id: 001
title: Create Spec for DateTime Offset Fix
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: fix-datetime-offset
branch: 018-fix-datetime-offset
user: zohair
command: /sp.specify
labels: ["bugfix", "database", "datetime", "timezone"]
links:
  spec: specs/018-fix-datetime-offset/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/018-fix-datetime-offset/spec.md
 - specs/018-fix-datetime-offset/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

Update speckit.md to resolve a DateTime Offset Error in the Task model. Context: TypeError: can't subtract offset-naive and offset-aware datetimes. This occurs when updating tasks because the database expects offset-naive timestamps (TIMESTAMP WITHOUT TIME ZONE), but the application is sending offset-aware datetimes (datetime.datetime(..., tzinfo=datetime.timezone.utc)). Required Change: Ensure all datetime fields in backend/app/models.py use sa_column=Column(..., DateTime(timezone=True), ...) to explicitly support timezones, OR convert to naive UTC before saving. Given the modern stack, switching to timezone-aware columns is preferred. Implementation: Update created_at, updated_at, and due_date in Task model (and potentially others) to use DateTime(timezone=True). Verification Criteria: Task updates should succeed without offset errors.

## Response snapshot

Created feature branch `018-fix-datetime-offset` and specification `specs/018-fix-datetime-offset/spec.md`. The spec mandates updating all datetime fields in `models.py` to use `DateTime(timezone=True)` to align Python's offset-aware datetimes with the database schema, resolving the `TypeError`. Validated with quality checklist.

## Outcome

- ✅ Impact: Defined fix for timezone offset mismatch 500 error.
- 🧪 Tests: Checklist passed.
- 📁 Files: `spec.md`, `requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design implementation.
- 🧠 Reflection: Explicit timezone handling in the ORM layer is crucial when using modern Python datetime objects with Postgres.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
