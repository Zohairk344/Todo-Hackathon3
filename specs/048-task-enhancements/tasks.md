# Tasks: Task Dashboard Enhancements and Fixes

**Feature Branch**: `048-task-enhancements`
**Implementation Plan**: [specs/048-task-enhancements/plan.md](plan.md)
**Feature Spec**: [specs/048-task-enhancements/spec.md](spec.md)

## Phase 1: Setup
**Goal**: Verify environment and dependencies.

- [x] T001 Verify `Task` model definition in `todo-hackathon3/app/models.py` matches requirements

## Phase 2: Foundational (Blocking Prerequisites)
**Goal**: Implement backend changes required for all frontend features.

- [x] T002 Update `update_task` route decorator to `@router.patch` in `todo-hackathon3/app/api/routes/tasks.py`
- [x] T003 Verify `update_task` accepts `TaskUpdate` for partial updates in `todo-hackathon3/app/api/routes/tasks.py`

## Phase 3: Fix Task Completion/Update (User Story 1)
**Goal**: Enable users to mark tasks as complete without errors (P1).

- [x] T004 [US1] Create verification script `todo-hackathon3/tests/verify_patch.py` to test PATCH endpoint
- [x] T005 [US1] Run verification script and confirm 200 OK response for partial update

## Phase 4: Enrich Task Cards (User Story 2)
**Goal**: Display comprehensive task details on the dashboard (P2).

- [x] T006 [US2] Update `Task` interface to include `dueDate` and `category` in `frontend/services/todo-service.ts`
- [x] T007 [US2] Update `TaskView` component to display Description (truncated) in `frontend/components/dashboard/task-view.tsx`
- [x] T008 [US2] Update `TaskView` component to display Priority Badge with semantic colors in `frontend/components/dashboard/task-view.tsx`
- [x] T009 [US2] Update `TaskView` component to display Due Date with icon and format "MMM DD" in `frontend/components/dashboard/task-view.tsx`
- [x] T010 [US2] Update `TaskView` component to display Category Badge with color dot in `frontend/components/dashboard/task-view.tsx`

## Phase 5: Add Due Date to Tasks (User Story 3)
**Goal**: Allow setting due dates during creation and editing (P3).

- [x] T011 [US3] Add `dueDate` state and input field to `NewTaskDialog` in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T012 [US3] Update `handleConfirm` in `NewTaskDialog` to include `dueDate` in payload in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T013 [US3] Verify `dueDate` is correctly passed to `todo-service` creation method in `frontend/services/todo-service.ts`

## Phase 6: Category Creation Shortcut (User Story 4)
**Goal**: Streamline category creation flow (P4).

- [x] T014 [US4] Add `onAddCategory` prop to `NewTaskDialog` interface in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T015 [US4] Wire "+" button in `NewTaskDialog` to trigger `onAddCategory` in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T016 [US4] Implement `onAddCategory` handler in `DashboardPage` to switch modals in `frontend/app/dashboard/page.tsx`
- [x] T017 [US4] Implement logic to reopen `NewTaskDialog` after Category creation success/cancel in `frontend/app/dashboard/page.tsx`

## Phase 7: Polish & Verification
**Goal**: Ensure quality and consistency.

- [x] T018 Run `npm run build` to verify type safety across frontend components
- [ ] T019 Manual verification of full flow: Create Task -> Add Category -> Set Date -> View on Card -> Mark Complete

## Dependencies

1. **T002 (Backend Fix)** blocks **T005 (Verification)** and effectively **T019 (Final Verification)**.
2. **T006 (Interface Update)** blocks all UI updates in **Phase 4**.
3. **T014 (Prop Definition)** blocks **T016 (Handler Implementation)**.

## Implementation Strategy

1. **Backend First**: Fix the critical 405 error (Phase 2 & 3) to unblock core functionality.
2. **Data & Types**: Update frontend interfaces (Phase 4 start) to support new fields.
3. **UI Enrichment**: Build the visual components (Phase 4) now that data is available.
4. **Input Features**: Add the input controls (Phase 5 & 6) to feed data into the new UI.
5. **Flow Integration**: Wire up the complex modal switching logic (Phase 6) last.
