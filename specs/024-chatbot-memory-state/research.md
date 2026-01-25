# Research: Chatbot Memory & State

## Decisions

### 1. Database Schema Compliance ("Ironclad")
* **Decision**: Apply `sa_column` to all fields that span multiple words or are standard audit fields, to match Better-Auth conventions.
* **Mappings**:
    * `Conversation.user_id` -> `userId`
    * `Conversation.created_at` -> `createdAt`
    * `Conversation.updated_at` -> `updatedAt`
    * `Message.conversation_id` -> `conversationId`
    * `Message.user_id` -> `userId`
    * `Message.created_at` -> `createdAt`
* **Rationale**: Constitution Rule II.1 mandates camelCase for DB columns.

### 2. Relationship Cascade
* **Decision**: Use `cascade="all, delete"` on `Conversation.messages`.
* **Rationale**: If a conversation is deleted, its messages should be deleted automatically to prevent orphans.

### 3. API Schema Location
* **Decision**: Place `ChatRequest` and `ChatResponse` in `app/api/routes/chat.py` rather than `models.py`.
* **Rationale**: These are Pydantic models specific to the API transport layer, not database entities. This keeps `models.py` focused on the domain data model.

## Technical Details

* **Datetime Handling**: Use `datetime.now(timezone.utc).replace(tzinfo=None)` for all default factories.
* **Foreign Keys**: `conversation_id` in `Message` will point to `conversation.id` (lowercase table name).