# Feature Specification: Fix Task Schema Mismatch

**Feature Branch**: `015-fix-task-schema`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a Critical Schema Mismatch in the Task model that is causing 500 Errors. Context: column task.dueDate does not exist. Change due_date mapping to use snake_case for the database column. Implementation: due_date: Optional[datetime] = Field(default=None, sa_column=Column('due_date', DateTime, nullable=True))"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Stable Task Persistence (Priority: P1)

As a User, I want my tasks with due dates to be saved correctly in the database without the application crashing, so that I can reliably track my deadlines.

**Why this priority**: High. Current schema mismatch causes 500 internal server errors when interacting with tasks that have due dates, making the application unusable for deadline management.

**Independent Test**: Can be fully tested by creating or updating a task with a due date via the API and delivers value by preventing server crashes.

**Acceptance Scenarios**:

1. **Given** a Task model with a `due_date` field, **When** a task is saved to the database, **Then** the column used in Postgres MUST be `due_date`.
2. **Given** the application is running, **When** a request is made to create a task with a due date, **Then** the server MUST NOT return a 500 Error due to `UndefinedColumnError: column task.dueDate does not exist`.

---

### User Story 2 - Legacy Field Preservation (Priority: P2)

As a Developer, I want to ensure that fixing the `due_date` field does not inadvertently break other correctly mapped fields, so that the database remains stable.

**Why this priority**: Medium. Ensures that the fix is surgical and doesn't introduce regressions in other parts of the schema (like `userId` or timestamps).

**Independent Test**: Can be tested by verifying that `userId`, `createdAt`, and `updatedAt` still map to their respective camelCase columns in the database.

**Acceptance Scenarios**:

1. **Given** the Task model update, **When** the schema is inspected, **Then** `user_id` MUST still map to `userId`.
2. **Given** the Task model update, **When** the schema is inspected, **Then** `created_at` and `updated_at` MUST still map to `createdAt` and `updatedAt`.

### Edge Cases

- **Null Due Dates**: Ensure the mapping handles `None` values correctly without DB constraint violations.
- **Migration Drift**: Ensure the Python model matches the actual Postgres table structure established during previous initialization.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST map the `due_date` attribute in the `Task` model to the `due_date` column in the Postgres database.
- **FR-002**: System MUST use `sa_column=Column("due_date", ...)` for the `due_date` field definition in `models.py`.
- **FR-003**: System MUST NOT change the mapping for `user_id` (must remain `userId` in DB).
- **FR-004**: System MUST NOT change the mapping for `created_at` and `updated_at` (must remain `createdAt` and `updatedAt` in DB).

### Key Entities *(include if feature involves data)*

- **Task**: 
    - `due_date`: Python `datetime` mapped to DB `due_date` (snake_case).
    - `user_id`: Python `str` mapped to DB `userId` (camelCase).
    - `created_at`: Python `datetime` mapped to DB `createdAt` (camelCase).
    - `updated_at`: Python `datetime` mapped to DB `updatedAt` (camelCase).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `UndefinedColumnError: column task.dueDate does not exist` when creating or reading tasks.
- **SC-002**: 100% of task creation requests with due dates return a successful status code (201/200).
- **SC-003**: `due_date` values are correctly persisted and retrieved from the database column named `due_date`.
- **SC-004**: System continues to correctly link tasks to users using the `userId` column.
