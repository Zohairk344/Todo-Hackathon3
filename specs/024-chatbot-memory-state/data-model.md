# Data Model: Chatbot Memory

## Entities

### Conversation
* **Table**: `conversation`
* **Description**: Groups messages into a logical session.
* **Fields**:
    * `id`: `int`, PK
    * `user_id`: `str`, Index, Column=`userId`
    * `created_at`: `datetime`, Column=`createdAt`
    * `updated_at`: `datetime`, Column=`updatedAt`
* **Relationships**:
    * `messages`: List[`Message`]
    * `user`: Optional[`User`] (back-populate if needed, primarily relies on `user_id`)

### Message
* **Table**: `message`
* **Description**: A single turn in the chat.
* **Fields**:
    * `id`: `int`, PK
    * `conversation_id`: `int`, FK(`conversation.id`), Column=`conversationId`
    * `user_id`: `str`, Column=`userId`
    * `role`: `str` ("user" | "assistant")
    * `content`: `str` (Text)
    * `created_at`: `datetime`, Column=`createdAt`
* **Relationships**:
    * `conversation`: `Conversation`

## API Contracts

### ChatRequest
* `message`: `str`
* `conversation_id`: `Optional[int]`

### ChatResponse
* `response`: `str`
* `conversation_id`: `int`
* `tool_calls`: `Optional[List[dict]]`