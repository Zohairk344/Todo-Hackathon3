---
id: 004
title: Generate Tasks for Naive UTC Fix
stage: tasks
date: 2026-01-13
surface: agent
model: gemini
feature: fix-naive-utc
branch: 019-fix-naive-utc
user: zohair
command: /sp.tasks
labels: ["tasks", "bugfix", "datetime"]
links:
  spec: specs/019-fix-naive-utc/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/019-fix-naive-utc/tasks.md
tests:
 - manual task validation
---

## Prompt

Break down Feature: Standardize Naive UTC Timestamps into atomic, unambiguous coding tasks across the backend. # Group 1: Dependency Validation (backend/app/api/deps.py) * T-6001: Fix Session Expiry Logic * Objective: Prevent TypeError when comparing session expiration. * Action: In get_current_user, change the now variable definition. * Logic: Use now = datetime.now(timezone.utc).replace(tzinfo=None). * Requirement: Ensure db_session.expires_at (which comes from the DB as naive) is compared against this new naive now object. # Group 2: Model Synchronization (backend/app/models.py) * T-6002: Audit and Standardize Model Defaults * Objective: Ensure all auto-generated timestamps are naive. * Action: Update all Field definitions for created_at, updated_at, and expires_at in all models (User, Session, Task, etc.). * Standard: Use default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None) or default=datetime.utcnow. * Note: While utcnow() is naive, .now(timezone.utc).replace(tzinfo=None) is more robust for Python 3.12+. # Group 3: Route Update Logic (backend/app/api/routes/tasks.py) * T-6003: Fix Task Completion and Update Endpoints * Objective: Fix the crash during PATCH /tasks/{id}/complete. * Action: In the complete_task function, locate the line where task.updated_at is set. * Change: Replace the existing assignment with task.updated_at = datetime.now(timezone.utc).replace(tzinfo=None). * Action: Repeat this for the general update_task route to ensure any metadata updates are also naive. # Group 4: Verification Logic * T-6004: Integrity Check * Action: Run a syntax check on all modified files to ensure datetime and timezone are imported from the datetime module. * Action: Confirm that no timezone-aware objects are passed to session.add() or session.commit(). Generate these tasks.

## Response snapshot

Generated actionable tasks in `specs/019-fix-naive-utc/tasks.md`. The tasks focus on standardizing all datetime operations to use naive UTC (`replace(tzinfo=None)`) across `deps.py`, `models.py`, and `routes/tasks.py`.

## Outcome

- ✅ Impact: Provided detailed roadmap for resolving timezone errors.
- 🧪 Tests: N/A.
- 📁 Files: `tasks.md`.
- 🔁 Next prompts: `/sp.implement`.
- 🧠 Reflection: Explicitly defining the logic (`replace(tzinfo=None)`) in the task description helps the implementing LLM avoid ambiguity.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
