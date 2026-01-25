# Feature Specification: Fix Task Category Mapping

**Feature Branch**: `016-fix-task-category-id`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a Schema Mismatch in the Task model for category_id. Context: column task.categoryId does not exist. Change category_id mapping to use snake_case for the database column. Implementation: category_id: Optional[int] = Field(sa_column=Column('category_id', Integer, ForeignKey('category.id'), nullable=True))"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Categorized Task Retrieval (Priority: P1)

As a User, I want to view my tasks along with their categories on the dashboard without the page crashing, so that I can stay organized.

**Why this priority**: High. The dashboard is currently failing to load tasks because the database query for categories uses an incorrect column name (`categoryId`), resulting in a 500 error.

**Independent Test**: Can be tested by fetching tasks for a user. The request should return 200 OK and include category information if present.

**Acceptance Scenarios**:

1. **Given** a Task model with a `category_id` field, **When** tasks are queried from the database, **Then** the column used in Postgres MUST be `category_id`.
2. **Given** the dashboard is loaded, **When** the backend fetches tasks, **Then** no `UndefinedColumnError` MUST occur for `task.categoryId`.

---

### User Story 2 - Data Relationship Integrity (Priority: P2)

As a Developer, I want to ensure that the foreign key relationship between Tasks and Categories is correctly maintained in the database, so that data referential integrity is preserved.

**Why this priority**: Medium. Ensures that the schema fix aligns with the actual relational structure of the database.

**Independent Test**: Verify that tasks can be linked to existing categories using the corrected `category_id` column.

**Acceptance Scenarios**:

1. **Given** a new task creation request with a `category_id`, **When** the task is saved, **Then** it MUST be correctly associated with the category in the database using the `category_id` column.

### Edge Cases

- **Tasks without Categories**: Ensure that `category_id` remains optional and `null` values are handled correctly in the snake_case column.
- **CamelCase Consistency**: Maintain camelCase for `userId` as requested in the Constitution, despite Application fields using snake_case.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST map the `category_id` attribute in the `Task` model to the `category_id` column in the Postgres database.
- **FR-002**: System MUST use `sa_column=Column("category_id", Integer, ForeignKey("category.id"), ...)` for the `category_id` field definition in `models.py`.
- **FR-003**: System MUST NOT change the mapping for `user_id` (must remain `userId` in DB).
- **FR-004**: System MUST ensure that the relationship property `category` in the `Task` model correctly references the modified `category_id`.

### Key Entities *(include if feature involves data)*

- **Task**: 
    - `category_id`: Python `int` mapped to DB `category_id` (snake_case).
    - `user_id`: Python `str` mapped to DB `userId` (camelCase).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `UndefinedColumnError: column task.categoryId does not exist` in logs.
- **SC-002**: Dashboard successfully loads tasks with their associated categories.
- **SC-003**: API responses for tasks include correctly mapped category IDs.
- **SC-004**: 100% of task queries succeed when categories are involved.
