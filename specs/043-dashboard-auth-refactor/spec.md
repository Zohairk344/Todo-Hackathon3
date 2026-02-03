# Feature Specification: Secure Dashboard Data Fetching via TasksContext

**Feature Branch**: `043-dashboard-auth-refactor`  
**Created**: 2026-02-02  
**Status**: Draft  
**Input**: User description: "**The Mission:** Eliminate the persistent `401 Unauthorized` errors by refactoring the Dashboard UI components to use the secure `TasksContext` instead of their own insecure `fetch` calls. **The Context:** * **Current State:** The `TasksProvider` is set up to handle secure data fetching. However, the logs show that requests to `/tasks` and `/categories` are still missing the session cookie. * **The Root Cause:** The UI components (specifically `frontend/app/dashboard/page.tsx` and likely the Dialog components for creating tasks/categories) contain \"legacy\" code. They are making their own `fetch()` calls that lack `credentials: \"include\"`, causing the backend to reject them. * **The Fix:** We must strip all data-fetching logic from the UI components and replace it with the `useTasks()` hook. This ensures all operations go through our secure `api-client.ts` wrapper. **Key Technical Requirements:** 1. **Refactor `frontend/app/dashboard/page.tsx`:** * Remove all `useState` for tasks/categories. * Remove all `useEffect` blocks that fetch data. * Remove all `fetch` calls for creating tasks/categories. * **Import:** `useTasks` from `frontend/context/tasks-context.tsx`. * **Implementation:** Render the dashboard view using the data and functions provided by the context (`tasks`, `categories`, `addTask`, `addCategory`, `isLoading`). 2. **Ensure Component Compatibility:** * Since I cannot see the specific filenames for your "Add Task" or "Add Category" modals, we will refactor the *parent* page (`page.tsx`) to pass the secure handlers (`addTask`, `addCategory`) down to them, or ensure the page manages the state interactions directly. **Success Criteria:** * The Dashboard Page code is clean and contains *no* `fetch` calls. * The logs show `200 OK` for `/tasks` and `/categories` (indicating cookies are present). * Creating a category updates the UI immediately (handled by the Context)." 

## Clarifications

### Session 2026-02-02
- Q: Should this refactor be strictly limited to the Dashboard page and its immediate modals, or should it include any other components? → A: Strictly Dashboard page and its immediate modals (e.g., Add Task/Category).
- Q: How should the UI respond after a successful addTask or addCategory call from the context? → A: Automatically re-fetch/refresh data in the context to sync with server.
- Q: What is the preferred user experience when a session expiration is detected while on the Dashboard? → A: Automatically redirect the user to the Login page.
- Q: How should the dashboard behave when a user has zero tasks or categories? → A: Display a simple inline message: "No tasks found. Create your first one!"
- Q: How should the system notify the user if an "Add Task" or "Add Category" action fails? → A: Show a toast/notification with the error message.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Viewing Dashboard Data (Priority: P1)

As a logged-in user, I want to see my tasks and categories immediately upon loading the dashboard without encountering authentication errors.

**Why this priority**: This is the core functionality of the dashboard. If the user cannot see their data, the application is non-functional for them.

**Independent Test**: Can be tested by navigating to `/dashboard` after logging in. Success is defined by the appearance of tasks and categories in the UI and a `200 OK` status for the underlying API requests.

**Acceptance Scenarios**:

1. **Given** a user is logged in, **When** they navigate to the Dashboard, **Then** they should see their list of tasks and categories.
2. **Given** the dashboard is loading, **When** the underlying data is fetched, **Then** the request MUST include session credentials to avoid `401` errors.

---


### User Story 2 - Adding a New Category (Priority: P2)

As a user, I want to add a new category and see it reflected in my dashboard immediately.

**Why this priority**: Adding categories is a primary action. Ensuring the UI updates immediately via the centralized context provides a polished user experience.

**Independent Test**: Can be tested by using the "Add Category" functionality. Success is defined by the new category appearing in the selection list or dashboard without a manual page refresh.

**Acceptance Scenarios**:

1. **Given** the "Add Category" form is open, **When** the user submits a valid category name, **Then** the category should be saved and the UI should update immediately to show the new category.

---


### User Story 3 - Adding a New Task (Priority: P2)

As a user, I want to add a new task and see it appear in my task list.

**Why this priority**: Core productivity feature.

**Independent Test**: Can be tested by adding a task through the dashboard UI. Success is the task appearing in the task list.

**Acceptance Scenarios**:

1. **Given** the "Add Task" form is open, **When** the user submits valid task details, **Then** the task should be saved and appended to the visible task list.

---


### Edge Cases

- **Session Expiration**: If the session expires, the user is automatically redirected to the Login page.
- **Empty State**: Displays an inline message: "No tasks found. Create your first one!" if zero items exist.
- **Network Failure**: Displays a toast notification with an error message if the API is unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Dashboard MUST display tasks and categories sourced exclusively from `TasksContext`.
- **FR-002**: UI components within the Dashboard scope (page and modals) MUST NOT perform direct `fetch` calls to `/tasks` or `/categories`.
- **FR-003**: All data modification actions (Add Task, Add Category) within the Dashboard scope MUST use handlers provided by `TasksContext` (`addTask`, `addCategory`).
- **FR-004**: The `DashboardPage` MUST remove all local `useState` and `useEffect` hooks related to manual data fetching.
- **FR-005**: All API requests initiated by the context MUST include session credentials (cookies).
- **FR-006**: The refactor scope is restricted to the Dashboard page and its associated "Add Task" and "Add Category" modals.
- **FR-007**: The system MUST automatically trigger a data refresh in the `TasksContext` after a successful `addTask` or `addCategory` operation to ensure UI consistency.
- **FR-008**: The system MUST redirect the user to the Login page if an API request returns a `401 Unauthorized` status (after refactoring to secure calls).
- **FR-009**: The system MUST provide visual feedback (e.g., toast notification) if an "Add Task" or "Add Category" operation fails.

### Key Entities *(include if feature involves data)*

- **Task**: Represents a todo item with attributes like title, status, and category association.
- **Category**: Represents a grouping for tasks, used for organization and filtering.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dashboard API requests for tasks and categories return `200 OK` status 100% of the time for authenticated users.
- **SC-002**: The `frontend/app/dashboard/page.tsx` file contains zero instances of the `fetch()` keyword.
- **SC-003**: UI state updates (e.g., new category appearing) occur automatically after a successful API response without manual page refresh.
- **SC-004**: Code complexity in `page.tsx` is reduced by removing redundant state management and side effects.