# Tasks: MCP Tool Upgrade & Theme Synchronization

**Input**: Design documents from `/specs/029-mcp-tool-upgrade/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Manual verification via Chat Interface and `tests/sanity_mcp.py`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup & Verification Tools

**Purpose**: Prepare environment and verification scripts.

- [x] T001 [P] Create `todo-hackathon3/tests/sanity_mcp.py` to verify `add_task` logic independently (mocking DB/LLM calls where possible).

## Phase 2: User Story 1 - Advanced Task Creation (Priority: P1)

**Goal**: Enable AI to set priority, due date, and category.

**Independent Test**: Use `sanity_mcp.py` to call `add_task` with new params.

### Implementation for User Story 1

- [x] T002 [US1] Update `add_task` signature in `todo-hackathon3/app/mcp_server.py` to accept `priority`, `due_date`, `category_name`.
- [x] T003 [US1] Implement priority parsing logic in `todo-hackathon3/app/mcp_server.py` (String -> Enum).
- [x] T004 [US1] Implement date parsing logic in `todo-hackathon3/app/mcp_server.py` using `datetime.fromisoformat` (or `dateutil` if available).
- [x] T005 [US1] Implement category lookup logic in `todo-hackathon3/app/mcp_server.py` (Name -> ID).
- [x] T006 [US1] Update `add_task` DB insertion in `todo-hackathon3/app/mcp_server.py` to include new fields.

**Checkpoint**: `add_task` tool now supports rich data.

## Phase 3: User Story 2 - Context-Aware Category Selection (Priority: P2)

**Goal**: AI knows available categories to avoid hallucination.

**Independent Test**: Verify system prompt logs in backend output.

### Implementation for User Story 2

- [x] T007 [US2] Update `chat_endpoint` in `todo-hackathon3/app/api/routes/chat.py` to fetch user's categories.
- [x] T008 [US2] Inject "Available Categories: [...]" list into the System Prompt construction in `todo-hackathon3/app/api/routes/chat.py`.

**Checkpoint**: AI is context-aware.

## Phase 4: User Story 3 - Seamless Theme Integration (Priority: P2)

**Goal**: Chat Widget adapts to any theme.

**Independent Test**: Toggle themes in UI, verify Chat Widget colors.

### Implementation for User Story 3

- [x] T009 [US3] Refactor `frontend/components/dashboard/ChatWidget.tsx` to replace hardcoded colors (e.g. `bg-white`) with semantic classes (e.g. `bg-card`, `text-card-foreground`).
- [x] T010 [US3] Ensure `input` and `button` elements in `ChatWidget.tsx` use semantic classes (`bg-muted`, `border-input`).

**Checkpoint**: Chat Widget is theme-agnostic.

## Phase 5: Polish & Verification

- [ ] T011 Manual Verification: Run full flow (Create Task with details -> Check DB -> Check UI Theme).
