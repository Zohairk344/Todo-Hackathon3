---
id: "0010"
title: "Standardize Task interface to snake_case"
stage: "refactor"
date: "2026-02-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "049-dashboard-ui-overhaul"
branch: "049-dashboard-ui-overhaul"
user: "zohair"
command: "/sp.implement"
labels: ["typescript", "refactor", "snake_case", "data-model"]
links:
  spec: "specs/049-dashboard-ui-overhaul/spec.md"
  plan: "specs/049-dashboard-ui-overhaul/plan.md"
  tasks: "specs/049-dashboard-ui-overhaul/tasks.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/services/todo-service.ts"
  - "specs/049-dashboard-ui-overhaul/tasks.md"
tests:
  - "Type check for category_id in task-view.tsx"
---

# Prompt History Record: Standardize Task interface to snake_case

## Context
Fixing a TypeScript error in `task-view.tsx`. The `Task` interface used `categoryId` (camelCase) while the UI and backend expectations leaned towards `category_id` (snake_case).

## User Input
```text
Fixing a TypeScript error in task-view.tsx. The Task interface defines categoryId (camelCase), but the backend sends and the UI uses category_id (snake_case). We will update the Task interface to use snake_case for all fields to match the SQLModel backend.

Action: Overwrite frontend/services/todo-service.ts.
Key Change: Update the Task and Category interfaces to use snake_case keys (category_id, due_date, owner_id).
```

## Assistant Response
The assistant performed the following actions:
1. Updated `frontend/services/todo-service.ts` to use `snake_case` for all fields in `Task` and `Category` interfaces (`due_date`, `category_id`, `created_at`, `updated_at`, `user_id`).
2. Maintained the correct API path logic (`/api/${userId}/...`) and `status` mapping logic, which was missing from the user's provided snippet.
3. Updated `specs/049-dashboard-ui-overhaul/tasks.md` to track the change.

## Outcome
TypeScript interfaces now align with the backend's snake_case data model and the frontend's usage in components like `TaskView`.