# Feature Specification: Debugging, History & Theming

**Feature Branch**: `027-fix-chat-issues`  
**Created**: 2026-01-20  
**Status**: Draft  
**Input**: User description: "Update `speckit.md` to define **Phase 4: Debugging, History & Theming**. **Context:** The user is encountering "Failed to fetch history" (missing GET endpoint), "API request failed" (likely CORS or Config), and wants the Chat UI to match the selected Theme (Dark/Light). **Requirement 1: Chat History Endpoint (`backend/app/api/routes/chat.py`)** * **New Route:** `GET /api/{user_id}/chat` * **Logic:** 1. Fetch the *latest* `Conversation` for the user. 2. Return the list of `Message` objects associated with it. 3. Schema: Return `List[Message]` (or a wrapper dict). **Requirement 2: CORS Configuration (`backend/app/main.py`)** * **Action:** Ensure `CORSMiddleware` is correctly added. * **Origins:** Allow `["http://localhost:3000"]` (and potentially others) to prevent browser blocking. **Requirement 3: Theme Integration (`frontend/components/dashboard/ChatWidget.tsx`)** * **Library:** Use `useTheme` from `next-themes` (or the existing theme context). * **Styles:** * **Container:** `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`. * **Text:** `text-gray-800 dark:text-gray-100`. * **Input:** `bg-gray-50 dark:bg-gray-700 text-black dark:text-white`. * **Assistant Bubble:** `bg-gray-100 dark:bg-gray-700`. **Requirement 4: Debugging the "API Failed" Error** * **Action:** Verify the Backend Config uses the `GEMINI_API_KEY` correctly via the OpenAI Compatibility layer. * **Log:** Add print statements in the `POST` route to catch *where* it fails (Auth? DB? LLM Call?). Update the specification to include these critical fixes."

## Clarifications

### Session 2026-01-20
- Q: Response schema for history? → A: **Strict Schema**: `List[MessageRead]` (role, content, created_at).
- Q: History message limit? → A: **Last 50**: Return the most recent 50 messages.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Chat History Retrieval (Priority: P1)

As a User, I want to see my previous chat messages when I open the widget so that I can continue my conversation seamlessly.

**Why this priority**: High. Prevents the chat from feeling "amnesic" every time it opens.

**Independent Test**: Can be tested by making a GET request to `/api/{user_id}/chat` and verifying it returns a JSON list of messages.

**Acceptance Scenarios**:

1. **Given** a user with existing conversation history, **When** the chat widget loads, **Then** the previous messages MUST be fetched and displayed.
2. **Given** a user with no history, **When** the chat widget loads, **Then** an empty list MUST be returned without error.

---

### User Story 2 - Functional API Connection (Priority: P1)

As a Developer, I want to ensure the API requests succeed without CORS or Configuration errors so that the feature is usable.

**Why this priority**: Critical. The feature is currently broken ("API request failed").

**Independent Test**: Verify that the browser console shows no CORS errors and the backend logs show successful 200 OK responses for chat endpoints.

**Acceptance Scenarios**:

1. **Given** the frontend is running on localhost:3000, **When** it calls the backend on a different port, **Then** the browser MUST NOT block the request due to CORS.
2. **Given** valid credentials, **When** the chat endpoint is called, **Then** the backend MUST successfully connect to the LLM provider (Gemini/Groq) and return a response.

---

### User Story 3 - Visual Consistency (Priority: P2)

As a User, I want the chat widget to match my selected theme (Dark/Light) so that it looks like an integrated part of the application.

**Why this priority**: Medium. UX consistency.

**Independent Test**: Toggle the theme switcher and verify the chat widget colors update accordingly.

**Acceptance Scenarios**:

1. **Given** the application is in Dark Mode, **When** I open the chat widget, **Then** the background MUST be dark gray (`bg-gray-800`) and text MUST be light (`text-gray-100`).
    Then the background MUST be white and text dark.

### Edge Cases

- **Invalid Token**: If the `user_id` in the URL doesn't match the token, return 403 Forbidden.
- **LLM Down**: If the LLM provider is unreachable, return a 503 Service Unavailable with a clear error message.
- **Empty History**: If no conversation exists, return an empty list `[]` instead of 404.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST expose a `GET /api/{user_id}/chat` endpoint that returns the most recent 50 messages from the user's most recent conversation as `List[MessageRead]`.
- **FR-002**: Backend MUST invoke `CORSMiddleware` with `allow_origins` configured to include at least `http://localhost:3000`.
- **FR-003**: Chat Widget MUST use `next-themes` (or equivalent) to detect the current theme and apply conditional Tailwind classes for Dark Mode.
- **FR-004**: Backend `chat` endpoint MUST include detailed logging (print/logger) for debugging failures in Authentication, Database access, or LLM calls.
- **FR-005**: Backend MUST correctly map `GEMINI_API_KEY` to the OpenAI client configuration when the provider is set to `gemini`.

### Key Entities *(include if feature involves data)*

- **Message**:
    - Returned as a list in the GET endpoint.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: GET request to `/api/{user_id}/chat` returns 200 OK with valid JSON.
- **SC-002**: Chat widget successfully sends and receives messages without network errors in the browser console.
- **SC-003**: Chat widget UI colors invert correctly when toggling between Light and Dark modes.