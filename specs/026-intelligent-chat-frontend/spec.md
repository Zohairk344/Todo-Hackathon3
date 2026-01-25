# Feature Specification: Intelligent Chat Frontend

**Feature Branch**: `026-intelligent-chat-frontend`  
**Created**: 2026-01-20  
**Status**: Draft  
**Input**: User description: "Update `speckit.md` to define **Phase 3.4: Intelligent Chat Frontend**. **Context:** The backend Agent is ready. We now need a robust, interactive Chat Interface in the Next.js Dashboard. This interface must not only display messages but also **synchronize** with the application state (e.g., refreshing the task list when the AI modifies data). **Requirement 1: The Chat Component (`components/dashboard/ChatWidget.tsx`)** * **Architecture:** A self-contained, floating chat widget located in the bottom-right corner of the screen. * **State Management:** * `isOpen` (boolean): Toggles the chat window visibility. * `messages` (Array): Stores `{ role: 'user' | 'assistant', content: string }`. * `isLoading` (boolean): Disables input and shows a "Thinking..." indicator during API calls. * **Props:** * `userId`: string (Required for API calls). * `onTasksChange`: function (Crucial callback to trigger a refresh of the parent Task List). **Requirement 2: Interaction Logic** * **Sending Messages:** 1. User types input -> Hit Enter/Send. 2. **Optimistic UI:** Immediately append User message to state and clear input. 3. **API Call:** `POST` to `/api/{userId}/chat`. 4. **Response Handling:** * Append `response.data.response` (Assistant message) to state. * **Auto-Scroll:** The chat container must automatically scroll to the bottom after every new message. 5. **Data Synchronization:** If the API response implies data modification (or simply on every successful turn), invoke `onTasksChange()` to ensure the user sees the new tasks immediately. **Requirement 3: Dashboard Integration (`app/dashboard/page.tsx`)** * **Action:** Import `ChatWidget`. * **Placement:** Render it alongside the `TaskList`. * **Wiring:** Pass the `fetchTasks` function (or the method used to reload data) into the `onTasksChange` prop of the widget. **Verification Criteria:** 1. **Visual:** Chat bubbles must be distinct (e.g., Blue for User, Gray for AI). 2. **Functional:** Typing "Add a task to buy milk" must: * Show the message. * Show a loading state. * Show the AI's confirmation. * **Automatically** make "Buy Milk" appear in the Task List background *without* a page reload. Update the specification to include these frontend requirements."

## Clarifications

### Session 2026-01-20
- Q: Should the widget load existing chat history on mount? → A: Fetch on Mount (Load last 10 messages from API).
- Q: Which icon library for toggle button? → A: **lucide-react** (`MessageCircle`, `X`).
- Q: Mobile behavior for widget? → A: **Full Screen Overlay** on screens < 640px.
- Q: Specific Tailwind colors for bubbles? → A: **Modern Blue/Gray** (User: `bg-blue-600`, AI: `bg-gray-100`).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactive Chat Widget (Priority: P1)

As a User, I want a persistent chat interface in the dashboard so that I can interact with the AI assistant without leaving the task view.

**Why this priority**: High. This is the primary interface for the Phase 3 functionality.

**Independent Test**: Can be tested by opening the widget, sending a message, and verifying the response appears.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I see the chat icon in the bottom-right, **Then** I can click it to toggle the chat window open/closed.
2. **Given** the chat window is open, **When** I type a message and press Enter, **Then** my message appears immediately (Optimistic UI) and the input is cleared.
3. **Given** I have sent a message, **When** the AI is processing, **Then** a "Thinking..." or loading indicator is visible.
4. **Given** the AI responds, **When** the response arrives, **Then** it appears in the chat history and the view auto-scrolls to the bottom.

---

### User Story 2 - Real-time Data Synchronization (Priority: P1)

As a User, I want the task list to update automatically when the AI modifies my tasks so that I don't have to manually refresh the page.

**Why this priority**: High. Prevents stale data and reinforces the feeling of an intelligent, integrated agent.

**Independent Test**: Send a command like "Add task 'Test Sync'", verify the API response, and check if the task list component re-renders with the new task.

**Acceptance Scenarios**:

1. **Given** the chat widget and task list are visible, **When** I ask the AI to "Add a task to buy milk", **Then** "Buy Milk" appears in the Task List immediately after the AI confirms the action.
2. **Given** I ask the AI to "Complete the 'Buy Milk' task", **When** the AI confirms, **Then** the task's status updates in the list without a page reload.

### Edge Cases

- **API Failure**: If the chat API fails (500/403), the UI should display a generic error message ("Something went wrong") and re-enable the input.
- **Empty Input**: The send button should be disabled or the action blocked if the input is empty or whitespace only.
- **Network Latency**: The "Thinking..." indicator must persist until the response is received or times out.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a `ChatWidget` component that floats in the bottom-right corner of the dashboard.
- **FR-002**: The widget MUST maintain internal state for `isOpen` (visibility), `messages` (history), and `isLoading` (status).
- **FR-003**: The widget MUST accept a `userId` prop for API authentication/routing.
- **FR-004**: The widget MUST accept an `onTasksChange` callback prop.
- **FR-005**: When a user sends a message, the system MUST display it immediately (Optimistic UI) and disable the input field.
- **FR-006**: The system MUST send a `POST` request to `/api/{userId}/chat` with the user's message.
- **FR-007**: Upon receiving a successful response from the Chat API, the system MUST display the AI's response and invoke the `onTasksChange` callback.
- **FR-008**: The chat history view MUST automatically scroll to the newest message when updated.
- **FR-009**: The widget MUST fetch and display existing conversation history (last 10 messages) from the backend when first opened.
- **FR-010**: The widget MUST use **lucide-react** icons for the toggle and interface elements.
- **FR-011**: The system MUST use a full-screen overlay for the chat interface on mobile devices (screens < 640px).
- **FR-012**: Chat bubbles MUST use distinct Tailwind colors: User (`bg-blue-600 text-white`), AI (`bg-gray-100 text-gray-900`).

### Key Entities *(include if feature involves data)*

- **ChatMessage**:
    - `role`: 'user' | 'assistant'
    - `content`: string

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Clicking the toggle button opens/closes the chat widget in < 100ms.
- **SC-002**: Sending a message updates the UI (Optimistic) in < 50ms.
- **SC-003**: Task list refreshes automatically within 1 second of the AI's response confirming a data change.