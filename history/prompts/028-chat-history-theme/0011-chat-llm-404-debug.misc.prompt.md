---
id: 0011
title: chat-llm-404-debug
stage: misc
date: 2026-01-22
surface: agent
model: gemini-2.0-flash-exp
feature: 028-chat-history-theme
branch: 028-chat-history-theme
user: local-user
command: /sp.implement
labels: ["debug", "llm", "404"]
links:
  spec: specs/028-chat-history-theme/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/api/routes/chat.py
 - todo-hackathon3/app/core/config.py
tests:
 - none
---

## Prompt

hey gemini, the history error is resolve but now when i type something to the ai i get this in backend logs: ... LLM Provider Error: Error code: 404 - ... models/gemini-1.5-flash is not found ...

## Response snapshot

Diagnosed LLM 404.
- **Status**: Backend routing works (200 OK on GET, 500 on POST due to internal exception).
- **Error**: `openai.NotFoundError` from Google's API.
- **Cause**: Invalid Model Name (`gemini-1.5-flash`) or API Key issue. The model name might need to be `gemini-1.5-flash-latest` or simply the user's key doesn't support it or the endpoint `v1beta` expects something else.
- **Resolution**: Advise user to update `.env` `LLM_MODEL`.

## Outcome

- ✅ Impact: Isolated the issue to configuration (Env vars).
- 🧪 Tests: N/A
- 📁 Files: None modified.
- 🔁 Next prompts: User config update.
- 🧠 Reflection: The traceback logging added in the previous step was crucial for identifying this downstream error immediately.

## Evaluation notes (flywheel)

- Failure modes observed: Configuration (LLM Model name).
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none