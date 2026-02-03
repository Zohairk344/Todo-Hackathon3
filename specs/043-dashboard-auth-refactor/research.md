# Phase 0: Research & Context

**Feature**: Secure Dashboard Data Fetching via TasksContext (`043-dashboard-auth-refactor`)

## 1. Current State Analysis

The codebase in branch `043-dashboard-auth-refactor` (derived from `042-dashboard-auth-fix`) appears to have **already partially or fully implemented** the transition to `TasksContext` for the main Dashboard components:

*   **`frontend/app/dashboard/page.tsx`**: Uses `useTasks()` hook. No direct `fetch` calls or `useState` for tasks/categories found.
*   **`frontend/components/add-task-form.tsx`**: Uses `useTasks()` hook (`addTask`).
*   **`frontend/components/category-picker.tsx`**: Uses `useTasks()` hook (`addCategory`, `categories`).
*   **`frontend/context/tasks-context.tsx`**: Uses `todoService`.
*   **`frontend/services/todo-service.ts`**: Uses `apiRequest` from `@/lib/api-client`.
*   **`frontend/lib/api-client.ts`**: Uses `fetch` with `credentials: "include"`, which is the correct secure pattern.

### Discrepancies with User Prompt
The user prompt states that `page.tsx` and modals contain "legacy" code with raw `fetch` calls. The file contents do not reflect this. This suggests either:
1.  The user is observing behavior from a deployment of an older branch.
2.  The `401` errors are caused by something else (e.g., backend CORS configuration, or `api.ts` usage elsewhere).
3.  The "legacy code" refers to `frontend/lib/api.ts` which exists alongside `api-client.ts`.

## 2. Identified "Legacy" Artifacts

A targeted search revealed:
*   **`frontend/lib/api.ts`**: Contains a raw `fetch` wrapper (likely legacy).
*   **`frontend/components/dashboard/chat-widget.tsx`**: Uses raw `fetch` (Out of Scope per clarification).
*   **`frontend/components/dashboard/user-nav.tsx`**: Uses raw `fetch` for sign-out (likely valid, but check `api-client` usage).

## 3. Decision Log

### Decision 1: Strict Context Enforcement
*   **Decision**: We will proceed by strictly verifying and "re-asserting" the `TasksContext` pattern.
*   **Rationale**: Even if the code looks correct, the reported `401`s imply a failure. We will ensure `todoService` -> `api-client` chain is unbroken.
*   **Action**:
    *   Verify `frontend/lib/api.ts` is NOT used by Dashboard components.
    *   Ensure `frontend/lib/api-client.ts` is the ONLY data fetcher for the dashboard.

### Decision 2: Refactor Scope
*   **Decision**: Limited to Dashboard Page, Add Task Modal, Add Category Modal (inside Picker), and Task List.
*   **Exclusion**: `ChatWidget` and `UserNav` are out of scope for this specific refactor (per clarification).

### Decision 3: Update Logic
*   **Decision**: `TaskList`'s `handleSaveEdit` is currently a placeholder (just toasts). We will implement the actual update logic using `TasksContext`.
*   **Rationale**: To fully replace legacy logic, editing must also work via the secure context.

## 4. Architecture Plan

1.  **Data Model**: Use `Task` and `Category` interfaces from `todoService`.
2.  **Context**: `TasksContext` is the Single Source of Truth.
3.  **API Client**: `api-client.ts` is the Secure Gateway (must verify `credentials: "include"`).

## 5. Unknowns Resolved
*   **Refactor Scope**: Dashboard + Modals only (Resolved).
*   **State Sync**: Auto-refresh after write (Resolved).
*   **Error Handling**: Toast notifications (Resolved).
