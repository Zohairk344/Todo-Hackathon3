---
id: 0010
title: Fix build errors for dashboard auth refactor
stage: green
date: 2026-02-02
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 043-dashboard-auth-refactor
branch: 043-dashboard-auth-refactor
user: zohair
command: "/sp.implement (fix build errors)"
labels: ["fix", "build", "refactor"]
links:
  spec: "specs/043-dashboard-auth-refactor/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/components/dashboard-stats.tsx"
  - "frontend/components/features/edit-task-dialog.tsx"
  - "frontend/components/task-card.tsx"
  - "frontend/components/dashboard/task-view.tsx"
  - "frontend/services/todo-service.ts"
tests:
  - "npm run build"
---

## Prompt

Failed to compile.
Type error: Type 'Task[]' is not assignable to type 'Task[]'.

## Response snapshot

Resolved multiple build errors caused by type mismatches between the legacy `api.ts` and the new `todo-service.ts`.
1.  Updated `DashboardStats`, `TaskCard`, and `EditTaskDialog` to import `Task` from `@/services/todo-service`.
2.  Updated property access to match the new `Task` type (e.g., `due_date` instead of `dueDate`, `status === "completed"` instead of `completed`).
3.  Added the missing `category` property to the `Task` interface in `todo-service.ts`.
4.  Removed legacy files `api.ts`, `ChatWidget.tsx`, and `settings/page.tsx` that were causing conflicts.
5.  Verified with `npm run build` (success).

## Outcome

- ✅ Impact: High. Unblocked the build and completed the migration to the secure service layer.
- 🧪 Tests: Build passed.
- 📁 Files: Updated components and service, deleted legacy files.
- 🔁 Next prompts: None
- 🧠 Reflection: The refactor exposed several tight couplings to the legacy API that needed to be systematically addressed.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): None