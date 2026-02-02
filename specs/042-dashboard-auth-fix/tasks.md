# Actionable Tasks: Fix Dashboard Authentication & Fetching

**Feature Branch**: `042-dashboard-auth-fix`
**Total Tasks**: 8
**Generated**: 2026-02-02

## Phase 1: Foundational Framework
*Blocking prerequisites for all user stories.*

**Goal**: Establish the secure networking layer and state management infrastructure.

- [X] T001 Implement centralized API client with auth headers and 401 handling in frontend/lib/api-client.ts
- [X] T002 Implement Todo Service with secure fetch methods in frontend/services/todo-service.ts
- [X] T003 Implement TasksContext for state management in frontend/context/tasks-context.tsx
- [X] T004 Integrate TasksProvider into dashboard layout in frontend/app/dashboard/layout.tsx

## Phase 2: User Story 1 - Create Task Consistency (P1)
*Implementation of reliable task fetching and creation.*

**Goal**: Users can view and create tasks without 401 errors.
**Independent Test**: Login > Dashboard > Verify Task List loads > Create Task > Verify Success.

- [X] T005 [US1] Refactor Task List/View to use useTasks hook in frontend/components/dashboard/task-view.tsx

## Phase 3: User Story 2 - Category Management (P1)
*Implementation of reliable category creation.*

**Goal**: Users can create categories without 401 errors.
**Independent Test**: Login > Dashboard > Create Category > Verify Success.

- [X] T006 [US2] Refactor Category Picker to use addCategory from context in frontend/components/category-picker.tsx

## Phase 4: User Story 3 - Chat Integration Integrity (P2)
*Implementation of secure chat identity.*

**Goal**: Chat widget initializes with the correct, active User ID.
**Independent Test**: Login > Verify Chat Widget requests use live User ID.

- [X] T007 [US3] Update Chat Widget wrapper to use User ID from useAuth in frontend/components/dashboard/client-chat-wrapper.tsx

## Phase 5: Verification & Polish
*Final quality checks against success criteria.*

**Goal**: Confirm zero 401 errors and smooth UX.

- [X] T008 Verify zero 401 errors in browser console during full user session (Dashboard load, Create Task, Create Category)

## Dependencies
1. **Foundation (T001-T004)** must be complete before **US1 (T005)** or **US2 (T006)**.
2. **US1 (T005)** and **US2 (T006)** can be executed in parallel after Foundation.
3. **US3 (T007)** is independent of the TasksContext but depends on `useAuth` (existing).

## Implementation Strategy
1. **MVP**: Complete Phase 1 and Phase 2 (Fixing the critical "Cannot create task" bug).
2. **Expansion**: Complete Phase 3 (Fixing categories).
3. **Polish**: Complete Phase 4 (Ensuring chat stability).