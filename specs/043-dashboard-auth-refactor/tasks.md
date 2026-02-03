# Tasks: Secure Dashboard Data Fetching via TasksContext

**Feature Branch**: `043-dashboard-auth-refactor`
**Spec**: [specs/043-dashboard-auth-refactor/spec.md](specs/043-dashboard-auth-refactor/spec.md)

## Phase 1: Setup & Environment (No User Stories)

- [x] T001 Verify project structure and ensure `043-dashboard-auth-refactor` branch is active
- [x] T002 Verify `api-client.ts` handles credentials correctly in `frontend/lib/api-client.ts`
- [x] T003 [P] Audit `frontend/lib/api.ts` for usage in dashboard components (to ensure removal)

## Phase 2: Foundational Verification (Blocking)

- [x] T004 Confirm `todoService` exclusively uses `api-client.ts` in `frontend/services/todo-service.ts`
- [x] T005 [P] Verify `TasksContext` handles `refreshTasks` logic correctly in `frontend/context/tasks-context.tsx`
- [x] T006 Ensure `TasksContext` has proper error handling (toast) for all actions in `frontend/context/tasks-context.tsx`

## Phase 3: User Story 1 - Viewing Dashboard Data (Priority: P1)

*Goal: Dashboard loads tasks and categories without 401 errors.*

- [x] T007 [P] [US1] Clean `DashboardPage` imports and remove any legacy state/fetch in `frontend/app/dashboard/page.tsx`
- [x] T008 [US1] Ensure `DashboardPage` renders `TaskList` and `AddTaskForm` using only context data in `frontend/app/dashboard/page.tsx`
- [x] T009 [US1] Implement session expiration redirect (401 handling) in `frontend/lib/api-client.ts` (if not already present)
- [x] T010 [US1] Verify `TaskList` component receives data purely from context in `frontend/components/task-list.tsx`
- [x] T010.1 [US1] Run syntax check on `frontend/app/dashboard/page.tsx` and `frontend/components/task-list.tsx`

## Phase 4: User Story 2 - Adding a New Category (Priority: P2)

*Goal: Users can create categories securely with immediate UI updates.*

- [x] T011 [P] [US2] Verify `CategoryPicker` uses `useTasks` for creating categories in `frontend/components/category-picker.tsx`
- [x] T012 [US2] Ensure `CategoryPicker` triggers context refresh after creation in `frontend/components/category-picker.tsx`
- [x] T013 [US2] Confirm no direct fetch calls exist in `frontend/components/category-picker.tsx`
- [x] T013.1 [US2] Run syntax check on `frontend/components/category-picker.tsx`

## Phase 5: User Story 3 - Adding a New Task (Priority: P2)

*Goal: Users can create tasks securely with immediate UI updates.*

- [x] T014 [P] [US3] Verify `AddTaskForm` uses `useTasks` for creating tasks in `frontend/components/add-task-form.tsx`
- [x] T015 [US3] Ensure `AddTaskForm` triggers context refresh after creation in `frontend/components/add-task-form.tsx`
- [x] T016 [US3] Confirm no direct fetch calls exist in `frontend/components/add-task-form.tsx`
- [x] T016.1 [US3] Run syntax check on `frontend/components/add-task-form.tsx`

## Phase 6: User Story 4 - Editing and Deleting Tasks (Refactor & Cleanup)

*Goal: Ensure editing and deleting also use the secure context.*

- [x] T017 [P] [US4] Implement `updateTask` in `TasksContext` (if missing) in `frontend/context/tasks-context.tsx`
- [x] T018 [US4] Refactor `TaskList` to use `updateTask` from context for edits in `frontend/components/task-list.tsx`
- [x] T019 [US4] Ensure `EditTaskDialog` uses the callback prop correctly (no internal fetch) in `frontend/components/features/edit-task-dialog.tsx`
- [x] T020 [US4] Verify `deleteTask` in `TasksContext` handles optimistic updates and errors in `frontend/context/tasks-context.tsx`
- [x] T020.1 [US4] Run syntax check on `frontend/context/tasks-context.tsx` and `frontend/components/features/edit-task-dialog.tsx`

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T021 [P] Verify empty state message ("No tasks found...") in `frontend/components/task-list.tsx`
- [x] T022 [P] Verify toast notifications for success/error in `frontend/context/tasks-context.tsx`
- [x] T023 Final code audit to ensure `frontend/lib/api.ts` is NOT imported in any Dashboard component
- [x] T024 [P] Perform SC-001 audit: Verify all Dashboard API requests return 200 OK in browser network logs.
- [x] T025 [P] Create temporary sanity check script to verify Task/Category CRUD endpoints are reachable via context.

## Dependencies

1.  **Phase 1 & 2** (Setup/Foundation) MUST be completed first to ensure the secure channel (`api-client`) is working.
2.  **Phase 3** (Viewing) validates the read path.
3.  **Phase 4 & 5** (Adding) validate the write path.
4.  **Phase 6** (Editing) completes the CRUD cycle refactor.

## Implementation Strategy

1.  **MVP Scope**: Complete Phases 1, 2, and 3. This solves the immediate "Dashboard broken" issue.
2.  **Full Feature**: Proceed to Phases 4, 5, and 6 to ensure all actions are secure.
3.  **Parallel Execution**: Tasks marked with `[P]` can be executed by separate agents or in parallel threads if file locks permit.