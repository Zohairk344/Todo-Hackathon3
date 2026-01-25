# Feature Specification: Fix Task Timestamps

**Feature Branch**: `017-fix-task-timestamps`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a ResponseValidationError in the Tasks API. Context: fastapi.exceptions.ResponseValidationError: 3 validation errors. Fields createdAt and updatedAt are missing. Align Pydantic Schemas in backend/app/models.py. Target Schema: TaskRead. Action: Update timestamp fields to use Pydantic aliases. Implementation: createdAt: datetime = Field(alias='createdAt'), updatedAt: datetime = Field(alias='updatedAt'). Crucial Configuration: Add populate_by_name=True to TaskRead model_config."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Valid Task Retrieval (Priority: P1)

As a User, I want to view my task list without seeing "500 Internal Server Error" messages, so that I can see when I created and last updated my tasks.

**Why this priority**: High. The current schema mismatch prevents the dashboard from loading any tasks, rendering the core application feature broken.

**Independent Test**: Can be tested by creating a task and then retrieving the task list via `GET /api/{user_id}/tasks`.

**Acceptance Scenarios**:

1. **Given** a user has created tasks, **When** they request their task list, **Then** the server MUST return a 200 OK response with a list of tasks.
2. **Given** a successful task response, **When** the JSON is inspected, **Then** it MUST contain `createdAt` and `updatedAt` keys (camelCase) populated with valid timestamps.
3. **Given** the backend Pydantic models, **When** validating a task object with snake_case attributes (`created_at`, `updated_at`), **Then** it MUST successfully serialize to the alias names.

---

### User Story 2 - Consistent API Schema (Priority: P2)

As a Frontend Developer, I expect the API to return consistent camelCase property names for all timestamp fields, so that my TypeScript interfaces match the backend response.

**Why this priority**: Medium. Ensures long-term consistency and prevents regression where snake_case might leak into the JSON response.

**Independent Test**: Verify the OpenAPI schema (or JSON response) explicitly defines `createdAt` and `updatedAt` instead of `created_at` and `updated_at`.

**Acceptance Scenarios**:

1. **Given** the `TaskRead` schema, **When** serialized, **Then** `created_at` MUST be hidden and only `createdAt` exposed.

### Edge Cases

- **Missing Timestamps**: Ensure that if `updated_at` is somehow null in the DB (though unlikely per schema), the response handles it gracefully (or the schema enforces non-null as per current definition).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST alias `created_at` to `createdAt` in the `TaskRead` Pydantic model.
- **FR-002**: System MUST alias `updated_at` to `updatedAt` in the `TaskRead` Pydantic model.
- **FR-003**: System MUST configure `populate_by_name=True` (or Pydantic v2 equivalent) in `TaskRead` to allow instantiation from snake_case ORM attributes.
- **FR-004**: System MUST ensure that `GET /api/{user_id}/tasks` does not raise `ResponseValidationError` for valid task records.

### Key Entities *(include if feature involves data)*

- **TaskRead**: 
    - `createdAt`: Serialized output of `created_at`.
    - `updatedAt`: Serialized output of `updated_at`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `fastapi.exceptions.ResponseValidationError` related to missing `createdAt` or `updatedAt` fields.
- **SC-002**: 100% of task retrieval requests return HTTP 200 OK.
- **SC-003**: API responses consistently use camelCase for timestamps (`createdAt`, `updatedAt`).
