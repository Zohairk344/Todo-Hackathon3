# Feature Specification: Dashboard Session Integration

**Feature Branch**: `040-fix-dashboard-session`  
**Created**: Sunday, February 1, 2026  
**Status**: Draft  
**Input**: User description: "**The Mission:** Fix the IntegrityError in the Chatbot and the incorrect user information in the Dashboard UI by connecting the Dashboard Layout to the actual backend session. **The Context:** * **Current State:** The DashboardLayout (frontend/app/dashboard/layout.tsx) is currently using a hardcoded mock user object (id: \"current-user\", email: \"user@example.com\"). * **The Problem:** 1. Chatbot Crash: When the chatbot tool tries to add a task, it uses the hardcoded ID \"current-user\". The PostgreSQL database rejects this with a ForeignKeyViolationError because that ID does not exist in the User table. 2. UI Data: The user navigation bar displays placeholder data instead of the logged-in user's actual name and email. 3. Security: The dashboard route currently renders even if the user is not authenticated (though API calls might fail later). **Key Technical Requirements:** 1. Server-Side Session Fetching: * The DashboardLayout must use next/headers to retrieve the session_token cookie. * It must make a server-side fetch request to the backend endpoint /api/auth/get-session using that cookie. 2. Data Propagation: * Success: If the session is valid, extract the real user object from the response. Pass user.id to <ClientChatWrapper /> (fixing the database error) and user.name/user.email to <UserNav /> (fixing the UI). * Failure: If the session is missing or invalid, immediately redirect the user to /sign-in. 3. Environment Handling: * Ensure the fetch call uses the correct NEXT_PUBLIC_API_URL. **Success Criteria:** * The Dashboard UI displays the logged-in user's real email and name. * The Chatbot successfully adds tasks to the database without throwing an IntegrityError (because it is now using a valid UUID). * Unauthenticated users are redirected away from /dashboard. also run npm run build to make sure the frontend is ready to be pushed to github"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authenticated Dashboard Access (Priority: P1)

As a logged-in user, when I access the dashboard, I expect to see my actual account information (name and email) in the navigation area so that I know I am correctly logged into my own account.

**Why this priority**: Essential for user trust and basic UI correctness. It verifies that the frontend is correctly communicating with the backend session management.

**Independent Test**: Can be tested by logging in with a specific account and verifying that the displayed name and email match that account's profile data.

**Acceptance Scenarios**:

1. **Given** a user is logged in with email "john@example.com", **When** they navigate to the dashboard, **Then** the navigation bar displays "john@example.com".
2. **Given** a user is logged in with name "John Doe", **When** they navigate to the dashboard, **Then** the user navigation component displays "John Doe".

---


### User Story 2 - Chatbot Task Creation (Priority: P1)

As an authenticated user, when I ask the chatbot to create a task, I expect the task to be successfully saved to my account without any technical errors.

**Why this priority**: Critical fix for a system crash. Currently, the chatbot fails because it uses a hardcoded invalid ID. This story restores core functionality.

**Independent Test**: Can be tested by asking the chatbot "Add a task to buy groceries" and verifying the task appears in the task list and no database errors are reported.

**Acceptance Scenarios**:

1. **Given** an authenticated user is on the dashboard, **When** they use the chatbot to add a task, **Then** the task is created with the user's actual database ID.
2. **Given** a valid user session, **When** a task is created via the chatbot, **Then** no "IntegrityError" or "ForeignKeyViolationError" is thrown by the backend.

---


### User Story 3 - Unauthenticated Redirect (Priority: P2)

As a non-logged-in user, if I attempt to access a dashboard URL directly, I expect to be redirected to the sign-in page to protect my data and ensure security.

**Why this priority**: Basic security requirement to prevent unauthorized access to dashboard views.

**Independent Test**: Can be tested by clearing cookies/session and attempting to navigate directly to `/dashboard`.

**Acceptance Scenarios**:

1. **Given** no active session (no session_token cookie), **When** a user navigates to `/dashboard`, **Then** the system redirects them to `/sign-in`.
2. **Given** an expired or invalid session token, **When** the dashboard layout attempts to fetch the session, **Then** the user is redirected to `/sign-in`.

---


### Session 2026-02-01


- Q: When redirecting unauthenticated users to `/sign-in`, should the system include a `callbackUrl`? → A: Include `callbackUrl=/dashboard` in the redirect to `/sign-in`.


- Q: How should the system handle a backend timeout or fetch error during session verification? → A: Redirect to `/sign-in` with an error parameter (e.g., `error=system_unavailable`).





---





### Edge Cases





- **What happens when the backend session endpoint is down?** The system will catch the fetch failure and redirect the user to `/sign-in?error=system_unavailable`.


- **How does the system handle a session that exists but belongs to a deleted user?** The backend endpoint `/api/auth/get-session` should return a failure, which should trigger a redirect to `/sign-in`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Dashboard Layout MUST retrieve the `session_token` cookie from request headers.
- **FR-002**: The system MUST verify the session by calling the backend `/api/auth/get-session` endpoint server-side.
- **FR-003**: The system MUST extract the user's unique identifier (UUID), name, and email from a successful session response.
- **FR-004**: The authenticated user's ID MUST be provided to the Chatbot component to ensure database integrity during task creation.
- **FR-005**: The authenticated user's name and email MUST be displayed in the User Navigation component.
- **FR-006**: The system MUST redirect users to the sign-in page if no valid session is found, including a `callbackUrl=/dashboard` parameter to return them to their destination after authentication.
- **FR-007**: The frontend MUST successfully build (`npm run build`) to ensure all type-checking and production optimizations are valid.

### Key Entities *(include if feature involves data)*

- **User**: Represents the authenticated person. Key attributes: ID (UUID), Email, Name.
- **Session**: Represents the active connection between the user's browser and the backend, identified by a `session_token`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated users see their correct email and name in the Dashboard UI.
- **SC-002**: 0% "IntegrityError" or "ForeignKeyViolationError" occurrences when authenticated users create tasks via the Chatbot.
- **SC-003**: 100% of unauthenticated requests to `/dashboard` are redirected to `/sign-in`.
- **SC-004**: Frontend build process completes with exit code 0.