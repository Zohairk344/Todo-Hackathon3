# Research: Fix Cascade Delete

## Decisions

### 1. Database-Level Cascade
*   **Decision**: Use `ondelete="CASCADE"` in SQLAlchemy Column definitions for ForeignKeys.
*   **Rationale**: The database is the most reliable place to enforce referential integrity. When a parent record (User) is deleted, the database automatically deletes all dependent child records (Session, Task, Account, Category), preventing `ForeignKeyViolationError`.
*   **Verification**: Verified against SQLAlchemy and PostgreSQL documentation for cascading deletes.

### 2. ORM-Level Cascade
*   **Decision**: Use `cascade="all, delete"` in SQLModel/SQLAlchemy Relationship definitions.
*   **Rationale**: While DB-level cascade handles the actual deletion, ORM-level cascade ensures the session state remains consistent if objects are loaded in memory.

### 3. API Logic Simplification
*   **Decision**: Remove manual deletion logic from the API route.
*   **Rationale**: Manual deletion is brittle (requires updating code for every new relationship) and slower (multiple round-trips). Database cascade handles it atomically.

## Implementation Details

*   **Target File**: `todo-hackathon3/app/models.py`
*   **Target Class**: `User` (Relationship updates), `Session`/`Account`/`Task`/`Category` (ForeignKey updates).
*   **Target File**: `todo-hackathon3/app/api/users.py`
*   **Target Function**: `delete_user_me`.
