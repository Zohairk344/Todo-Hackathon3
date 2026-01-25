# Feature Specification: Fix DateTime Offset Error

**Feature Branch**: `018-fix-datetime-offset`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a DateTime Offset Error in the Task model. Context: TypeError: can't subtract offset-naive and offset-aware datetimes... Required Change: Ensure all datetime fields in backend/app/models.py use sa_column=Column(..., DateTime(timezone=True), ...) to explicitly support timezones, OR convert to naive UTC before saving. Given the modern stack, switching to timezone-aware columns is preferred. Implementation: Update created_at, updated_at, and due_date in Task model (and potentially others) to use DateTime(timezone=True). Verification Criteria: Task updates should succeed without offset errors."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reliable Task Updates (Priority: P1)

As a User, I want to be able to complete or update my tasks without the application crashing, so that I can maintain an accurate to-do list.

**Why this priority**: High. Currently, marking a task as "done" triggers a 500 Internal Server Error due to a timezone mismatch between the application (timezone-aware) and the database (timezone-naive).

**Independent Test**: Can be tested by creating a task and then toggling its completion status via the API or UI.

**Acceptance Scenarios**:

1. **Given** an existing task, **When** I send a request to update its status to completed, **Then** the server MUST return 200 OK and the task status MUST be updated in the database.
2. **Given** a task update operation, **When** the `updated_at` timestamp is saved, **Then** no `TypeError: can't subtract offset-naive and offset-aware datetimes` should occur.

---

### User Story 2 - Consistent Timezone Handling (Priority: P2)

As a Developer, I want all datetime fields in the database to be explicitly timezone-aware (UTC), so that I don't face offset issues during comparisons or calculations in the future.

**Why this priority**: Medium. Prevents future bugs related to timezones and ensures the application is robust for users in different regions.

**Independent Test**: Inspect the `models.py` file to verify that `DateTime(timezone=True)` is used for all timestamp columns.

**Acceptance Scenarios**:

1. **Given** the `Task` model, **When** inspected, **Then** `created_at`, `updated_at`, and `due_date` columns MUST be defined with `DateTime(timezone=True)`.
2. **Given** the `User`, `Session`, and `Category` models, **When** inspected, **Then** their timestamp columns MUST also use `DateTime(timezone=True)` for consistency.

### Edge Cases

- **Existing Data**: Ensure that changing the column definition in the model doesn't break interactions with existing data (though a full DB migration script is out of scope for this surgical fix, the application logic must handle the read/write correctly). *Note: `sqlmodel` typically handles the conversion if the column type matches, but we are enforcing the schema definition.*

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use `DateTime(timezone=True)` for `created_at`, `updated_at`, and `due_date` columns in the `Task` model.
- **FR-002**: System MUST use `DateTime(timezone=True)` for timestamp columns in `User`, `Session`, `Account`, `Verification`, `Jwks`, and `Category` models to ensure consistency.
- **FR-003**: System MUST NOT raise `TypeError` related to offset-naive/aware subtraction when updating records.

### Key Entities *(include if feature involves data)*

- **Task**: 
    - `created_at`: `DateTime(timezone=True)`
    - `updated_at`: `DateTime(timezone=True)`
    - `due_date`: `DateTime(timezone=True)`
- **User/Session/Account/etc**: All timestamp fields updated to `DateTime(timezone=True)`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `TypeError: can't subtract offset-naive and offset-aware datetimes`.
- **SC-002**: 100% of task update/toggle requests return HTTP 200 OK.
- **SC-003**: All 7 models in `models.py` use `DateTime(timezone=True)` for their datetime columns.
