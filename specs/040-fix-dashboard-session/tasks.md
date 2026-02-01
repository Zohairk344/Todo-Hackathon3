# Tasks: Dashboard Session Integration

**Input**: Design documents from `/specs/040-fix-dashboard-session/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Manual verification of session propagation and build success as requested.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify backend readiness and environment configuration

- [x] T001 [P] Verify backend `get-session` endpoint implementation in `todo-hackathon3/app/api/routes/auth.py`
- [x] T002 [P] Confirm `NEXT_PUBLIC_API_URL` availability in `frontend/` environment

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and utilities needed for the refactor

- [x] T003 [P] Ensure `User` and `Session` types are correctly defined in `frontend/lib/api.ts`

---

## Phase 3: User Story 1 - Authenticated Dashboard Access (Priority: P1) 🎯 MVP

**Goal**: Replace mock user data with real session data in the dashboard layout and header

**Independent Test**: Log in and verify that the dashboard navigation shows the actual user's name and email.

### Implementation for User Story 1

- [x] T004 [US1] Refactor `frontend/app/dashboard/layout.tsx` to convert to an `async` server component and implement `getUserSession`
- [x] T005 [US1] Update `frontend/app/dashboard/layout.tsx` to pass real user data to `<UserNav />` via the `<Header />` component
- [x] T006 [US1] Update `frontend/components/dashboard/Header.tsx` to receive and pass user data to `UserNav` (removing mock data)
- [x] T007 [US1] Verify that the dashboard header correctly displays the logged-in user's name and email

---

## Phase 4: User Story 2 - Chatbot Task Creation (Priority: P1)

**Goal**: Fix the database `IntegrityError` by passing the real user ID to the chatbot

**Independent Test**: Ask the chatbot to create a task and verify it is saved successfully to the database.

### Implementation for User Story 2

- [x] T008 [US2] Update `frontend/app/dashboard/layout.tsx` to pass the real `user.id` to the `<ClientChatWrapper />` component
- [x] T009 [US2] Verify that the chatbot can successfully add a task without triggering a `ForeignKeyViolationError`

---

## Phase 5: User Story 3 - Unauthenticated Redirect (Priority: P2)

**Goal**: Secure the dashboard route by redirecting unauthenticated users

**Independent Test**: Attempt to access `/dashboard` without a session and verify redirect to `/sign-in?callbackUrl=/dashboard`.

### Implementation for User Story 3

- [x] T010 [US3] Implement route protection logic in `frontend/app/dashboard/layout.tsx` using `redirect`
- [x] T011 [US3] Implement error handling for backend session fetch failures in `frontend/app/dashboard/layout.tsx`
- [x] T012 [US3] Verify redirect to `/sign-in?callbackUrl=/dashboard` for missing sessions
- [x] T013 [US3] Verify redirect with `error=system_unavailable` when backend is unreachable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and build checks

- [x] T014 [P] Run `npm run build` in `frontend/` to ensure no production build errors
- [x] T015 [P] Validate all success criteria in `specs/040-fix-dashboard-session/spec.md`
- [x] T016 [P] Verify quickstart validation steps in `specs/040-fix-dashboard-session/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2)
- **User Story 2 (Phase 4)**: Depends on US1 completion (as it shares the same layout refactor)
- **User Story 3 (Phase 5)**: Depends on US1 completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities

- T001 and T002 can run in parallel
- T014, T015, and T016 can run in parallel during the polish phase

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

The layout refactor in US1 is the core change. Completing Phase 3 will likely address most of US2 as well.

1. Complete Setup and Foundational checks.
2. Implement the `async` refactor of `frontend/app/dashboard/layout.tsx`.
3. Verify data propagation to Header and Chatbot.

### Incremental Delivery

1. Verify backend endpoint and types.
2. Refactor Layout (core logic).
3. Secure the route (redirects).
4. Build and verify.
