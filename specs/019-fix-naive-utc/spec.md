# Feature Specification: Fix Naive UTC Timestamps

**Feature Branch**: `019-fix-naive-utc`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a DataError when updating tasks. Context: asyncpg.exceptions.DataError: invalid input for query argument $2. Offset-naive vs offset-aware timestamp mismatch. Refactor backend/app/models.py: Update all DateTime fields to use datetime.utcnow or a naive UTC factory. Remove timezone-aware defaults. Refactor backend/app/api/routes/tasks.py: Ensure task.updated_at is set to a naive UTC datetime. Refactor backend/app/api/deps.py: Use naive UTC for session expiration checks."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Stable Task Updates (Priority: P1)

As a User, I want to mark tasks as complete or update their details without the application crashing, so that my task list reflects my actual progress.

**Why this priority**: High. Currently, any attempt to update a task (like checking it off) crashes the server with a 500 error due to timestamp format mismatches.

**Independent Test**: Can be tested by creating a task and then marking it as complete via the API or Dashboard.

**Acceptance Scenarios**:

1. **Given** an existing task, **When** I toggle its completion status, **Then** the server MUST return 200 OK and the task MUST be updated in the database.
2. **Given** a task update request, **When** the backend saves the `updated_at` timestamp, **Then** no `DataError` or `TypeError` related to timezone offsets MUST occur.

---

### User Story 2 - Consistent Timestamp Handling (Priority: P2)

As a Developer, I want all datetime handling in the backend to consistently use naive UTC timestamps, so that I don't encounter offset mixing errors in the future.

**Why this priority**: Medium. Ensures system-wide stability and prevents regression.

**Independent Test**: Inspect the `models.py`, `deps.py`, and `routes/tasks.py` files to verify that all `datetime.now()` calls use naive UTC logic.

**Acceptance Scenarios**:

1. **Given** any datetime field in `models.py`, **When** a default value is generated, **Then** it MUST be a naive UTC timestamp (e.g., using `datetime.utcnow`).
2. **Given** the `get_current_user` dependency, **When** validating session expiry, **Then** it MUST compare against a naive UTC timestamp.

### Edge Cases

- **Timezone Conversion**: Ensure that any input from the frontend (which might be ISO 8601 with offset) is correctly handled or that the backend strictly enforces naive UTC internally.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use naive UTC timestamps for all `DateTime` fields in `models.py`.
- **FR-002**: System MUST use naive UTC timestamps when setting `updated_at` in `tasks.py` routes.
- **FR-003**: System MUST use naive UTC timestamps when checking session expiration in `deps.py`.
- **FR-004**: System MUST NOT mix offset-naive and offset-aware datetimes in comparisons or database writes.

### Key Entities *(include if feature involves data)*

- **Task**: `created_at`, `updated_at` (Naive UTC).
- **Session**: `expires_at` (Naive UTC).
- **User**: `created_at`, `updated_at` (Naive UTC).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `asyncpg.exceptions.DataError` or `TypeError` related to timezone offsets.
- **SC-002**: 100% of task update/toggle requests return HTTP 200 OK.
- **SC-003**: All internal datetime generation uses a consistent naive UTC pattern.
