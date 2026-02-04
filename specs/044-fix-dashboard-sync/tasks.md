# Tasks: Fix Dashboard Sync

**Input**: Design documents from `/specs/044-fix-dashboard-sync/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this story belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project synchronization and environment check.

- [x] T001 Verify backend connectivity and ensure `.env` matches backend port in `frontend/lib/api-client.ts`
- [x] T002 [P] Check for existence of `@/components/ui/select` or prepare custom styled alternative in `frontend/components/ui/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Standardize the data contract between Frontend and Backend.

- [x] T003 Update `Task` and `Category` interfaces to match Backend `snake_case` model in `frontend/services/todo-service.ts`

---

## Phase 3: User Story 1 - View Dashboard & Stability (Priority: P1) 🎯 MVP

**Goal**: Ensure the Dashboard loads without 401 errors or runtime crashes due to type mismatches.

**Independent Test**: Dashboard renders existing tasks with correct dates and status; Network tab shows no 401 errors on load.

- [x] T004 Harden `TasksProvider` with `user.id` guards to prevent premature fetching in `frontend/context/tasks-context.tsx`
- [x] T005 [P] [US1] Refactor property access to use `snake_case` (e.g., `due_date`) and update status rendering in `frontend/components/dashboard/task-view.tsx`
- [x] T006 [P] [US1] Update `TaskCard` or related sub-components to use new `Task` interface properties in `frontend/components/dashboard/task-card.tsx`
- [x] T007 [US1] Update `DashboardStats` to calculate metrics using the standardized `status` field in `frontend/components/dashboard-stats.tsx`
- [x] T016 [US1] Implement "Session Expired" toast and redirect logic for persistent 401 errors in `frontend/context/tasks-context.tsx`

**Checkpoint**: Dashboard is stable, data-accurate, and free of 401 race conditions.

---

## Phase 4: User Story 2 - Chatbot Sync (Priority: P1)

**Goal**: Tasks created via Chatbot (which use Backend types) appear instantly on the Frontend.

**Independent Test**: Create a task via Chatbot; verify it appears in the list with a "Dashboard synced" notification.

- [x] T008 [US2] Implement a non-blocking toast notification upon successful task synchronization in `frontend/context/tasks-context.tsx`
- [x] T009 [US2] Verify `addTask` logic in `TasksContext` correctly handles the standardized `Task` response.

---

## Phase 5: User Story 3 - Manual Task Creation (Priority: P2)

**Goal**: Restore the high-quality Shadcn UI for manual task creation and ensure payload mapping.

**Independent Test**: Open "New Task" dialog; verify styled Select menus; create task and verify it saves with correct `category_id`.

- [x] T010 [US3] Implement custom styled Select (matching design system) or restore missing `select.tsx`, and fix duplicate Label imports in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T011 [US3] Ensure `handleSubmit` maps `categoryId` to `category_id` (snake_case) and parses it as an integer in `frontend/components/dashboard/new-task-dialog.tsx`
- [x] T012 [US3] Implement "Create" button disabled state when title is empty in `frontend/components/dashboard/new-task-dialog.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup.

- [x] T013 [P] Run `npm run lint` in `frontend/` to ensure no remaining type errors or unused imports.
- [ ] T014 [P] Verify responsiveness and visual consistency of the refactored Dashboard components.
- [ ] T015 Run validation protocol from `quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: BLOCKS all User Story work (T003 is critical).
- **User Stories (Phase 3-5)**: Depend on Phase 2. US1 is the priority (MVP).
- **Polish (Phase 6)**: After all stories are complete.

### User Story Dependencies

- **US1**: Primary dependency for the whole app stability.
- **US2**: Depends on US1's context hardening.
- **US3**: Independent UI restoration, but depends on T003 (Service types).

### Parallel Opportunities

- T005, T006, and T007 (US1 rendering) can be done in parallel once T004 is stable.
- US3 (Manual Creation) can be developed in parallel with US1 rendering once T003 is done.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T003 (Foundational Types).
2. Complete T004 (Context Hardening).
3. Complete T005-T007 (UI Refactor).
4. **STOP and VALIDATE**: Verify Dashboard loads without crashes or 401s.

### Incremental Delivery

1. Deliver Foundational Types + US1 → Dashboard restored.
2. Deliver US2 → Chatbot integration confirmed.
3. Deliver US3 → Manual creation UI polished.