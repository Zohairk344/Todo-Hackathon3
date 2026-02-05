# Implementation Tasks: Authentication Gate for Tasks

**Feature**: `045-auth-gate-tasks`
**Status**: Completed

## Phase 1: Setup
*Goal: Ensure project environment is ready for tasks context refactoring.*

- [x] T001 Verify `Loader2` import availability in `frontend/components/ui/` or `lucide-react` directly.

## Phase 2: Foundational
*Goal: There are no blocking foundational backend tasks for this frontend-only feature.*

- [x] T002 [P] Verify `AuthContext` exports `loading` state correctly in `frontend/context/auth-context.tsx`.

## Phase 3: Secure Initial Page Load (User Story 1)
*Goal: Implement the rendering gate to prevent premature component mounting and race conditions.*
*Independent Test: Clear cookies, reload dashboard, observe centered spinner, verify zero 401 errors in network tab.*

- [x] T003 [US1] Import `Loader2` and `useAuth` (aliasing `loading` to `authLoading`) in `frontend/context/tasks-context.tsx`.
- [x] T004 [US1] Implement the "Authentication Gate" logic at the start of `TasksProvider` to return a centered spinner if `authLoading` is true.
- [x] T005 [US1] Implement strict null check: if `authLoading` is false but `user` is null, return `null` (rendering nothing).
- [x] T006 [US1] Update `useEffect` for initial data fetch to strictly depend on `!authLoading` and `user?.id` presence.

## Phase 4: Prevent Unauthorized Data Fetching (User Story 2)
*Goal: Harden all data-fetching functions to strictly block execution if auth is loading or missing.*
*Independent Test: Mock `useAuth` to return `loading: true` and verify `todoService` methods are not called.*

- [x] T007 [P] [US2] Add guard clause `if (authLoading || !user?.id) return;` to `refreshTasks` function in `frontend/context/tasks-context.tsx`.
- [x] T008 [P] [US2] Add guard clause `if (!user?.id) return;` to `addTask` function in `frontend/context/tasks-context.tsx`.
- [x] T009 [P] [US2] Add guard clause `if (!user?.id) return;` to `addCategory` function in `frontend/context/tasks-context.tsx`.
- [x] T010 [P] [US2] Add guard clause `if (!user?.id) return;` to `updateTaskStatus` function in `frontend/context/tasks-context.tsx`.
- [x] T011 [P] [US2] Add guard clause `if (!user?.id) return;` to `deleteTask` function in `frontend/context/tasks-context.tsx`.

## Phase 5: Immediate Post-Login Usability (User Story 3)
*Goal: Ensure mutations work instantly once the gate is passed.*
*Independent Test: Log in, immediately create a category, verify success.*

- [x] T012 [US3] Manual Verification: Verify that `addCategory` and `addTask` succeed immediately after the loading spinner disappears.

## Phase 6: Polish & Cross-Cutting
*Goal: Final verification and code quality checks.*

- [x] T013 Verify no layout shifts occur when transitioning from spinner to dashboard content.
- [x] T014 Run existing linting/type-checking on `frontend/context/tasks-context.tsx`.

## Dependencies

1. **US1 (Gate Logic)** must be implemented first to prevent the initial race condition.
2. **US2 (Function Guards)** reinforces US1 but can be implemented in parallel with US1 logic if multiple developers were working (marked as [P]).
3. **US3 (Verification)** depends on the successful implementation of US1 and US2.

## Parallel Execution Opportunities

- T007 through T011 (adding guard clauses to different functions) are highly parallelizable once the context file is open.
- T002 (AuthContext verification) can be done independently of T001.

## Implementation Strategy

1. **MVP Scope**: Complete Phase 3 (US1) and Phase 4 (US2) to solve the core 401 error problem.
2. **Verification**: Use T012 to confirm the fix works from a UX perspective.