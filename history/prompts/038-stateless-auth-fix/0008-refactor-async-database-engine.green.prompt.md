---
id: "0008"
title: "refactor-async-database-engine"
stage: "green"
date: "2026-01-26"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "038-stateless-auth-fix"
branch: "038-stateless-auth-fix"
user: "zohair"
command: "/sp.implement"
labels: ["database", "asyncpg", "sqlalchemy", "refactor"]
links:
  spec: "specs/038-stateless-auth-fix/spec.md"
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/core/config.py
 - todo-hackathon3/app/db.py
 - specs/038-stateless-auth-fix/tasks.md
tests:
 - python3 -m py_compile app/core/config.py app/db.py
---

## Prompt

Phase 15: Switch to Async Database Engine

1. Update backend/app/core/config.py
* Goal: Tell SQLAlchemy to use the asyncpg driver instead of the missing psycopg2.
* Action: Change the replacement string to postgresql+asyncpg://.
* Content: (Provided content with Settings class, SQLALCHEMY_DATABASE_URI property updated)

2. Update backend/app/db.py
* Goal: Use create_async_engine instead of the sync create_engine.
* Action: Overwrite backend/app/db.py with this correct async setup.
* Content: (Provided content with create_async_engine and AsyncSession)

3. Deploy
* Action: Run the git commands:
git add backend/app/core/config.py backend/app/db.py
git commit -m "Refactor: Switch to AsyncEngine with asyncpg driver"
git push

## Response snapshot

Implemented Phase 15 by refactoring the database configuration to use the `asyncpg` driver and replacing the synchronous `create_engine` with `create_async_engine` in `app/db.py`. This ensures that the backend uses the asynchronous driver which is correctly installed and compatible with the environment. Syntax checks were performed, and the changes were committed and pushed to Hugging Face.

## Outcome

- ✅ Impact: High. Fixes the missing `psycopg2` driver error by switching to `asyncpg` and aligns with asynchronous FastAPI patterns.
- 🧪 Tests: Syntax check passed with `py_compile`.
- 📁 Files: `todo-hackathon3/app/core/config.py`, `todo-hackathon3/app/db.py`.
- 🔁 Next prompts: Verify login and database operations in the deployed environment.
- 🧠 Reflection: The transition to `create_async_engine` is critical for high-concurrency FastAPI applications and avoids dependency issues with legacy synchronous drivers.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A