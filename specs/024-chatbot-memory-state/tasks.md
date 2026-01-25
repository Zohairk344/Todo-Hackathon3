# Tasks: Chatbot Memory & State

**Feature**: Chatbot Memory & State
**Status**: Pending
**Spec**: [specs/024-chatbot-memory-state/spec.md](/specs/024-chatbot-memory-state/spec.md)

## Phase 1: Setup
**Goal**: Verify environment for database model updates.

- [X] T001 Verify `todo-hackathon3/app/models.py` exists and is ready for updates

## Phase 2: Database Models
**Goal**: [US1] Create the persistence layer for chat history.
**Test**: `tests/verify_chat_db.py` creates and retrieves data.

- [X] T002 [US1] Create `Conversation` model in `todo-hackathon3/app/models.py` with foreign keys and relationships
- [X] T003 [US1] Create `Message` model in `todo-hackathon3/app/models.py` with foreign keys and relationships
- [X] T004 [US1] Update `User` model in `todo-hackathon3/app/models.py` to add `conversations` relationship

## Phase 3: API Schemas
**Goal**: [US2] Define data contracts for the Chat API.
**Test**: `tests/verify_chat_db.py` (or manual import check) verifies schema validity.

- [X] T005 [US2] Create `todo-hackathon3/app/api/routes/chat.py` and define `ChatRequest` schema
- [X] T006 [US2] Define `ChatResponse` schema in `todo-hackathon3/app/api/routes/chat.py`

## Phase 4: Verification & Integration
**Goal**: [US1] [US2] Verify the complete data flow from schema to database.
**Test**: Standalone script runs successfully.

- [X] T007 [US1] Create verification script `todo-hackathon3/tests/verify_chat_db.py` to test model creation and relationships

## Phase 5: Polish & Cross-Cutting
**Goal**: Final code quality checks.

- [X] T008 Run linters on `todo-hackathon3/app/models.py`, `todo-hackathon3/app/api/routes/chat.py`, and `todo-hackathon3/tests/verify_chat_db.py`

## Dependencies
1. T001 (Setup) -> T002, T003, T004 (Models)
2. T002, T003, T004 -> T007 (Verification)
3. T005, T006 (Schemas) -> T007 (Verification)
4. T007 -> T008 (Polish)

## Parallel Execution
- T002, T003, T004 can be implemented in sequence or parallel (same file).
- T005 and T006 can be implemented in parallel with T002-T004.

## Implementation Strategy
- **MVP**: Define models and schemas. Verification script proves they work.
- **Verification**: Standalone script simulating DB operations.
