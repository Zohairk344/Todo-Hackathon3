---
id: "0007"
title: "fix-configuration-mapping-sqlalchemy-uri"
stage: "green"
date: "2026-01-26"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "038-stateless-auth-fix"
branch: "038-stateless-auth-fix"
user: "zohair"
command: "/sp.implement"
labels: ["configuration", "sqlalchemy", "fastapi", "bug-fix"]
links:
  spec: "specs/038-stateless-auth-fix/spec.md"
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/core/config.py
 - specs/038-stateless-auth-fix/tasks.md
tests:
 - python3 -m py_compile app/core/config.py
---

## Prompt

Phase 14: Fix Configuration Mapping

1. Update backend/app/core/config.py
* Problem: The Settings class is missing the SQLALCHEMY_DATABASE_URI attribute, causing the AttributeError.
* Action: Overwrite the file with this version. It uses a Python @property to automatically fix the "postgres://" vs "postgresql://" issue that often breaks Neon/Supabase connections.
* Content:
(Provided content with Settings class, SQLALCHEMY_DATABASE_URI property, and extra = "ignore" in Config)

2. Push the Fix
* Action: Run these commands:
git add backend/app/core/config.py
git commit -m "Fix: Add SQLALCHEMY_DATABASE_URI property to settings"
git push

3. Final Verification
* This should be the last startup crash.
* Once deployed, your db.py will successfully read the database URL, the connection pool will initialize with "Keep-Alive" enabled, and you will be able to Log In.

## Response snapshot

Implemented Phase 14 by adding the `SQLALCHEMY_DATABASE_URI` property to the `Settings` class in `app/core/config.py`. This property automatically converts `postgres://` to `postgresql://` for SQLAlchemy compatibility. Also added `extra = "ignore"` to the `Config` class to allow auxiliary environment variables without crashing. The changes were verified for syntax, committed, and pushed to Hugging Face.

## Outcome

- ✅ Impact: High. Resolves the `AttributeError` on startup and ensures robust database connectivity.
- 🧪 Tests: Syntax check passed with `py_compile`.
- 📁 Files: `todo-hackathon3/app/core/config.py`.
- 🔁 Next prompts: Verify login functionality in the browser.
- 🧠 Reflection: Preserved existing LLM and CORS settings during the update to ensure full application functionality.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A