# Implementation Plan: Agent Logic & API Implementation

**Branch**: `025-agent-logic-api` | **Date**: 2026-01-20 | **Spec**: [specs/025-agent-logic-api/spec.md](/specs/025-agent-logic-api/spec.md)
**Input**: Feature specification from `/specs/025-agent-logic-api/spec.md`

## Summary

This plan implements the "Brain" of the chatbot—the orchestration layer that uses an LLM (Groq/OpenAI/Gemini) to translate natural language into system actions via the defined MCP tools. The implementation follows a stateless loop pattern: authenticate, load context from DB, invoke LLM with tools, execute tools, and persist results.

## Technical Context

**Language/Version**: Python 3.10+
**Primary Dependencies**: 
- `openai` (Python SDK)
- `fastapi`
- `sqlmodel`
**Storage**: PostgreSQL (Neon) via `app.db` engine.
**Testing**: Standalone logic verification script.
**Target Platform**: Hugging Face Spaces (Docker).
**Project Type**: Web Application Backend / AI Orchestration.
**Performance Goals**: Response in < 5s (including LLM round-trips).
**Constraints**: 
- Must use `AsyncOpenAI` for concurrency.
- Must use `get_current_user` for route protection.
- Naive UTC timestamps only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.10+, FastAPI).
- [x] **Schema Rules**: Models defined in Phase 3.2 are used.
- [x] **Verification Protocol**: Plan includes `tests/test_agent_logic.py` for logic validation.

## Project Structure

### Documentation (this feature)

```text
specs/025-agent-logic-api/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
├── app/
│   ├── core/
│   │   └── config.py       # Updated LLM settings
│   └── api/
│       └── routes/
│           └── chat.py     # Endpoint logic & Tool orchestration
└── tests/
    └── test_agent_logic.py # Verification script
```

**Structure Decision**: Logic is housed in `chat.py`. The "Stateless Loop" relies on importing tools directly from `app.mcp_server`.

## Execution Strategy: "The Stateless Agent Loop"

### 1. Configuration & Dependencies (`backend/app/core/config.py`)
* **Goal:** Enable LLM connectivity for multiple providers.
* **Action:** Update `Settings` class to include `LLM_PROVIDER` (default "groq"), `LLM_API_KEY`, and `LLM_MODEL`.
* **Logic:** Implement logic to resolve the correct `BASE_URL` based on the provider:
    * `groq`: `https://api.groq.com/openai/v1`
    * `gemini`: `https://generativelanguage.googleapis.com/v1beta/openai/`
    * `openai`: `None` (Use default)
* **Validation:** Ensure the app fails to start if the API Key is missing.

### 2. Tool Registry Setup (`backend/app/api/routes/chat.py`)
* **Goal:** Create a mapping between LLM tool names and actual Python functions.
* **Action:** Import `add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task` from `app.mcp_server`.
* **Logic:** Create a `AVAILABLE_TOOLS` dictionary: `{"add_task": add_task, ...}`.
* **Schema:** Define the JSON schema for these tools (name, description, parameters) to pass to the OpenAI SDK.

### 3. Chat Endpoint Implementation (`backend/app/api/routes/chat.py`)
* **Route:** `POST /api/{user_id}/chat`
* **Step A (Context):**
    * Fetch `Conversation` by ID (or create new).
    * Fetch last 10 messages.
    * System Prompt: "You are a helpful assistant..." + Current Date.
* **Step B (The LLM Loop):**
    * **First Call:** Send history + user message + tool definitions to LLM.
    * **Check:** Does the response have `tool_calls`?
    * **If YES (Tool Execution):**
        * Loop through calls.
        * Extract function name and arguments.
        * **Security:** Check if name is in `AVAILABLE_TOOLS`.
        * **Execute:** Call the actual Python function (passing `user_id`).
        * **Feedback:** Add the tool result to the conversation history (in memory).
        * **Second Call:** Send the updated history back to LLM for the final natural language response.
    * **If NO:** Use the response content directly.
* **Step C (Persistence):**
    * Create `Message` row for User input.
    * Create `Message` row for Assistant response.
    * `session.commit()`.

### 4. Verification
* **Action:** Update `tests/verify_chat_db.py` or create `tests/test_agent_logic.py` to mock the LLM and verify the loop handles tool calls correctly.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
