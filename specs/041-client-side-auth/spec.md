# Feature Specification: Cross-Domain Client-Side Authentication Fix

**Feature Branch**: `041-client-side-auth`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "**The Mission:** Resolve the critical \"Redirect Loop\" where authenticated users are repeatedly sent back to the Sign-In page despite successful login. We must refactor the application to support **Cross-Domain Client-Side Authentication**. **The Context:** * **The Architecture:** The frontend is deployed on Vercel, while the backend is hosted on Hugging Face (`hf.space`). * **The Problem:** Currently, `DashboardLayout` attempts to validate the session **server-side** (using Next.js `cookies()`). This fails because the Vercel server cannot access the HttpOnly cookies set for the Hugging Face domain. * **The Result:** The server sees no session, assumes the user is unauthenticated, and triggers a `redirect('/sign-in')`, creating an infinite loop. * **The Solution:** We must move the session validation to the **Client (Browser)**. The browser *does* hold the correct cookies for the backend domain and can successfully validate the session via a fetch request with `credentials: \"include\"`. **Key Technical Requirements:** 1. **Implement `AuthProvider` (Context API):** * Create a global React Context (`AuthContext`) that manages authentication state (`user` object and `loading` boolean). * On component mount (`useEffect`), it must fetch `/api/auth/get-session` with `credentials: \"include\"`. * **Loading State:** Render a full-screen loading spinner while validating to prevent content flashing. * **Redirect Logic:** If the API returns 401/403 or fails, automatically redirect the user to `/sign-in`. 2. **Refactor `DashboardLayout`:** * Remove all server-side logic (`async/await`, `cookies()`, `getUserSession`). * Wrap the dashboard content in the new `AuthProvider` to ensure all child components have access to the session. 3. **Update Dependent Components:** * **`UserNav`:** Must consume `useAuth()` to display the user's name and email, removing any internal fetch logic. * **`ClientChatWrapper`:** Must consume `useAuth()` to get the `userId` for the chatbot, ensuring tasks are saved to the correct user account. **Success Criteria:** * Users can access `/dashboard` immediately after sign-in without being redirected. * The Dashboard UI displays the correct user email (replacing placeholders). * The Chatbot functions correctly (no `IntegrityError`) because it receives a valid `userId` from the context."

## Clarifications

### Session 2026-02-01

- Q: What is the expected behavior when the backend session API is unreachable? → A: Redirect to /sign-in with error
- Q: How often should the client-side session be re-validated? → A: Once on initial entry
- Q: What should happen if the session is found to be expired during validation? → A: Clear state and redirect
- Q: What type of loading state should be shown during authentication? → A: Centralized "Authenticating..." screen
- Q: What level of detail should error messages provide on failure? → A: Standard error message with code

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accessing Protected Dashboard (Priority: P1)

As an authenticated user, I want to access the dashboard without being redirected to the sign-in page, so I can manage my tasks without interruption.

**Why this priority**: This is the primary fix for the critical "Redirect Loop" bug that prevents users from using the application.

**Independent Test**: Can be fully tested by signing in (via Sign-In page) and verifying navigation to `/dashboard` remains stable without redirection.

**Acceptance Scenarios**:

1. **Given** a user has successfully signed in (cookies are set for the backend domain), **When** they navigate to `/dashboard`, **Then** they are not redirected back to `/sign-in`.
2. **Given** a user is on `/dashboard`, **When** the page loads, **Then** the user's information (email and name) is correctly displayed in the navigation bar.

---

### User Story 2 - Seamless Client-Side Session Validation (Priority: P1)

As an authenticated user, I want my session to be validated in the background when I open the application, so that I have a smooth and secure experience.

**Why this priority**: Required to support cross-domain authentication where server-side cookie access is unavailable to the frontend host.

**Independent Test**: Can be tested by inspecting network logs to confirm `/api/auth/get-session` is called with `credentials: "include"` upon dashboard initialization.

**Acceptance Scenarios**:

1. **Given** the dashboard is initializing, **When** the `AuthProvider` mounts, **Then** it performs a fetch request to the session endpoint with backend credentials.
2. **Given** session validation is in progress, **When** the user is waiting, **Then** a full-screen loading spinner is displayed to prevent UI flickering.

---

### User Story 3 - Protection of Secure Routes (Priority: P2)

As a security-conscious system, I want to ensure that only users with valid sessions can access the dashboard, so that private data is protected.

**Why this priority**: Ensures that while we move validation to the client, we maintain proper access control.

**Independent Test**: Can be tested by clearing cookies and attempting to access `/dashboard`, verifying automatic redirection to `/sign-in`.

**Acceptance Scenarios**:

1. **Given** a user is not authenticated (or session expired), **When** they attempt to access any route under `/dashboard`, **Then** the system redirects them to the `/sign-in` page.

---

### Edge Cases

- **Backend Unreachable**: If the session API call fails due to network issues or backend errors, the system MUST redirect the user to the `/sign-in` page with a standard error message and reference code.
- **Session Expiry During Use**: If the session expires or is invalidated, the system MUST clear all local authentication state and immediately redirect the user to the `/sign-in` page.
- **Race Conditions**: Ensuring components like `UserNav` don't attempt to render user data before the session validation completes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a global authentication state manager to track user identity and loading status.
- **FR-002**: System MUST validate the user session from the client-side using a secure request to the backend that includes existing domain cookies. This validation MUST occur at least once upon initial entry to the protected dashboard area.
- **FR-003**: System MUST display a centralized "Authenticating..." loading screen while the authentication check is in progress to prevent content flashing.
- **FR-004**: System MUST automatically redirect users to the sign-in page if no valid session is found.
- **FR-005**: The primary dashboard layout MUST be updated to use client-side authentication checks instead of server-side cookie validation.
- **FR-006**: Navigation and profile components MUST use the global authentication state to display user details.
- **FR-007**: Interactive features (like the chatbot) MUST use the authenticated user's identity to correctly save and retrieve data.

### Key Entities

- **Authentication State**: The central store for user information and system readiness.
- **User Identity**: The profile data (email, name) associated with the current session.

### Assumptions & Dependencies

- **Assumption 1**: The backend server correctly handles cross-origin requests (CORS) and allows credentials.
- **Assumption 2**: The user's browser supports and allows HttpOnly cookies from the backend domain.
- **Dependency**: The backend API endpoint `/api/auth/get-session` remains functional and returns standard HTTP status codes (200, 401, 403).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of users with valid credentials can access the dashboard without being redirected to sign-in.
- **SC-002**: User profile information (email/name) is accurately displayed in the UI without using temporary placeholders.
- **SC-003**: All user-generated content (e.g., chatbot tasks) is correctly linked to the active user's account.
- **SC-004**: Users never see sensitive dashboard content before their session is verified.