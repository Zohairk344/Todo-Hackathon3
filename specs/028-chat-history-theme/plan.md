# Implementation Plan: Chat History & Theming

**Branch**: `028-chat-history-theme` | **Date**: 2026-01-22 | **Spec**: [specs/028-chat-history-theme/spec.md](spec.md)
**Input**: Feature specification from `/specs/028-chat-history-theme/spec.md`

## Summary

This execution strategy, "Stabilize & Style", focuses on resolving critical backend connectivity issues and refining the frontend user experience.
1.  **Backend Stabilization**: Fix CORS to allow local development, implement the missing `GET /api/{user_id}/chat` endpoint for history persistence, and add robust error logging to the chat `POST` route.
2.  **Frontend Refinement**: Update the `ChatWidget` to fetch and display chat history on load, and integrate `next-themes` to support a consistent Dark/Light mode UI using Tailwind CSS.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), TypeScript 5+ (Frontend)
**Primary Dependencies**: FastAPI, SQLModel, OpenAI (Backend); Next.js 14+, Tailwind CSS, next-themes (Frontend)
**Storage**: PostgreSQL (Neon) via `app.db` engine
**Testing**: Manual verification script `tests/sanity_chat.py` (Verification Protocol)
**Target Platform**: Hugging Face Spaces (Docker) / Localhost for dev
**Project Type**: Web application (Full Stack)
**Performance Goals**: Instant theme switching, chat history load < 500ms
**Constraints**: Ironclad Database Schema (strictly camelCase columns), 0.0.0.0 host for deployment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (FastAPI, Next.js, Tailwind, Neon).
- [x] **Schema Rules**: Ironclad mapping followed (existing models `Conversation`/`Message` used).
- [x] **Verification Protocol**: Tasks will include `tests/sanity_chat.py` and syntax checks.

## Project Structure

### Documentation (this feature)

```text
specs/028-chat-history-theme/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code

```text
todo-hackathon3/
├── app/
│   ├── main.py              # CORS Config
│   └── api/routes/
│       └── chat.py          # Chat History & Logging
└── tests/
    └── sanity_chat.py       # Verification Script

frontend/
└── components/
    └── dashboard/
        └── ChatWidget.tsx   # History Fetch & Theming
```

**Structure Decision**: Standard full-stack structure with `todo-hackathon3` as backend and `frontend` as frontend.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |