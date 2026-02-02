# Implementation Plan - Fix Dashboard Authentication & Fetching

**Feature**: Fix Dashboard Auth (401 Errors)
**Status**: Planned
**Feature Branch**: `042-dashboard-auth-fix`
**Author**: Spec Agent
**Date**: 2026-02-02

## I. Technical Context

### Architecture Overview
*   **Frontend**: Next.js App Router.
*   **Auth**: Better-Auth (Cookie-based).
*   **Problem**: Dashboard components make raw `fetch` calls without `credentials: "include"`, causing the backend to reject them as unauthenticated (401).
*   **Solution**: Introduce a **Service Layer** with a **Centralized API Client** that enforces credential inclusion and standardized headers, managed via **React Context**.

### Key Dependencies
*   `fetch` (Native API)
*   `useAuth` (Existing Context)
*   `TasksContext` (New Context)
*   `Toaster` / `Sonner` (UI Feedback)

### Unknowns & Risks
*   **Risk**: If `TasksProvider` is placed too high in the tree, it might trigger unnecessary re-renders.
    *   *Mitigation*: Wrap only the `/dashboard` layout.
*   **Risk**: Existing components might be tightly coupled to the old fetch logic.
    *   *Mitigation*: Refactor incrementally, replacing logic in `task-view.tsx` (or equivalent) with context hooks.

## II. Constitution Check

| Principle | Status | Notes |
|:---|:---:|:---|
| **Tech Stack** | ✅ | Uses Next.js, standard Fetch, React Context. |
| **Ironclad DB** | ✅ | No DB changes. |
| **Auth Compliance** | ✅ | Enforcing cookie transmission (`credentials: include`). |
| **Separation** | ✅ | Decoupling API logic from UI components. |

## III. Phase 1: Foundation (API & Services)

### Step 1: Centralized API Client
*   **Action**: Create `frontend/lib/api-client.ts`.
*   **Details**:
    *   Export a wrapper function (e.g., `apiClient`).
    *   Config: `credentials: "include"`, `headers: { "Content-Type": "application/json" }`.
    *   Interceptor: Catch 401s -> Redirect to `/login`.

### Step 2: Todo Service
*   **Action**: Create `frontend/services/todo-service.ts`.
*   **Details**:
    *   Implement `fetchTasks()`, `createTask(dto)`, `fetchCategories()`, `createCategory(dto)`.
    *   Use `apiClient` for all calls.

## IV. Phase 2: State Management

### Step 3: Tasks Context
*   **Action**: Create `frontend/context/tasks-context.tsx`.
*   **Details**:
    *   Define `TasksContext` and `TasksProvider`.
    *   State: `tasks`, `categories`, `isLoading`, `error`.
    *   Effects: Fetch data on mount (if user is logged in).
    *   Expose methods: `addTask`, `addCategory`.

## V. Phase 3: UI Refactor & Integration

### Step 4: Wrap Dashboard Layout
*   **Action**: Update `frontend/app/dashboard/layout.tsx`.
*   **Details**: Import `TasksProvider` and wrap the `children`.

### Step 5: Refactor Task List/View
*   **Action**: Update `frontend/components/dashboard/task-view.tsx` (or equivalent).
*   **Details**:
    *   Remove local `useEffect` fetches.
    *   Replace with `useTasks()` hook.
    *   Update "Add Task" form to call `addTask` from context.

### Step 6: Refactor Category Picker
*   **Action**: Update `frontend/components/category-picker.tsx`.
*   **Details**:
    *   Use `useTasks()` to get `categories`.
    *   Use `addCategory` from context for creation.

### Step 7: Chat Widget Auth
*   **Action**: Update `frontend/components/dashboard/client-chat-wrapper.tsx`.
*   **Details**:
    *   Get `userId` from `useAuth` hook.
    *   Pass strictly to `ChatWidget` props.

## VI. Verification Plan

### Automated Tests
*   Run existing frontend tests (if any).
*   New tests:
    *   Unit test for `api-client` (mocking fetch).
    *   Integration test for `TasksContext`.

### Manual Verification (Quickstart)
1.  Login -> Dashboard.
2.  Verify no 401s in Console.
3.  Create Task -> Success.
4.  Create Category -> Success.
5.  Check Chat Widget initialization.