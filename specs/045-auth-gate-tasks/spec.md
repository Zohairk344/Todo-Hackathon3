# Feature Specification: Authentication Gate for Tasks

**Feature Branch**: `045-auth-gate-tasks`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "**The Mission:** Eliminate the persistent `401 Unauthorized` errors by implementing a strict "Authentication Gate" within the `TasksContext`. **The Context:** * **The Problem:** The backend logs show `No authentication token provided` warnings followed by `401` errors for `/tasks` and `/categories`. This happens even when "logged in" because the frontend components initiate data fetching slightly *before* the secure session cookie is fully established and ready to be sent by the browser. * **Current State:** The `TasksProvider` likely renders its children immediately or relies on a simple `if (user)` check that isn't robust enough against the initial loading state of the `AuthContext`. * **The Fix:** We must modify the `TasksProvider` to consume the `loading` state from `AuthContext`. It must **refuse to render any children** (returning a spinner or null instead) until `authLoading` is `false`. This guarantees that by the time the Dashboard mounts and tries to fetch data, the session is guaranteed to be ready. **Key Technical Requirements:** 1. **Refactor `frontend/context/tasks-context.tsx`:** * Import `loading` (aliased as `authLoading`) from `useAuth`. * **The Gate:** If `authLoading` is `true`, return a full-screen loader immediately. Do not execute any other logic. * **The Fetch Guard:** Inside `refreshTasks`, ensure strict checks: `if (!user || authLoading) return;`. * **The Mutation Guard:** Inside `addTask` and `addCategory`, ensure the same strict checks. **Success Criteria:** * The Dashboard does not load (shows a spinner) until the `/api/auth/get-session` call is complete. * The logs show zero `401` errors during the initial page load or creation actions. * Creating a category works instantly because the session cookie is guaranteed to be present."

## Clarifications

### Session 2026-02-04
- Q: UI Scope of the "Authentication Gate" → A: Content-only: Block only children of TasksProvider
- Q: Handling Authentication Failure (Null User) → A: Strict: Render null if user is null after loading

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Initial Page Load (Priority: P1)

As a user returning to the dashboard, I want to see a clear loading indicator while my session is being verified, so that I don't see broken or unauthorized states.

**Why this priority**: Critical for eliminating race conditions where components attempt to fetch data before the session cookie is established.

**Independent Test**: Can be tested by clearing cookies, loading the dashboard, and verifying that a spinner appears before any data fetch attempts are made.

**Acceptance Scenarios**:

1. **Given** a user is navigating to the dashboard, **When** the authentication session is still being checked (`authLoading` is true), **Then** the `TasksProvider` MUST display a centered loading spinner within its content area and MUST NOT render its children.
2. **Given** the authentication check completes, **When** the session is established (user is not null), **Then** the `TasksProvider` MUST render its children and initiate data fetching.
3. **Given** the authentication check completes, **When** the session is NOT established (user is null), **Then** the `TasksProvider` MUST NOT render its children and SHOULD return null (allowing the higher-level Auth guard to handle the redirect).

---

### User Story 2 - Prevent Unauthorized Data Fetching (Priority: P1)

As a developer, I want the task context to strictly block any data fetching attempts until authentication is confirmed, so that backend logs remain clean of unnecessary 401 errors.

**Why this priority**: Directly addresses the "401 Unauthorized" issue reported in backend logs.

**Independent Test**: Can be tested by mocking `useAuth` to return `loading: true` and verifying that `todoService` methods are not called.

**Acceptance Scenarios**:

1. **Given** `authLoading` is true, **When** `refreshTasks` is invoked, **Then** the function MUST return immediately without making any API calls.
2. **Given** `authLoading` is true, **When** `addTask` or `addCategory` is invoked, **Then** the function MUST return immediately without making any API calls.

---

### User Story 3 - Immediate Post-Login Usability (Priority: P2)

As a user who just logged in, I want to be able to create tasks and categories immediately, knowing that my session is fully active.

**Why this priority**: Ensures a smooth user experience once the "gate" is passed.

**Independent Test**: Can be tested by performing a create action immediately after the dashboard renders and verifying success.

**Acceptance Scenarios**:

1. **Given** the dashboard has just finished loading (gate passed), **When** a user creates a category, **Then** the request MUST succeed because the session cookie is guaranteed to be present.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `TasksProvider` MUST consume both the `user` and `loading` state (aliased as `authLoading`) from the authentication context.
- **FR-002**: The `TasksProvider` MUST render a centered loading spinner if `authLoading` is true.
- **FR-003**: The `TasksProvider` MUST NOT render children and MUST return null if `authLoading` is false but `user` is null.
- **FR-004**: The `refreshTasks` function MUST include a strict guard clause that prevents execution if `!user` or `authLoading` is true.
- **FR-005**: All mutation functions (`addTask`, `addCategory`, `updateTaskStatus`, `deleteTask`) MUST include the same strict guard clause.
- **FR-006**: The initial data fetch effect MUST only trigger when a valid `user.id` is present AND `authLoading` is false.

### Key Entities

- **AuthContext.loading**: The source of truth for whether the session check is in progress.
- **AuthContext.user**: The authenticated user entity.
- **TasksProvider**: The component responsible for gating the dashboard and managing task data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Number of `401 Unauthorized` errors triggered during initial page load MUST be exactly zero.
- **SC-002**: The user MUST see a loading spinner for the duration of the `/api/auth/get-session` call.
- **SC-003**: No API calls to `/tasks` or `/categories` are initiated while `authLoading` is true or if `user` is null.
- **SC-004**: 100% of "Create Category" actions succeed immediately after the first dashboard render.