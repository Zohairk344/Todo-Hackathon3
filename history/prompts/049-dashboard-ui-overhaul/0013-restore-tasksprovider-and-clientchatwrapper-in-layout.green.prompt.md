---
id: "0013"
title: "Restore TasksProvider and ClientChatWrapper in layout"
stage: "green"
date: "2026-02-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "049-dashboard-ui-overhaul"
branch: "049-dashboard-ui-overhaul"
user: "zohair"
command: "/sp.implement"
labels: ["bug-fix", "context", "layout", "chat"]
links:
  spec: "specs/049-dashboard-ui-overhaul/spec.md"
  plan: "specs/049-dashboard-ui-overhaul/plan.md"
  tasks: "specs/049-dashboard-ui-overhaul/tasks.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "frontend/app/dashboard/layout.tsx"
  - "specs/049-dashboard-ui-overhaul/tasks.md"
tests:
  - "Visual verification of chat component presence"
  - "Build verification (npm run build)"
---

# Prompt History Record: Restore TasksProvider and ClientChatWrapper in layout

## Context
Fixing a Critical Runtime Error (`useTasks must be used within a TasksProvider`). The `<TasksProvider>` was accidentally removed from `frontend/app/dashboard/layout.tsx` during a previous UI overhaul, which also caused the `ClientChatWrapper` to be missing from the dashboard.

## User Input
```text
Fixing a Critical Runtime Error (useTasks must be used within a TasksProvider).
In the previous UI overhaul, the <TasksProvider> was accidentally removed from frontend/app/dashboard/layout.tsx. We need to restore it and ensure the ClientChatWrapper is nested inside it so the app can function.

Action: Overwrite frontend/app/dashboard/layout.tsx.
Key Change: Wrap the {children} with <TasksProvider> and include the <ClientChatWrapper /> inside it.
```

## Assistant Response
The assistant performed the following actions:
1. Updated `frontend/app/dashboard/layout.tsx` to re-import and wrap the `children` with `TasksProvider`.
2. Re-inserted the `ClientChatWrapper` component inside the `TasksProvider` within the layout.
3. Updated `specs/049-dashboard-ui-overhaul/tasks.md` to track the restoration.

## Outcome
The critical runtime error is resolved as the `TasksProvider` is now correctly provided to all dashboard routes. The chat interface is also restored to the dashboard view.