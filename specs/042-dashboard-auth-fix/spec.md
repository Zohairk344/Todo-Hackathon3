# Feature Specification: Fix Dashboard Authentication & Fetching

**Feature Branch**: `042-dashboard-auth-fix`
**Created**: 2026-02-02
**Status**: Draft
**Input**: User description: "Fix the '401 Unauthorized' errors when creating tasks and categories by enforcing 'credentials: include'..."

## Clarifications

### Session 2026-02-02
- Q: How should the system handle a 401 Unauthorized response during active dashboard use? → A: Redirect to `/login` immediately.
- Q: How should the Chat Widget obtain the current User ID? → A: Retrieve it from the React Context (`useAuth`) to ensure synchronization.
- Q: How should general (non-auth) API errors be surfaced to the user? → A: Use a Toast Notification (e.g., Sonner) to provide non-disruptive feedback.
- Q: How should we ensure all dashboard requests consistently use the correct auth/headers? → A: Use a centralized API client helper (e.g., `api-client.ts`) to wrap all fetch calls.
- Q: What should be the default duration for Toast Notifications? → A: 3 seconds for standard success/info messages.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Task Consistency (Priority: P1)

As a logged-in user, I want to create new tasks on the dashboard so that I can organize my work, without encountering authentication errors.

**Why this priority**: Core functionality is currently broken; users cannot effectively use the application.

**Independent Test**: Can be tested by logging in, navigating to the dashboard, and successfully adding a new task.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard, **When** they fill out the "Add Task" form and submit, **Then** the task is created successfully (200 OK) and appears in the list.
2. **Given** a logged-in user, **When** the dashboard loads, **Then** existing tasks are fetched without 401 errors.

---

### User Story 2 - Category Management (Priority: P1)

As a logged-in user, I want to create new categories for my tasks so that I can group them logically.

**Why this priority**: Essential for task organization; currently fails with 401 errors.

**Independent Test**: Can be tested by logging in and creating a new category via the category picker/creator.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they create a new category, **Then** the category is saved successfully (200 OK) and is immediately selectable.

---

### User Story 3 - Chat Integration Integrity (Priority: P2)

As a logged-in user, I want the chat widget to recognize my specific user identity so that my chat history and context are accurate.

**Why this priority**: Ensures the chat experience is personalized and secure, fixing potential ID mismatches.

**Independent Test**: Can be tested by verifying the user ID sent in chat initialization requests matches the currently logged-in user.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** the chat widget initializes, **Then** it uses the correct, live User ID for all operations.

---

### Edge Cases

- What happens when the session cookie expires while the user is on the dashboard? (System MUST redirect to `/login` immediately per FR-004).
- What happens if a network or server error (non-401) occurs during the fetch? (System MUST display a Toast Notification with a user-friendly error message).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use a **centralized API client helper** for all dashboard requests (Task List, Category Creator) to automatically include valid authentication credentials (cookies).
- **FR-002**: System MUST use the **centralized API client helper** for all Task Creation form submissions to ensure session persistence.
- **FR-003**: The Chat Widget MUST initialize using the currently authenticated user's ID obtained via **React Context (`useAuth`)**, ensuring it is always in sync with the active session.
- **FR-004**: System MUST handle 401 Unauthorized responses by redirecting the user to the `/login` page immediately.
- **FR-005**: All JSON payloads sent to the backend MUST have the correct `Content-Type: application/json` header automatically applied.

### Key Entities

- **Task**: Represents a user's todo item.
- **Category**: Represents a grouping for tasks.
- **UserSession**: The active authentication state verified via cookies.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Creating a new task returns a 200 OK status code for 100% of valid requests by logged-in users.
- **SC-002**: Creating a new category returns a 200 OK status code for 100% of valid requests.
- **SC-003**: Browser console logs show zero (0) `401 Unauthorized` errors during standard dashboard navigation and usage.
- **SC-004**: Backend logs confirm that requests to `/tasks` and `/categories` include the authentication token.
- **SC-005**: Chat initialization requests consistently map to the correct active User ID.