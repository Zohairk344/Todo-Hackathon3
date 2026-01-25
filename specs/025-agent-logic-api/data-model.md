# Data Model: Agent Logic & API

The Agent logic uses the `Conversation` and `Message` models implemented in Phase 3.2.

## Context Loading Logic
* **Window**: Last 10 messages per `conversation_id`.
* **Ordering**: `created_at` ASC.
* **Role Conversion**:
    *   `Message.role == "user"` -> OpenAI `user`
    *   `Message.role == "assistant"` -> OpenAI `assistant`

## Tool Function Signatures
The LLM will be provided with JSON schemas for:
*   `add_task(title, description=None)`
*   `list_tasks(status="all")`
*   `complete_task(task_id)`
*   `delete_task(task_id)`
*   `update_task(task_id, title=None, description=None)`

**Note**: `user_id` is automatically injected by the API layer before calling the Python functions.
