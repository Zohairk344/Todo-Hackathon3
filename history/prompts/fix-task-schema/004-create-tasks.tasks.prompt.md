---
id: 004
title: Generate Tasks for Task Schema Fix
stage: tasks
date: 2026-01-13
surface: agent
model: gemini
feature: fix-task-schema
branch: 015-fix-task-schema
user: zohair
command: /sp.tasks
labels: ["tasks", "bugfix", "database"]
links:
  spec: specs/015-fix-task-schema/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/015-fix-task-schema/tasks.md
tests:
 - manual task validation
---

## Prompt

Break down Feature: Fix Task Model Schema Alignment into a single, atomic coding task. # Group 1: Critical Schema Fix * T-4001: Correct Task Model Column Mapping (backend/app/models.py) * Objective: Resolve the UndefinedColumnError by aligning the Python model with the existing Database schema. * Target File: backend/app/models.py * Target Class: Task * Action: Locate the due_date field definition. * Change Instruction: * FROM: due_date: Optional[datetime] = Field(default=None, sa_column=Column("dueDate", DateTime)) * TO: due_date: Optional[datetime] = Field(default=None, sa_column=Column("due_date", DateTime, nullable=True)) * Critical Constraint: You must explicitly set the column name to "due_date" (snake_case) inside the Column() constructor. The database rejects "dueDate". * Safety Check: Do not modify the user_id field (which maps to "userId"). The error logs confirm userId is working correctly; only due_date is broken. Generate this task.

## Response snapshot

Generated actionable, dependency-ordered tasks in `specs/015-fix-task-schema/tasks.md`. The tasks are organized into phases: Setup, Foundational (the schema fix), and User Stories (Verification Protocol and Safety Checks). This ensures the surgical fix is implemented correctly and verified without introducing regressions.

## Outcome

- ✅ Impact: Provided a clear, executable roadmap for the schema fix.
- 🧪 Tests: N/A.
- 📁 Files: `tasks.md`.
- 🔁 Next prompts: `/sp.implement` to apply the fix.
- 🧠 Reflection: Bug fixes should include verification tasks even if the code change is atomic to comply with the project's Verification Protocol.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
