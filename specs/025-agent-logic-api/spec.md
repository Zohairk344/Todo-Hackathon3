# Feature Specification: Agent Logic & API Implementation

**Feature Branch**: `025-agent-logic-api`  
**Created**: 2026-01-20  
**Status**: Draft  
**Input**: User description: "Update `speckit.md` to define **Phase 3.3: Agent Logic & API Implementation**. **Context:** We have the MCP Tools (Hands) and Database Models (Memory). Now we need the API Endpoint (The Brain) that orchestrates them. This implementation must be **stateless** and use an LLM Client (OpenAI/Groq) to process natural language. **Requirement 1: Dependencies & Configuration** * **File:** `backend/app/core/config.py` (or similar) * **Env Vars:** Add `LLM_PROVIDER` (default "groq" or "openai") and `LLM_API_KEY`. * **Libraries:** Use `openai` (Python SDK) for the client, as it supports both OpenAI and Groq/Llama models. **Requirement 2: The Chat Endpoint (`backend/app/api/routes/chat.py`)** * **Route:** `POST /api/{user_id}/chat` * **Dependency:** Must use `get_current_user` to ensure security. * **Logic Flow (Stateless):** 1. **Auth:** Verify `user_id` matches the token. 2. **Load Context:** * Fetch the `Conversation` by `conversation_id` (if provided) or create a new one. * Query the last 10 `Message` rows for this conversation. 3. **System Prompt:** * Create a prompt: "You are a helpful Todo assistant. Today is [Current Date]. Use the provided tools to manage tasks." 4. **LLM Call:** * Initialize `AsyncOpenAI` client. * Define the "Tools" schema (JSON definition of `add_task`, `list_tasks`, etc.) to pass to the LLM. * Call `client.chat.completions.create` with `messages` (System + History + User Input) and `tools`. 5. **Tool Execution:** * If the LLM returns `tool_calls`: * Parse the function name and arguments. * **CRITICAL:** Call the actual python functions from `backend/app/mcp_server.py`. * Append the tool result to the message history. * Call the LLM *again* with the tool results to get the final natural language response. 6. **Persistence:** * Save the User's message to the DB. * Save the Assistant's final response to the DB. 7. **Response:** Return `ChatResponse` with the final text and `conversation_id`. **Verification Criteria:** A curl request to the endpoint with "Add a task to buy milk" must result in: 1. A new task in the database. 2. A new Conversation and Message history in the database. 3. A text response saying "I have added the task." Update the specification to include these Agent requirements.

## Clarifications

### Session 2026-01-20
- Q: What are the default LLM models? → A: Groq: `llama-3.3-70b-versatile`, OpenAI: `gpt-4o-mini`, Gemini: `gemini-1.5-flash`
- Q: How should tool execution errors be handled? → A: Return user-friendly error to LLM (e.g. "Database unavailable")
- Q: What timezone standard for "Current Date" and History? → A: Both in Naive UTC
- Q: How to handle unauthorized conversation_id? → A: Return 403 Forbidden
- Q: Primary grouping for messages? → A: Group by `conversation_id` only

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Natural Language Task Management (Priority: P1)

As a User, I want to talk to a chatbot in natural language to manage my tasks so that I can interact with the system more intuitively and efficiently.

**Why this priority**: P1. This is the core value proposition of the Phase 3 implementation, providing the "Brain" that connects user intent to system actions.

**Independent Test**: Can be tested by sending a POST request to `/api/{user_id}/chat` with a prompt like "Remind me to buy milk tomorrow" and verifying that a task is created and a natural language response is received.

**Acceptance Scenarios**:

1. **Given** an authenticated user session, **When** I send a chat message "Add a task to buy milk", **Then** the system MUST use the LLM to identify the `add_task` tool call and execute it.
2. **Given** a successful tool execution, **When** the LLM provides a final response, **Then** the system MUST return that response to the user and persist both user and assistant messages in the database history.
3. **Given** an existing conversation, **When** I send a follow-up message, **Then** the system MUST include the last 10 messages as context for the LLM to maintain conversational continuity.

---


### User Story 2 - Conversation History Persistence (Priority: P2)

As a User, I want the chatbot to remember our previous interaction context so that I don't have to repeat information in a single session.

**Why this priority**: P2. Enhances the user experience and provides the "Memory" required for a sophisticated assistant.

**Independent Test**: Send a message setting a context (e.g., "I am planning a trip"), followed by a query (e.g., "What was I planning?"), and verify the assistant correctly identifies the context.

**Acceptance Scenarios**:

1. **Given** a message is sent to the chat endpoint, **When** the system processes it, **Then** it MUST retrieve up to 10 previous messages for the specified conversation from the database.
      Then all message exchanges MUST be saved to the database associated with the correct conversation ID.

### Edge Cases

- **LLM Timeout/Failure**: How does the system respond if the LLM provider is unavailable? (Should return a user-friendly error and not crash).
- **Invalid Tool Call / Execution Error**: What happens if the LLM generates arguments that the tool doesn't accept or the tool fails? (Return a user-friendly error message like "Database unavailable" to the LLM, allowing it to explain the issue to the user).
- **Unauthorized Access**: Ensure that requesting a `conversation_id` belonging to another user results in a 403 Forbidden error. (Return HTTP 403 Forbidden).
- **Empty Message**: Handle cases where the user sends an empty string or irrelevant content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a secure API endpoint at `POST /api/{user_id}/chat` for processing natural language interactions.
- **FR-002**: System MUST use an LLM provider (configured via `LLM_PROVIDER` and `LLM_API_KEY`) to interpret user intent and generate responses. Default models MUST be `llama-3.3-70b-versatile` for Groq, `gpt-4o-mini` for OpenAI, and `gemini-1.5-flash` for Gemini.
- **FR-003**: System MUST identify and execute tool calls (e.g., `add_task`, `list_tasks`) by invoking the corresponding Python functions defined in the MCP server layer.
- **FR-004**: System MUST maintain statelessness at the application level by loading the required conversation context from the database for every request.
- **FR-005**: System MUST include a system prompt defining the assistant's persona and providing relevant contextual data (e.g., current date). All timestamps and dates provided to the LLM MUST be in Naive UTC.
- **FR-006**: System MUST persist every user message and assistant response in the `Message` table, grouped primarily by `conversation_id`.
- **FR-007**: System MUST handle multi-turn interactions where the LLM requests a tool call, receives the result, and then generates a final natural language response.

### Key Entities *(include if feature involves data)*

- **Conversation**: Represents a chat session, grouping related messages for a user.
- **Message**: An individual turn in a conversation (either "user" or "assistant" role).
- **Task**: The domain object managed by the agent via tool calls.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a task via a single natural language prompt with 100% accuracy for clear intents.
- **SC-002**: The chat endpoint returns a response in under 5 seconds (including LLM and database latency) for 95% of requests.
- **SC-003**: 100% of messages processed via the chat endpoint are correctly persisted in the database history.
- **SC-004**: The system correctly handles tool execution and provides a relevant confirmation response to the user.