# Implementation Plan: Ironclad Backend Architecture

**Branch**: `014-ironclad-backend` | **Date**: 2026-01-13 | **Spec**: [specs/014-ironclad-backend/spec.md](/specs/014-ironclad-backend/spec.md)
**Input**: Feature specification from `/specs/014-ironclad-backend/spec.md`

## Summary

The "Ironclad" backend architecture mandates strict database schema definitions and robust authentication. This feature implements the single source of truth for the data model in `backend/app/models.py` with explicit Python-to-DB column mapping (snake_case to camelCase). It also refactors the authentication dependency `get_current_user` to support both Bearer tokens and `better-auth.session_token` cookies, ensuring seamless access for both the Frontend Dashboard and external API clients. Finally, it establishes a robust startup sequence that automatically verifies and creates database tables, preventing runtime errors.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, Uvicorn, SQLModel, SQLAlchemy (Async), Better-Auth (conceptually)
**Storage**: PostgreSQL (Neon) via asyncpg
**Testing**: pytest
**Target Platform**: Hugging Face Spaces (Linux/Docker)
**Project Type**: Web Application Backend
**Performance Goals**: <200ms API latency
**Constraints**: Strict schema mapping (camelCase DB columns), Port 7860, Host 0.0.0.0

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+, FastAPI, SQLModel).
- [x] **Schema Rules**: Explicit `sa_column` usage mandated for all mapped fields.
- [x] **Auth Rules**: Dual-token strategy (Header + Cookie) mandated.
- [x] **Startup**: `asynccontextmanager` mandated.
- [x] **Deployment**: Port 7860/Host 0.0.0.0 compliant.

## Project Structure

### Documentation (this feature)

```text
specs/014-ironclad-backend/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── chat.py      # New Chatbot route
│   │   │   ├── tasks.py     # Refactored
│   │   │   └── categories.py # Refactored
│   │   └── deps.py          # Refactored Auth
│   ├── models.py            # Rewritten Single Source of Truth
│   ├── main.py              # Refactored Startup
│   └── db.py                # Engine config
├── tests/
└── pyproject.toml
```

**Structure Decision**: Option 2 (Modified for specific backend folder `todo-hackathon3`)

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Explicit `sa_column` | better-auth requires camelCase DB columns, Python uses snake_case | Automapping is risky and opaque; explicit is safe. |