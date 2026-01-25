---
description: "Actionable, dependency-ordered tasks for Phase 3 Foundation & Chatbot Init"
---

# Tasks: Phase 3 Foundation & Chatbot Init

**Input**: Design documents from `/specs/014-ironclad-backend/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (no dependencies on other tasks in the same phase)
- **[Story]**: US1 (Auth), US2 (Startup), US3 (Integrity/Chat)

## Phase 1: Setup

**Purpose**: Initial project configuration and environment readiness

- [x] T001 [P] Create `todo-hackathon3/app/api/routes/chat.py` with basic APIRouter instance
- [x] T002 [P] Define `ChatRequest` Pydantic model in `todo-hackathon3/app/models.py` for chatbot input
- [x] T003 Configure `FRONTEND_URL` in `.env` and update `todo-hackathon3/app/core/config.py` to support dynamic CORS origins

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implementation of the "Ironclad" Schema and Auth Core. MUST be completed before user stories.

- [x] T004 **Rewrite Data Models**: Implement the strict "Constitution" schema in `todo-hackathon3/app/models.py`. Use `sa_column=Column("camelCase", ...)` for all 7 tables (User, Session, Account, Verification, Jwks, Task, Category) and define `Priority` Enum. Ensure `__tablename__` is strictly lowercase for all models.
- [x] T005 **Refactor Auth Logic**: Implement "Header OR Cookie" strategy in `todo-hackathon3/app/api/deps.py`. Check `Authorization` header first, then fallback to `better-auth.session_token` cookie.
- [x] T006 **Update Lifespan & Sync**: Refactor `todo-hackathon3/app/main.py` lifespan to import all 7 models locally and run `await conn.run_sync(SQLModel.metadata.create_all)`.
- [x] T007 Register Chat router in `todo-hackathon3/app/main.py` using `app.include_router(chat.router, prefix="/api/chat", tags=["chat"])`.

---

## Phase 3: User Story 1 - Seamless Authentication [US1]

**Goal**: Verify dual-mode authentication works for both Dashboard and API.

- [x] T008 [US1] Implement timezone-aware UTC validation for `Session.expires_at` in `todo-hackathon3/app/api/deps.py`.
- [x] T009 [US1] Verify `get_current_user` returns the correct `User` object using snake_case `db_session.user_id`.
- [x] T010 [US1] Test authentication via `better-auth.session_token` cookie using a manual cURL or browser test.

---

## Phase 4: User Story 2 - Robust System Startup [US2]

**Goal**: Ensure tables are created automatically and safely.

- [x] T011 [US2] Verify that table creation in `todo-hackathon3/app/main.py` does not fail if tables already exist.
- [x] T012 [US2] Verify all 7 tables are visible in the database with correct camelCase column names after startup.

---

## Phase 5: User Story 3 - Data Integrity & Chatbot Prep [US3]

**Goal**: Align application logic with the new schema and initialize chatbot route.

- [x] T013 [P] [US3] Standardize `todo-hackathon3/app/api/routes/tasks.py`: Update Python attribute access from `.userId`/`.expiresAt` to `.user_id`/`.expires_at`.
- [x] T014 [P] [US3] Standardize `todo-hackathon3/app/api/routes/categories.py`: Update Python attribute access to `.user_id`.
- [x] T015 [US3] Implement `POST /` in `todo-hackathon3/app/api/routes/chat.py`. Logic: Accept `current_user`, return mock JSON with `user: current_user.email`.
- [x] T016 [US3] Verify Task/Category Pydantic models in `todo-hackathon3/app/models.py` use `alias="userId"` to ensure camelCase JSON output.

---

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T017 Verify CORS logic in `todo-hackathon3/app/main.py` allows credentials and uses the `FRONTEND_URL` correctly.
- [x] T018 Global scan of `todo-hackathon3/` for any remaining legacy camelCase attribute access on Python objects.

---

## Dependencies & Execution Order

1.  **Phase 1 & 2** are strictly sequential and block all subsequent phases.
2.  **User Story 3** depends on the success of **User Story 1** logic being correctly integrated.
3.  **Phase 5 (T013, T014)** can run in parallel.

## Implementation Strategy

- **MVP First**: Complete Phase 2 and US1 to prove the architecture.
- **Incremental**: Standardize one route at a time in Phase 5.
- **Verify**: Use the `quickstart.md` verification steps after Phase 4.