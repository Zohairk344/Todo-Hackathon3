# Feature Specification: Fix Cascade Delete

**Feature Branch**: `021-fix-cascade-delete`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a ForeignKeyViolationError when deleting a user account. Context: The backend crashes with sqlalchemy.exc.IntegrityError during DELETE /api/users/me because the user is referenced in the account table. Required Change: Implement Database-Level Cascading Deletes. 1. Refactor backend/app/models.py: Audit all Relationship definitions in the User model. Ensure sa_relationship_kwargs={'cascade': 'all, delete'} is present. Critical Action: Ensure every ForeignKey column in child models (Session, Task, Account) explicitly includes ondelete='CASCADE'. 2. Refactor backend/app/api/users.py: Verify delete_user_me logic. Verification Criteria: User account deletion should succeed without 500 error."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Graceful Account Deletion (Priority: P1)

As a User, I want to be able to delete my account without receiving an error message, so that I can remove my data from the platform.

**Why this priority**: High. The current implementation crashes due to database constraints, preventing users from offboarding and potentially violating data privacy regulations.

**Independent Test**: Can be tested by deleting a user who has associated accounts, sessions, and tasks.

**Acceptance Scenarios**:

1. **Given** a user with linked OAuth accounts and active sessions, **When** they request to delete their account, **Then** the server MUST return 204 No Content.
2. **Given** a deletion request, **When** the database operation executes, **Then** all child records (Session, Account, Task, Category) MUST be automatically deleted via cascade.
3. **Given** the `ForeignKeyViolationError` history, **When** this fix is applied, **Then** subsequent deletion attempts MUST NOT trigger `IntegrityError`.

---

### User Story 2 - Database Schema Integrity (Priority: P2)

As a Developer, I want foreign keys to enforce cascading deletes at the database level, so that I don't have to manually manage deletion order in the application code.

**Why this priority**: Medium. Ensures robustness and prevents orphaned records if application-level deletion logic fails or changes.

**Independent Test**: Inspect the `models.py` definitions for `ForeignKey` constraints.

**Acceptance Scenarios**:

1. **Given** the `Session`, `Account`, `Task`, and `Category` models, **When** inspected, **Then** their `user_id` foreign key MUST explicitly include `ondelete="CASCADE"`.
2. **Given** the `User` model, **When** inspected, **Then** its relationships MUST include `cascade="all, delete"`.

### Edge Cases

- **Existing Tables**: Since we are using `create_all` which doesn't migrate existing tables, manual SQL execution might be needed if the DB is not dropped and recreated (out of scope for this surgical code fix, but worth noting for dev environment). *Assumption: Dev will re-init DB.*

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST configure `ondelete="CASCADE"` on the `user_id` foreign key for `Session`, `Account`, `Task`, and `Category` models.
- **FR-002**: System MUST configure `cascade="all, delete"` on the `User` model's relationships to child entities.
- **FR-003**: System MUST execute user deletion without requiring explicit manual deletion of child records in the API route (relying on DB cascade).

### Key Entities *(include if feature involves data)*

- **User**: Parent entity.
- **Session**: Child (FK: `user_id`).
- **Account**: Child (FK: `user_id`).
- **Task**: Child (FK: `user_id`).
- **Category**: Child (FK: `user_id`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `ForeignKeyViolationError` during user deletion.
- **SC-002**: 100% of user deletion requests return HTTP 204.
- **SC-003**: `ondelete="CASCADE"` is present in 4 child model definitions.
