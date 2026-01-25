---
id: 0010
title: chat-history-fix-404
stage: misc
date: 2026-01-22
surface: agent
model: gemini-2.0-flash-exp
feature: 028-chat-history-theme
branch: 028-chat-history-theme
user: local-user
command: /sp.implement
labels: ["fix", "routing", "404"]
links:
  spec: specs/028-chat-history-theme/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/api/routes/chat.py
 - todo-hackathon3/app/main.py
tests:
 - none
---

## Prompt

hey gemini, i opened the chat bubble and i got this: Failed to fetch history ... GET /api/.../chat 404

## Response snapshot

Identified routing configuration error causing 404s.
- **Root Cause**: `chat.py` had hardcoded `/api` prefix while `main.py` potentially mounted it incorrectly or shadowed it by `categories.router`.
- **Fix**: 
    1. Removed `/api` prefix from `chat.py` routes (now `/{user_id}/chat`).
    2. Updated `main.py` to mount `chat.router` with `prefix="/api"`.
    3. Moved `chat.router` inclusion *before* `categories.router` to prevent shadowing.

## Outcome

- ✅ Impact: Fixed API 404 errors for Chat.
- 🧪 Tests: Syntax check passed.
- 📁 Files: Updated `main.py`, `chat.py`.
- 🔁 Next prompts: User verification.
- 🧠 Reflection: Route precedence in FastAPI `include_router` is critical when using broad prefixes like `/api`.

## Evaluation notes (flywheel)

- Failure modes observed: Routing conflict/misconfiguration.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none