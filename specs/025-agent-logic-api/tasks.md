# Tasks: Agent Logic & API Implementation

**Feature**: Agent Logic & API Implementation
**Status**: Pending
**Spec**: [specs/025-agent-logic-api/spec.md](/specs/025-agent-logic-api/spec.md)

## Phase 1: Setup & Configuration
**Goal**: Configure the LLM provider and API keys.

- [X] T001 Configure LLM settings in `todo-hackathon3/app/core/config.py` (LLM_PROVIDER, LLM_API_KEY, LLM_MODEL). Add logic to resolve the correct `BASE_URL` for Gemini (`https://generativelanguage.googleapis.com/v1beta/openai/`) and Groq.

## Phase 2: Tool Registry
**Goal**: Define the interface for the LLM to access application tools.

- [X] T002 Define tool schemas and registry in `todo-hackathon3/app/api/routes/chat.py` by mapping `app.mcp_server` functions.

## Phase 3: Chat Endpoint Logic
**Goal**: [US1] Implement the core orchestration logic for the chatbot.
**Test**: `tests/test_agent_logic.py` verifies the full loop.

- [X] T003 [US1] Implement `POST /api/{user_id}/chat` endpoint in `todo-hackathon3/app/api/routes/chat.py` including context loading, LLM loop, tool execution, and persistence.

## Phase 4: Verification & Integration
**Goal**: [US1] [US2] Verify the agent works end-to-end without a frontend.
**Test**: `tests/verify_agent.py` runs successfully.

- [X] T004 [US1] Create agent flow verification script `todo-hackathon3/tests/verify_agent.py` to mock user input and assert database changes and LLM response.

## Phase 5: Polish & Cross-Cutting
**Goal**: Final code quality checks.

- [X] T005 Run linters on `todo-hackathon3/app/core/config.py`, `todo-hackathon3/app/api/routes/chat.py`, and `todo-hackathon3/tests/verify_agent.py`.

## Dependencies
1. T001 (Setup) -> T002 (Registry) -> T003 (Logic)
2. T003 -> T004 (Verification) -> T005 (Polish)

## Parallel Execution
- T001 and T002 can be implemented in parallel.

## Implementation Strategy
- **MVP**: The `chat` endpoint is the MVP. It connects all previous layers.
- **Verification**: The `verify_agent.py` script is critical for proving the "Brain" works before UI integration.
