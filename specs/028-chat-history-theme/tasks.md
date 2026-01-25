# Tasks: Chat History & Theming

**Input**: Design documents from `/specs/028-chat-history-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Manual verification via `tests/sanity_chat.py` and `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup & Foundational (Verification Protocol)

**Purpose**: Establish verification tools and fix core configuration to allow stories to function.

- [x] T001 [P] Create verification script `todo-hackathon3/tests/sanity_chat.py` to test GET/POST endpoints
- [x] T002 [US3] Fix `todo-hackathon3/app/main.py` to explicitly allow `http://localhost:3000` in `CORSMiddleware`

## Phase 2: User Story 3 - Reliable API Connections (Priority: P1)

**Goal**: Ensure backend is reachable and logs failures for debugging.

**Independent Test**: Run `python tests/sanity_chat.py` and verify detailed logs in console.

### Implementation for User Story 3

- [x] T003 [US3] Add `logging` import and logger setup to `todo-hackathon3/app/api/routes/chat.py`
- [x] T004 [US3] Wrap `chat_endpoint` logic in `try/except` block with `logger.error(traceback.format_exc())` in `todo-hackathon3/app/api/routes/chat.py`
- [x] T005 [US3] Verify `GEMINI_API_KEY` usage matches `settings.LLM_API_KEY` in `todo-hackathon3/app/api/routes/chat.py`

**Checkpoint**: Backend is now reachable and observable. Run `tests/sanity_chat.py`.

## Phase 3: User Story 1 - View Chat History (Priority: P1)

**Goal**: Restore context on page reload.

**Independent Test**: Refresh dashboard, see previous messages.

### Implementation for User Story 1

- [x] T006 [US1] Implement `GET /api/{user_id}/chat` endpoint in `todo-hackathon3/app/api/routes/chat.py` (Query `Conversation` + `Message`)
- [x] T007 [US1] Update `frontend/components/dashboard/ChatWidget.tsx` to add `useEffect` hook that fetches history on mount
- [x] T008 [US1] Update `frontend/components/dashboard/ChatWidget.tsx` to set `messages` state from API response

**Checkpoint**: Chat history persists across reloads. Run `tests/sanity_chat.py` to test GET endpoint.

## Phase 4: User Story 2 - Consistent Theme (Priority: P2)

**Goal**: Match UI to Light/Dark mode.

**Independent Test**: Toggle theme, verify colors.

### Implementation for User Story 2

- [x] T009 [US2] Import `useTheme` from `next-themes` in `frontend/components/dashboard/ChatWidget.tsx`
- [x] T010 [US2] Apply `dark:` classes to Container (`bg-white dark:bg-gray-800`), Text, and Input in `frontend/components/dashboard/ChatWidget.tsx`
- [x] T011 [US2] Apply `dark:` classes to Assistant Bubble (`bg-gray-100 dark:bg-gray-700`) in `frontend/components/dashboard/ChatWidget.tsx`

**Checkpoint**: Chat widget adapts to user theme.

## Phase 5: Polish & Verification

**Purpose**: Final clean-up and full system test.

- [ ] T012 Manual Verification: Run Backend & Frontend, test full flow per `specs/028-chat-history-theme/quickstart.md`
- [ ] T013 Check for any leftover `print` statements and replace with `logger` if found

## Dependencies & Execution Order

1. **Setup**: T001, T002 (Blocks all)
2. **US3 (Reliability)**: T003-T005 (Blocks US1)
3. **US1 (History)**: T006-T008
4. **US2 (Theme)**: T009-T011 (Independent of Backend tasks, depends on Frontend existence)

## Parallel Opportunities

- T009-T011 (Frontend Theming) can be done in parallel with T003-T006 (Backend logic) once the basic component exists.
