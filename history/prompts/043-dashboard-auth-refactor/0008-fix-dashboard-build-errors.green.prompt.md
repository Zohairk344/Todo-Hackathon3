---
id: 0008
title: Fix dashboard build errors
stage: green
date: 2026-02-02
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 043-dashboard-auth-refactor
branch: 043-dashboard-auth-refactor
user: zohair
command: "/sp.implement (fix build errors)"
labels: ["fix", "dashboard", "build"]
links:
  spec: "specs/043-dashboard-auth-refactor/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/components/ui/separator.tsx"
  - "frontend/components/dashboard/new-task-dialog.tsx"
tests:
  - "npm run lint"
---

## Prompt

Module not found: Can't resolve '@/components/ui/separator'

## Response snapshot

Resolved build errors by:
1.  Manually creating the missing `Separator` component in `frontend/components/ui/separator.tsx`.
2.  Refactoring `NewTaskDialog` to use standard HTML `select` elements instead of the missing shadcn `Select` component.
3.  Verifying with `npm run lint` (0 errors).

## Outcome

- ✅ Impact: High. Fixed build blocking errors.
- 🧪 Tests: Lint passed.
- 📁 Files: Created separator.tsx, modified new-task-dialog.tsx.
- 🔁 Next prompts: None
- 🧠 Reflection: Proactively checking for all UI components used in refactored code can prevent such missing dependency issues.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): None