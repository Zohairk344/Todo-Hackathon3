# Tasks: Chat History & Theming

**Input**: Design documents from `/specs/028-chat-history-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Tests are manual verification steps as per spec constraints.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup & Foundational (Shared)

**Purpose**: Fix core configuration to allow stories to function.

- [ ] T001 [P] [US3] Remove `prefix="/api/chat"` from `chat.router` include in `todo-hackathon3/app/main.py` (Fixes 404s).
- [ ] T002 [P] [US3] Verify `CORSMiddleware` in `todo-hackathon3/app/main.py` allows `http://localhost:3000`.

## Phase 2: User Story 3 - Reliable API Connections (Priority: P1)

**Goal**: Ensure backend is reachable and logs failures for debugging.

**Independent Test**: Send request from localhost:3000, check for 200 OK and logs.

### Implementation for User Story 3

- [ ] T003 [US3] Add `logger.info` or `print` statements to `chat_endpoint` in `todo-hackathon3/app/api/routes/chat.py` (Log: Start, Auth, DB Fetch, LLM Call).
- [ ] T004 [US3] Verify `GEMINI_API_KEY` usage in `chat.py` (ensure `settings.LLM_API_KEY` is used).

**Checkpoint**: Backend is now reachable and observable.

## Phase 3: User Story 1 - View Chat History (Priority: P1)

**Goal**: Restore context on page reload.

**Independent Test**: Refresh dashboard, see previous messages.

### Implementation for User Story 1

- [ ] T005 [US1] Verify `get_chat_history` logic in `todo-hackathon3/app/api/routes/chat.py` (Check `limit(10)` and reverse logic).
- [ ] T006 [US1] Ensure `frontend/components/dashboard/ChatWidget.tsx` fetches from `/api/${userId}/chat` (matches new relative route).

**Checkpoint**: Chat history persists across reloads.

## Phase 4: User Story 2 - Consistent Theme (Priority: P2)

**Goal**: Match UI to Light/Dark mode.

**Independent Test**: Toggle theme, verify colors.

### Implementation for User Story 2

- [ ] T007 [US2] Update `frontend/components/dashboard/ChatWidget.tsx` to import `useTheme` from `next-themes`.
- [ ] T008 [US2] Apply `dark:` classes to Container (`bg-white dark:bg-gray-800`), Text (`text-gray-800 dark:text-gray-100`), Input (`bg-gray-50 dark:bg-gray-700`), and Assistant Bubble (`bg-gray-100 dark:bg-gray-700`).

**Checkpoint**: Chat widget adapts to user theme.

## Phase 5: Verification

- [ ] T009 Manual Verification: Run Backend & Frontend, test full flow (Send -> Reply -> Refresh -> Switch Theme -> Check Logs).
