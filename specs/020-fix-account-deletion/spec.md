# Feature Specification: Fix Account Deletion

**Feature Branch**: `020-fix-account-deletion`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve an IntegrityError (ForeignKeyViolationError) when deleting an account... Required Change: Implement manual cascade delete for Account records in the delete_user_me endpoint."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Account Deletion (Priority: P1)

As a User, I want to be able to permanently delete my account and all associated data, so that I can leave the platform securely.

**Why this priority**: High. The feature is currently broken, returning a 500 Internal Server Error due to foreign key constraints, which prevents users from exercising their right to delete their data (GDPR/privacy compliance).

**Independent Test**: Can be tested by creating a user, creating tasks, and then requesting account deletion via the API or UI.

**Acceptance Scenarios**:

1. **Given** an authenticated user with linked Accounts (OAuth) and Sessions, **When** they request to delete their account, **Then** the server MUST return 204 No Content.
2. **Given** a successful deletion request, **When** the database is inspected, **Then** the User, their Sessions, Tasks, and Accounts MUST be removed.
3. **Given** the current codebase, **When** deleting a user, **Then** no `ForeignKeyViolationError` regarding the `account` table should occur.

---

### User Story 2 - Comprehensive Data Cleanup (Priority: P2)

As a Developer, I want to ensure that deleting a user removes ALL dependent records (Sessions, Tasks, Accounts) in the correct order, so that no orphaned data remains in the database.

**Why this priority**: Medium. Maintains database hygiene and integrity.

**Independent Test**: Review the `delete_user_me` function logic to ensure explicit deletion steps for all related tables.

**Acceptance Scenarios**:

1. **Given** the deletion logic, **When** executing, **Then** it MUST delete `Session` records -> `Task` records -> `Account` records -> `User` record (or any order that respects FK constraints).

### Edge Cases

- **Partial Failures**: If deletion fails halfway, the transaction should rollback (handled by `session.commit()` at the end).
- **No Linked Accounts**: The logic should handle users who signed up via email/password and have no `Account` records gracefully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST manually delete all `Account` records associated with the current user before deleting the User record.
- **FR-002**: System MUST delete `Session`, `Task`, and `Account` records within the same transaction as the User deletion.
- **FR-003**: System MUST return HTTP 204 No Content upon successful deletion.

### Key Entities *(include if feature involves data)*

- **User**: Parent entity.
- **Account**: Child entity (OAuth links). FK `userId`.
- **Session**: Child entity. FK `userId`.
- **Task**: Child entity. FK `userId`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `asyncpg.exceptions.ForeignKeyViolationError` during account deletion.
- **SC-002**: 100% of valid account deletion requests return HTTP 204.
- **SC-003**: Database queries for the deleted user ID return 0 results across all tables.
