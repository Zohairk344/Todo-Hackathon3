# Implementation Plan: Chatbot Memory & State

**Branch**: `024-chatbot-memory-state` | **Date**: 2026-01-19 | **Spec**: [specs/024-chatbot-memory-state/spec.md](/specs/024-chatbot-memory-state/spec.md)
**Input**: Feature specification from `/specs/024-chatbot-memory-state/spec.md`

## Summary

This plan outlines the implementation of the persistence layer for the Chatbot. We will add `Conversation` and `Message` tables to the database to store chat history, enabling a stateless architecture. We will also define the API contracts (`ChatRequest`, `ChatResponse`) for the upcoming Chat API. This ensures full compliance with the "Ironclad" database schema rules.

## Technical Context

**Language/Version**: Python 3.10+
**Primary Dependencies**: `sqlmodel`, `sqlalchemy`, `pydantic`
**Storage**: PostgreSQL (Neon) via existing `app.core.db` engine.
**Testing**: Verification script `tests/verify_chat_db.py`.
**Target Platform**: Hugging Face Spaces (Docker).
**Project Type**: Web Application Backend.
**Performance Goals**: Database inserts/reads < 200ms.
**Constraints**: 
- Must use `sa_column` for camelCase column names (Constitution Rule II.1).
- All datetimes must be Naive UTC.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.10+, FastAPI, Postgres).
- [x] **Schema Rules**: Plan enforces camelCase DB columns (`userId`, `createdAt`, `conversationId`) via `sa_column`.
- [x] **Verification Protocol**: Plan includes `tests/verify_chat_db.py` to validate schema creation and data persistence.

## Project Structure

### Documentation (this feature)

```text
specs/024-chatbot-memory-state/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
├── app/
│   ├── models.py           # Updated with Conversation/Message
│   └── api/routes/chat.py  # NEW: Schemas only
└── tests/
    └── verify_chat_db.py   # NEW: Verification script
```

**Structure Decision**: Extending `models.py` is the standard pattern for this project. `chat.py` is created now for schemas but logic will come in the next phase.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |