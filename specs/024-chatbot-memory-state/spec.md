# Feature Specification: Chatbot Memory & State

**Feature Branch**: `024-chatbot-memory-state`
**Created**: 2026-01-19
**Status**: Draft
**Input**: Update `speckit.md` to define **Phase 3.2: Chatbot Memory & State**. **Context:** We have functional MCP Tools. Now we need to implement the persistence layer for the Chatbot. The Rulebook mandates a "Stateless" architecture where conversation history is stored in the database and retrieved for every request. **Requirement 1: Database Models (`app/models.py`)** Add two new SQLModel classes exactly as defined in the Rulebook: 1. **`Conversation`** * **Purpose:** Group messages into a session. * **Fields:** * `id`: Optional[int] (Primary Key) * `user_id`: str = Field(index=True) * `created_at`: datetime (Naive UTC) * `updated_at`: datetime (Naive UTC) * **Relationships:** Link to `User` (optional) and `Message`. 2. **`Message`** * **Purpose:** Store individual chat turns. * **Fields:** * `id`: Optional[int] (Primary Key) * `conversation_id`: int = Field(foreign_key="conversation.id") * `user_id`: str * `role`: str (Must be "user" or "assistant") * `content`: str (Text content) * `created_at`: datetime (Naive UTC) **Requirement 2: API Schema (`app/api/routes/chat.py`)** Define the Request/Response schemas for the Chat API: * **Request:** `ChatRequest` containing `message` (str) and optional `conversation_id` (int). * **Response:** `ChatResponse` containing `response` (str), `conversation_id` (int), and `tool_calls` (list, optional). **Verification Criteria:** The system must be able to create a Conversation and add Messages to it via Python code without errors. Update the specification to include these Database requirements.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Persisting Conversation State (Priority: P1)

As a Developer, I want to establish the database schema for Conversations and Messages so that the chatbot can persist chat history between requests, enabling a stateless backend architecture.

**Why this priority**: High. This is the foundation for the "Memory" component of the chatbot. Without it, every request is isolated.

**Independent Test**: Python script that initializes the database tables and successfully inserts a Conversation and associated Messages.

**Acceptance Scenarios**:

1.  **Given** the database is initialized, **When** I define the `Conversation` and `Message` models, **Then** the tables are created with the correct columns and relationships (Foreign Key from Message to Conversation).
2.  **Given** an existing User, **When** I insert a new `Conversation` linked to that User, **Then** the insertion succeeds and returns an ID.
3.  **Given** an existing Conversation, **When** I insert a `Message` (role="user") linked to it, **Then** the insertion succeeds.
4.  **Given** an existing Conversation, **When** I insert a `Message` (role="assistant") linked to it, **Then** the insertion succeeds.
5.  **Given** a Conversation with messages, **When** I query the Conversation by ID, **Then** I can access its list of Messages (relationship loading).

---

### User Story 2 - API Data Contracts (Priority: P2)

As a Frontend Developer, I want a defined API schema for Chat requests and responses so that I can integrate the UI with the backend reliably.

**Why this priority**: Medium. Ensures the frontend and backend agree on the data format before logic implementation.

**Independent Test**: Static analysis or simple script instantiating Pydantic models with sample data.

**Acceptance Scenarios**:

1.  **Given** the `ChatRequest` schema, **When** I instantiate it with a `message` string, **Then** it validates successfully.
2.  **Given** the `ChatRequest` schema, **When** I instantiate it with a `message` and `conversation_id`, **Then** it validates successfully.
3.  **Given** the `ChatResponse` schema, **When** I instantiate it with `response`, `conversation_id`, and `tool_calls`, **Then** it validates successfully.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: System MUST define a `Conversation` entity with fields: `id` (PK), `user_id` (Index), `created_at` (Naive UTC), `updated_at` (Naive UTC).
-   **FR-002**: System MUST define a `Message` entity with fields: `id` (PK), `conversation_id` (FK), `user_id`, `role` ("user" or "assistant"), `content` (Text), `created_at` (Naive UTC).
-   **FR-003**: `Conversation` entity MUST have a relationship to `Message` (one-to-many).
-   **FR-004**: System MUST define a `ChatRequest` Pydantic model with `message` (str) and `conversation_id` (Optional[int]).
-   **FR-005**: System MUST define a `ChatResponse` Pydantic model with `response` (str), `conversation_id` (int), and `tool_calls` (Optional[list]).
-   **FR-006**: All datetime fields MUST be stored as Naive UTC.

### Constraints

-   **C-001**: Must use `SQLModel` for database entities.
-   **C-002**: Must use `Pydantic` (via SQLModel or directly) for API schemas.
-   **C-003**: `role` field in `Message` is restricted to specific values ("user", "assistant").

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: Database migration (or `create_all`) successfully creates `conversation` and `message` tables in Postgres.
-   **SC-002**: A test script can create 1 Conversation and 2 Messages (User + Assistant) and retrieve them via the ORM relationship in < 200ms.
-   **SC-003**: API schemas correctly validate valid JSON payloads and reject invalid ones (e.g., missing mandatory fields).

## Key Entities *(include if feature involves data)*

-   **Conversation**: Represents a session of back-and-forth.
-   **Message**: Represents a single turn in the conversation.

## Assumptions

-   `User` entity already exists in `app/models.py`.
-   The "Rulebook" refers to the project's internal architectural guidelines (likely the Constitution or previous phase docs).