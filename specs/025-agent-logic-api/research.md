# Research: Agent Logic & API Implementation

## Decisions

### 1. LLM Client & Provider
* **Decision**: Use `openai` Python SDK's `AsyncOpenAI` for all LLM calls.
* **Rationale**: Groq maintains a 1:1 compatible API with OpenAI. Using a single SDK reduces dependency bloat and simplifies orchestration.
* **Groq Config**: `base_url="https://api.groq.com/openai/v1"`, `api_key=settings.LLM_API_KEY`.
* **Model Selection**: `llama-3.3-70b-versatile` (Groq) or `gpt-4o-mini` (OpenAI).

### 2. Orchestration Pattern: Stateless Agent Loop
* **Decision**: Implement a manual two-step loop rather than a persistent agent framework (like LangChain/CrewAI).
* **Rationale**: 
    *   **Statelessness**: The backend remains stateless by loading history from Postgres on every request.
    *   **Control**: Direct control over tool execution security and DB session management.
    *   **Performance**: Minimizes overhead for a task management domain.
* **Flow**: 
    1.  Fetch history + User Message.
    2.  LLM Call (with Tools).
    3.  If `tool_calls`: Execute Python functions -> Second LLM Call (final response).
    4.  Persist both messages.

### 3. Tool Mapping & Security
* **Decision**: Create an explicit `AVAILABLE_TOOLS` map in `routes/chat.py`.
* **Rationale**: Prevents LLM from invoking arbitrary functions. Ensures only defined task tools are executed.

## Technical Details

* **Groq Model ID**: `llama-3.3-70b-versatile`
* **OpenAI Model ID**: `gpt-4o-mini`
* **Default Provider**: `groq` (due to high speed/low latency for Phase 3 requirements).
