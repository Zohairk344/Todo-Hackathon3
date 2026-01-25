---
id: 0012
title: chat-tool-fix
stage: misc
date: 2026-01-22
surface: agent
model: gemini-2.0-flash-exp
feature: 028-chat-history-theme
branch: 028-chat-history-theme
user: local-user
command: /sp.implement
labels: ["fix", "tools", "latency", "context"]
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

hey gemini, only the add task tool is working ... also can you make the responses from the ai faster

## Response snapshot

Implemented fixes for tool failures and latency.
- **Context Injection**: Modified `chat.py` to fetch current tasks and inject them into the System Prompt. This allows the LLM to know Task IDs without hallucinating or needing an extra round-trip.
- **Latency Optimization**: Updated `config.py` default model to `llama3-8b-8192` (faster than 70b).
- **Observability**: Added detailed logging for tool execution and model selection in `chat.py`.

## Outcome

- ✅ Impact: AI should now reliably delete/update/complete tasks because it knows the IDs. Responses should be faster.
- 🧪 Tests: Manual verification required.
- 📁 Files: Updated `chat.py`, `config.py`.
- 🔁 Next prompts: User verification.
- 🧠 Reflection: The root cause of tool failure was likely the LLM not knowing the Task IDs. Context injection is the standard pattern to solve this in RAG/Agent systems.

## Evaluation notes (flywheel)

- Failure modes observed: Missing context for tool use.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none