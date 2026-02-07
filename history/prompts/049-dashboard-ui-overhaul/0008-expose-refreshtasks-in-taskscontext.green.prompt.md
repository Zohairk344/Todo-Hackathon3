---
id: "0008"
title: "Expose refreshTasks in TasksContext"
stage: "green"
date: "2026-02-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "049-dashboard-ui-overhaul"
branch: "049-dashboard-ui-overhaul"
user: "zohair"
command: "/sp.implement"
labels: ["typescript", "context", "refresh", "chat"]
links:
  spec: "specs/049-dashboard-ui-overhaul/spec.md"
  plan: "specs/049-dashboard-ui-overhaul/plan.md"
  tasks: "specs/049-dashboard-ui-overhaul/tasks.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/context/tasks-context.tsx"
  - "specs/049-dashboard-ui-overhaul/tasks.md"
tests:
  - "Type check for refreshTasks in TasksContextType"
---

# Prompt History Record: Expose refreshTasks in TasksContext

## Context
Fixing a build error in `ClientChatWrapper`. The component requires `refreshTasks` from `TasksContext`, which was previously unexposed.

## User Input
```text
Fixing a build error in ClientChatWrapper. The component requires refreshTasks from TasksContext, but we forgot to expose it in the interface during the last update.

Action: Overwrite frontend/context/tasks-context.tsx.
Key Change: Add refreshTasks to the TasksContextType interface and expose it in the Provider value.
```

## Assistant Response
The assistant performed the following actions:
1. Updated `frontend/context/tasks-context.tsx` to include `refreshTasks` in the `TasksContextType` interface.
2. Renamed the internal `refreshData` function to `refreshTasks` and exposed it in the `TasksContext.Provider` value.
3. Ensured that previous fixes (like `user.id` handling for backend communication) were preserved despite the user's provided snippet lacking them.
4. Updated `specs/049-dashboard-ui-overhaul/tasks.md` to track this task.

## Outcome
`refreshTasks` is now available in `TasksContext`, allowing `ClientChatWrapper` to trigger data refreshes after chat operations.