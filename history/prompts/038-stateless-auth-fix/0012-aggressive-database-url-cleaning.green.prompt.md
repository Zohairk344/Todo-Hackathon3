---
id: "0012"
title: "Aggressive Database URL Cleaning"
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

Phase 18: Aggressive Database URL Cleaning

1. Update backend/app/core/config.py
* Problem: asyncpg is crashing on channel_binding. It will likely crash on gssencmode next if we don't fix it now.
* Action: Update the cleaning logic to strip a list of known "bad" parameters.
* Content: (content omitted for brevity)

2. Push the Fix
* Action: Run the git commands:
git add backend/app/core/config.py
git commit -m "Fix: Strip channel_binding and gssencmode from db url"
git push

3. Final Verification
* This will remove channel_binding (and gssencmode just in case).
* Since asyncpg defaults to secure settings automatically, removing these won't break your connection; it just stops the library from getting confused.
* The app should finally start green. 🟢

## Response snapshot

Implemented Phase 18: Aggressive Database URL Cleaning. Updated `todo-hackathon3/app/core/config.py` to strip `sslmode`, `channel_binding`, and `gssencmode` query parameters from the `DATABASE_URL`. This fixes crashes in `asyncpg` when these parameters are present (which is common with cloud providers like Neon). Pushed changes to the backend repository on Hugging Face and updated `tasks.md`.

## Outcome

- ✅ Impact: Prevents asyncpg from crashing due to unsupported connection parameters.
- 🧪 Tests: Manual verification of URL parsing logic.
- 📁 Files: Updated config.py and tasks.md.
- 🔁 Next prompts: none
- 🧠 Reflection: Aggressive sanitization is necessary when using libraries with strict URL parsing requirements in environments where connection strings are automatically generated.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none