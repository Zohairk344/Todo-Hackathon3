---
id: 001
title: Create Spec for Ironclad Backend
stage: spec
date: 2026-01-13
surface: agent
model: gemini
feature: ironclad-backend
branch: 014-ironclad-backend
user: zohair
command: /sp.specify
labels: ["architecture", "backend", "auth", "schema"]
links:
  spec: specs/014-ironclad-backend/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/014-ironclad-backend/spec.md
 - specs/014-ironclad-backend/checklists/requirements.md
tests:
 - manual checklist validation
---

## Prompt

$ARGUMENTS

## Response snapshot

Created feature branch `014-ironclad-backend` and specification `specs/014-ironclad-backend/spec.md`. The spec mandates the "Ironclad" architecture: strict snake_case (Python) to camelCase (DB) mappings for all Auth/App tables, Dual-Token authentication (Header/Cookie), and robust startup via `asynccontextmanager`. Validated with checklist (noting architectural exceptions).

## Outcome

- ✅ Impact: Defined strict architectural foundation.
- 🧪 Tests: N/A (Spec phase).
- 📁 Files: spec.md, requirements.md.
- 🔁 Next prompts: /sp.plan to design implementation.
- 🧠 Reflection: Architecture specs require technical details that violate standard "no implementation details" rules.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
