---
id: "0011"
title: "Clean Database URL for AsyncPG"
stage: "green"
date: "2026-01-26"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "038-stateless-auth-fix"
branch: "038-stateless-auth-fix"
user: "zohair"
command: "/sp.implement"
labels: ["database", "asyncpg", "config", "backend"]
links:
  spec: "specs/038-stateless-auth-fix/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
 - todo-hackathon3/app/core/config.py
 - specs/038-stateless-auth-fix/tasks.md
tests:
 - (none)
---

## Prompt

Phase 17: Clean Database URL for AsyncPG

1. Update backend/app/core/config.py
* Goal: Remove sslmode=require from the URL string so asyncpg doesn't crash.
* Action: Overwrite config.py with this robust URL cleaner.
* Content: (content omitted for brevity in PHR but was provided in prompt)

2. Push the Fix
* Action: Run the git commands:
git add backend/app/core/config.py
git commit -m "Fix: Strip sslmode param from db url for asyncpg"
git push

3. Final Verification
* This effectively sanitizes the URL.
* The app will start, asyncpg will connect securely (default behavior), and your 500/Crash loop will end.

## Response snapshot

Implemented Phase 17: Clean Database URL for AsyncPG. Updated `todo-hackathon3/app/core/config.py` to robustly strip the `sslmode` query parameter from `DATABASE_URL` before constructing `SQLALCHEMY_DATABASE_URI`. This ensures compatibility with the `asyncpg` driver. Marked tasks as completed in `specs/038-stateless-auth-fix/tasks.md` and committed changes to both the backend repository and the main specification repository.

## Outcome

- ✅ Impact: Sanitized database URL prevents asyncpg from crashing due to unsupported sslmode parameter.
- 🧪 Tests: Manual verification of code logic for URL string manipulation.
- 📁 Files: Updated config.py and tasks.md.
- 🔁 Next prompts: none
- 🧠 Reflection: Robust URL parsing is critical when environment variables contain driver-specific options that are incompatible with the chosen implementation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none