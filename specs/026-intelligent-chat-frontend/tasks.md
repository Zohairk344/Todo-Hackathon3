# Tasks: Intelligent Chat Frontend

**Feature**: Intelligent Chat Frontend
**Status**: Pending
**Spec**: [specs/026-intelligent-chat-frontend/spec.md](/specs/026-intelligent-chat-frontend/spec.md)

## Phase 0: Backend Prerequisite
**Goal**: Enable history retrieval for the frontend.

- [X] T000 Implement `GET /api/{user_id}/chat` in `todo-hackathon3/app/api/routes/chat.py` to return the last 10 messages.

## Phase 1: Setup
**Goal**: Prepare the component shell and dependencies.

- [X] T001 Install `lucide-react` (if not already present) and verify `frontend/components/dashboard/ChatWidget.tsx` location.

## Phase 2: Component Shell & UI
**Goal**: [US1] Build the visual container and basic interactions.
**Test**: Widget renders, toggles visibility, and is responsive.

- [X] T002 [US1] Define `ChatWidget` component shell in `frontend/components/dashboard/ChatWidget.tsx` with `isOpen` state, toggle button (MessageCircle/X icons), and responsive layout (fixed/bottom-right vs full-screen mobile).
- [X] T003 [US1] Implement message list UI in `frontend/components/dashboard/ChatWidget.tsx` with user/assistant bubbles styled using Tailwind (blue/gray) and `whitespace-pre-wrap`.

## Phase 3: Core Logic & Integration
**Goal**: [US1] [US2] Connect to the API and handle state updates.
**Test**: Sending a message triggers API call, displays optimistic UI, shows loading state, and updates task list on success.

- [X] T004 [US1] Implement state management in `frontend/components/dashboard/ChatWidget.tsx` (`messages`, `isLoading`, `input`), including fetching initial history on mount (depends on T000).
- [X] T005 [US1] Implement `handleSend` logic in `frontend/components/dashboard/ChatWidget.tsx`: Optimistic update -> POST `/api/{userId}/chat` -> Append response -> Auto-scroll.
- [X] T006 [US2] Integrate `onTasksChange` callback in `frontend/components/dashboard/ChatWidget.tsx` to be called after successful API response.
- [X] T007 [US1] Integrate `ChatWidget` into `frontend/app/dashboard/page.tsx`, passing `userId` and the task refresh function.

## Phase 4: Verification & Polish
**Goal**: Ensure quality and fix edge cases.
**Test**: Manual verification of UI flows.

- [X] T008 [US1] Implement auto-scroll logic using `useRef` and `useEffect` in `frontend/components/dashboard/ChatWidget.tsx`.
- [X] T009 [US1] Handle API errors gracefully in `frontend/components/dashboard/ChatWidget.tsx` (display generic error message).
- [X] T010 Run linters/formatters on `frontend/components/dashboard/ChatWidget.tsx` and `frontend/app/dashboard/page.tsx`.

## Dependencies
1. T001 (Setup) -> T002 (Shell)
2. T002 -> T003 (UI) -> T004 (State) -> T005 (Logic)
3. T005 -> T006 (Sync) -> T007 (Integration)
4. T005 -> T008 (Scroll), T009 (Error) -> T010 (Polish)

## Parallel Execution
- T002 and T003 can be built iteratively.
- T007 can be done once T002 is minimally viable.

## Implementation Strategy
- **MVP**: Shell -> Static Message List -> API Connection.
- **Verification**: User testing via dashboard.
