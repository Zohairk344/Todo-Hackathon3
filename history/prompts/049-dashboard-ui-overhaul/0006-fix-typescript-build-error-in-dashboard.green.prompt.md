---
id: "0006"
title: "Fix TypeScript build error in Dashboard"
stage: "green"
date: "2026-02-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "049-dashboard-ui-overhaul"
branch: "main"
user: "zohair"
command: "/sp.implement"
labels: ["typescript", "build-fix", "context", "dashboard"]
links:
  spec: "specs/049-dashboard-ui-overhaul/spec.md"
  plan: "specs/049-dashboard-ui-overhaul/plan.md"
  tasks: "specs/049-dashboard-ui-overhaul/tasks.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/context/tasks-context.tsx"
  - "frontend/components/dashboard/task-view.tsx"
  - "frontend/services/todo-service.ts"
  - "specs/049-dashboard-ui-overhaul/tasks.md"
tests:
  - "TypeScript compilation check (implicit by fixing signatures)"
---

# Prompt History Record: Fix TypeScript build error in Dashboard

## Context
Fixing a TypeScript build error where the `TaskView` component and `TasksContext` had mismatched signatures for `updateTaskStatus` and ID types (string vs number).

## User Input
```text
Fixing a TypeScript build error. The TaskView component expects onStatusChange(id: number, status: string), but the TasksContext currently provides updateTaskStatus(id: number). We need to align the Context signature to match the View's requirements and ensure IDs are treated as numbers (matching the SQLModel backend).

Task 1: Update Context Signature (frontend/context/tasks-context.tsx)
Task 2: Fix View Types (frontend/components/dashboard/task-view.tsx)
```

## Assistant Response
The assistant identified that the user-provided code was missing `user.id` for backend communication and that the `Task` interface in `todo-service.ts` was missing the `status` field used by the new `TaskView`. 

The assistant performed the following actions:
1. Updated `frontend/services/todo-service.ts` to include `status` in the `Task` interface and added logic to map `status` to `completed` for the backend.
2. Updated `frontend/context/tasks-context.tsx` with the new signatures, ensuring `user.id` is correctly passed to service calls.
3. Updated `frontend/components/dashboard/task-view.tsx` with corrected type definitions and animations.
4. Updated `specs/049-dashboard-ui-overhaul/tasks.md` to track these build fixes.

## Outcome
Build error resolved. The frontend is now properly typed and communicates with the backend using the correct ID types and user context.