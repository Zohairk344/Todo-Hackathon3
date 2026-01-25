---
id: 004
title: Generate Tasks for Ironclad Backend
stage: tasks
date: 2026-01-13
surface: agent
model: gemini
feature: ironclad-backend
branch: 014-ironclad-backend
user: zohair
command: /sp.tasks
labels: ["tasks", "architecture", "backend"]
links:
  spec: specs/014-ironclad-backend/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/014-ironclad-backend/tasks.md
tests:
 - manual task validation
---

## Prompt

$ARGUMENTS

## Response snapshot

Generated actionable, dependency-ordered tasks in `specs/014-ironclad-backend/tasks.md`. Grouped by phase: Setup, Foundational (Blocking), and User Stories (P1-P3). Included specific requirements for "Ironclad" schema refactoring, dual-mode auth logic, and chatbot initialization.

## Outcome

- ✅ Impact: Provided a clear, executable roadmap for implementation.
- 🧪 Tests: N/A.
- 📁 Files: tasks.md.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Organizing by user story while keeping schema/auth foundational ensures a stable build.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
