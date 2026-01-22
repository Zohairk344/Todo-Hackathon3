# Feature Specification: Chat History & Theming

**Feature Branch**: `028-chat-history-theme`
**Created**: 2026-01-22
**Status**: Draft
**Input**: User description provided in prompt.

## User Scenarios & Testing

### User Story 1 - View Chat History (Priority: P1)

As a user, I want to see my previous chat messages when I reload the dashboard, so that I can continue my conversation without losing context.

**Why this priority**: Essential for a persistent chat experience; currently users lose context on refresh.

**Independent Test**:
1. Open dashboard and send a message.
2. Refresh the page.
3. Verify the previous message and response appear in the chat window.

**Acceptance Scenarios**:

1. **Given** a user has an existing conversation, **When** they load the dashboard, **Then** the chat widget displays the history of the latest conversation.
2. **Given** a user has no history, **When** they load the dashboard, **Then** the chat widget displays an empty or welcome state.

---

### User Story 2 - Consistent Theme (Priority: P2)

As a user, I want the chat widget to match my selected application theme (Light or Dark), so that the interface looks consistent and is comfortable to use.

**Why this priority**: Visual consistency is key for user experience; currently the chat widget may clash with the selected theme.

**Independent Test**:
1. Toggle the theme to Dark Mode.
2. Verify Chat Widget background is dark gray and text is light.
3. Toggle the theme to Light Mode.
4. Verify Chat Widget background is white and text is dark.

**Acceptance Scenarios**:

1. **Given** the application is in Dark Mode, **When** I view the chat widget, **Then** it uses dark backgrounds (`bg-gray-800`, `bg-gray-700`) and light text (`text-gray-100`, `text-white`).
2. **Given** the application is in Light Mode, **When** I view the chat widget, **Then** it uses light backgrounds (`bg-white`, `bg-gray-50`) and dark text (`text-gray-800`).

---

### User Story 3 - Reliable API Connections (Priority: P1)

As a developer and user, I want the backend to reliably accept requests from the frontend and log any failures, so that the chat feature works without "API Failed" errors.

**Why this priority**: Critical for functionality; current CORS or Config issues are blocking usage.

**Independent Test**:
1. Send a chat message from `localhost:3000`.
2. Verify the response is received without a CORS error.
3. Trigger a failure (if possible) or check logs to ensure debug info is printed.

**Acceptance Scenarios**:

1. **Given** the frontend is running on `localhost:3000`, **When** it calls the backend API, **Then** the request succeeds (200 OK) without CORS blocking.
2. **Given** an API request fails, **When** I check the backend logs, **Then** I see detailed error information (Auth/DB/LLM failure) to aid debugging.

---

### Edge Cases

- **No Conversation Exists**: The GET endpoint should return an empty list or 404 handled gracefully by the frontend.
- **Theme Switch**: Theme changes should reflect immediately without reload.
- **Network Error**: Frontend should handle fetch failures gracefully (user notification).

## Requirements

### Functional Requirements

- **FR-001**: Backend MUST expose a `GET /api/{user_id}/chat` endpoint.
- **FR-002**: The GET endpoint MUST return the list of `Message` objects for the user's latest `Conversation`.
- **FR-003**: Backend MUST allow CORS requests from `http://localhost:3000`.
- **FR-004**: Frontend ChatWidget MUST use `next-themes` (or context) to detect current theme.
- **FR-005**: Frontend ChatWidget MUST apply specific styles for Dark/Light modes (Container, Text, Input, Bubbles).
- **FR-006**: Backend POST route MUST include logging/print statements to identify failure points (Auth, DB, LLM).
- **FR-007**: Backend Config MUST be verified to correctly use `GEMINI_API_KEY`.

### Technical Constraints (from User)
- **Chat History Endpoint**: `todo-hackathon3/app/api/routes/chat.py`
- **CORS Config**: `todo-hackathon3/app/main.py`
- **Frontend Component**: `frontend/components/dashboard/ChatWidget.tsx`
- **Specific Styles**:
    - Container: `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`
    - Text: `text-gray-800 dark:text-gray-100`
    - Input: `bg-gray-50 dark:bg-gray-700 text-black dark:text-white`
    - Assistant Bubble: `bg-gray-100 dark:bg-gray-700`

### Key Entities

- **Conversation**: Represents a session of chat history.
- **Message**: Individual chat entry (role, content).
- **User**: The owner of the conversation.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Chat history loads successfully (200 OK) for authenticated users.
- **SC-002**: Frontend requests from `localhost:3000` are not blocked by CORS.
- **SC-003**: Chat UI passes visual inspection for both Light and Dark modes against specified color codes.
- **SC-004**: Backend logs capture the specific cause of any 500 error in the chat route.