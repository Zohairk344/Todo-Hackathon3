---
id: 005
title: Consistency Analysis for Ironclad Backend
stage: general
date: 2026-01-13
surface: agent
model: gemini
feature: ironclad-backend
branch: 014-ironclad-backend
user: zohair
command: /sp.analyze
labels: ["analysis", "consistency", "constitution"]
links:
  spec: specs/014-ironclad-backend/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/014-ironclad-backend/spec.md
 - specs/014-ironclad-backend/plan.md
 - specs/014-ironclad-backend/tasks.md
tests:
 - semantic analysis
---

## Prompt

$ARGUMENTS

## Response snapshot

Performed a cross-artifact consistency analysis. Identified a **CRITICAL** conflict: `plan.md` specifies Python 3.10+, while the `constitution.md` mandates 3.13+. Also noted a missing explicit instruction for lowercase `__tablename__` in `tasks.md`. Verified 100% requirement coverage.

## Outcome

- ✅ Impact: Caught high-risk version mismatch before implementation.
- 🧪 Tests: N/A.
- 📁 Files: spec.md, plan.md, tasks.md, constitution.md.
- 🔁 Next prompts: Remediation edits, then /sp.implement.
- 🧠 Reflection: Constitution always wins; checking versions early avoids deployment failures on specific platforms like HF Spaces.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
