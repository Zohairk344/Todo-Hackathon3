---
id: 0001
title: Fix Dashboard Sync Spec
stage: spec
date: 2026-02-03
surface: agent
model: gemini
feature: 044-fix-dashboard-sync
branch: 044-fix-dashboard-sync
user: zohair
command: /sp.specify
labels: ["spec", "dashboard", "fix", "frontend"]
links:
  spec: specs/044-fix-dashboard-sync/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/044-fix-dashboard-sync/spec.md
  - specs/044-fix-dashboard-sync/checklists/requirements.md
tests:
  - null
---

## Prompt

**The Mission:** Rescue the Dashboard from a broken state by synchronizing the Frontend Data Model with the Backend, restoring high-quality UI components (fixing the "all over the place" look), and ensuring data fetching is robust against race conditions. **The Context:** * **Critical Type Mismatch:** The Backend returns `snake_case` properties (`due_date`, `created_at`, `status`), but the Frontend components (`TaskView`, `DashboardStats`) are trying to access `camelCase` properties (`dueDate`, `completed`), causing build failures and runtime crashes. * **UI/UX Regression:** The `NewTaskDialog` was stripped of its Shadcn `Select` component (replaced with a raw HTML select), making it look broken. Imports are messy (duplicate `Label` imports). * **Data Fetching (401s):** The `TasksContext` is hitting `401 Unauthorized`. This is often caused by the Context trying to fetch data *before* the Auth Context has fully confirmed the user's session, or by Type Errors crashing the render cycle before the fetch completes. * **Chatbot Disconnect:** The chatbot creates tasks successfully (Backend returns 200), but the Frontend crashes trying to render them, leading to an empty dashboard. **Key Technical Requirements:** 1. **Standardize the `Task` Interface (`frontend/services/todo-service.ts`):** * Update the interface to **strictly match** the Backend Pydantic model: * `dueDate` -> `due_date` (string | null) * `createdAt` -> `created_at` (string) * `updatedAt` -> `updated_at` (string) * `completed` -> `status` ("pending" | "in-progress" | "completed") * `category` -> `category_name` (string | optional) or `category_id` (number | optional). * Ensure `createTask` payload transforms frontend data to this structure. 2. **Refactor UI Components to Match New Model:** * **`frontend/components/dashboard/task-view.tsx` & `task-card.tsx`:** * Replace all references of `task.dueDate` with `task.due_date`. * Replace `task.completed` logic with `task.status === "completed"`. * Fix the `DashboardStats` prop types to accept the new `Task` interface. 3. **Restore High-Quality UI (`frontend/components/dashboard/new-task-dialog.tsx`):** * **Fix Imports:** Remove duplicate `Label` imports. * **Restore Shadcn UI:** Replace the ugly native `<select>` with the proper `@/components/ui/select` component. * **Validation:** Ensure the "Create" button is disabled only when the title is empty. 4. **Robust Data Fetching (`frontend/context/tasks-context.tsx`):** * **Race Condition Fix:** Modify the `useEffect` to strictly wait until `user` is NOT null and `user.id` exists before calling `refreshTasks`. * **Error Handling:** If `refreshTasks` hits a 401, it should silently catch it and potentially trigger a re-auth check, rather than crashing the app. **Success Criteria:** * The Dashboard loads without 401 errors. * Tasks created by the Chatbot appear instantly (because the types now match). * The "Create Task" dialog looks professional (Shadcn UI) and works correctly. * No more build errors regarding `Task` properties.

## Response snapshot

Created feature branch `044-fix-dashboard-sync`.
Wrote specification `specs/044-fix-dashboard-sync/spec.md` focusing on behavioral requirements for synchronizing dashboard data and fixing UI issues, abstracting technical implementation details to satisfy SDD principles.
Validated spec with checklist `specs/044-fix-dashboard-sync/checklists/requirements.md`.

## Outcome

- ✅ Impact: Spec created and validated
- 🧪 Tests: N/A
- 📁 Files: Created spec.md and checklist
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Spec creation required abstracting technical details from the prompt to adhere to non-technical requirements.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None