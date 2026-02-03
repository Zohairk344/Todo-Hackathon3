---
id: 0001
title: Create spec for dashboard auth refactor
stage: spec
date: 2026-02-02
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 043-dashboard-auth-refactor
branch: 043-dashboard-auth-refactor
user: zohair
command: "/sp.specify **The Mission:** Eliminate the persistent `401 Unauthorized` errors by refactoring the Dashboard UI components to use the secure `TasksContext` instead of their own insecure `fetch` calls. **The Context:** * **Current State:** The `TasksProvider` is set up to handle secure data fetching. However, the logs show that requests to `/tasks` and `/categories` are still missing the session cookie. * **The Root Cause:** The UI components (specifically `frontend/app/dashboard/page.tsx` and likely the Dialog components for creating tasks/categories) contain \"legacy\" code. They are making their own `fetch()` calls that lack `credentials: \"include\"`, causing the backend to reject them. * **The Fix:** We must strip all data-fetching logic from the UI components and replace it with the `useTasks()` hook. This ensures all operations go through our secure `api-client.ts` wrapper. **Key Technical Requirements:** 1. **Refactor `frontend/app/dashboard/page.tsx`:** * Remove all `useState` for tasks/categories. * Remove all `useEffect` blocks that fetch data. * Remove all `fetch` calls for creating tasks/categories. * **Import:** `useTasks` from `frontend/context/tasks-context.tsx`. * **Implementation:** Render the dashboard view using the data and functions provided by the context (`tasks`, `categories`, `addTask`, `addCategory`, `isLoading`). 2. **Ensure Component Compatibility:** * Since I cannot see the specific filenames for your \"Add Task\" or \"Add Category\" modals, we will refactor the *parent* page (`page.tsx`) to pass the secure handlers (`addTask`, `addCategory`) down to them, or ensure the page manages the state interactions directly. **Success Criteria:** * The Dashboard Page code is clean and contains *no* `fetch` calls. * The logs show `200 OK` for `/tasks` and `/categories` (indicating cookies are present). * Creating a category updates the UI immediately (handled by the Context)."
labels: ["spec", "auth", "refactor"]
links:
  spec: specs/043-dashboard-auth-refactor/spec.md
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - specs/043-dashboard-auth-refactor/spec.md
  - specs/043-dashboard-auth-refactor/checklists/requirements.md
tests:
  - "null"
---

## Prompt

**The Mission:** Eliminate the persistent `401 Unauthorized` errors by refactoring the Dashboard UI components to use the secure `TasksContext` instead of their own insecure `fetch` calls. **The Context:** * **Current State:** The `TasksProvider` is set up to handle secure data fetching. However, the logs show that requests to `/tasks` and `/categories` are still missing the session cookie. * **The Root Cause:** The UI components (specifically `frontend/app/dashboard/page.tsx` and likely the Dialog components for creating tasks/categories) contain "legacy" code. They are making their own `fetch()` calls that lack `credentials: "include"`, causing the backend to reject them. * **The Fix:** We must strip all data-fetching logic from the UI components and replace it with the `useTasks()` hook. This ensures all operations go through our secure `api-client.ts` wrapper. **Key Technical Requirements:** 1. **Refactor `frontend/app/dashboard/page.tsx`:** * Remove all `useState` for tasks/categories. * Remove all `useEffect` blocks that fetch data. * Remove all `fetch` calls for creating tasks/categories. * **Import:** `useTasks` from `frontend/context/tasks-context.tsx`. * **Implementation:** Render the dashboard view using the data and functions provided by the context (`tasks`, `categories`, `addTask`, `addCategory`, `isLoading`). 2. **Ensure Component Compatibility:** * Since I cannot see the specific filenames for your "Add Task" or "Add Category" modals, we will refactor the *parent* page (`page.tsx`) to pass the secure handlers (`addTask`, `addCategory`) down to them, or ensure the page manages the state interactions directly. **Success Criteria:** * The Dashboard Page code is clean and contains *no* `fetch` calls. * The logs show `200 OK` for `/tasks` and `/categories` (indicating cookies are present). * Creating a category updates the UI immediately (handled by the Context).

## Response snapshot

Successfully created feature specification for `043-dashboard-auth-refactor`.
- Branch: `043-dashboard-auth-refactor`
- Spec File: `specs/043-dashboard-auth-refactor/spec.md`
- Checklist: `specs/043-dashboard-auth-refactor/checklists/requirements.md`

The specification outlines the transition from legacy `fetch` calls in the Dashboard UI to using a centralized `TasksContext` for secure, credential-enabled data fetching. Success criteria focus on the elimination of `401` errors and improved UI responsiveness.

## Outcome

- ✅ Impact: High. Fixes recurring auth issues on the dashboard.
- 🧪 Tests: No tests run yet (specification stage).
- 📁 Files: Created spec and checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: The specification process was straightforward as the user provided clear technical requirements.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): proceed to planning