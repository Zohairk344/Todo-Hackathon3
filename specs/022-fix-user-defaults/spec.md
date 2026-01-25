# Feature Specification: Fix User Defaults

**Feature Branch**: `022-fix-user-defaults`  
**Created**: 2026-01-17  
**Status**: Draft  
**Input**: User description: "Update speckit.md to resolve a Critical Validation Error in the User model during sign-up. Context: Better-Auth is failing to create users because the 'theme' and 'font_size' columns in the database have a NOT NULL constraint, but the sign-up payload from Better-Auth does not include these fields... Required Change: Update the User model in backend/app/models.py to make 'theme' and 'font_size' optional in the database by setting nullable=True in the sa_column definition."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Sign-Up (Priority: P1)

As a New User, I want to create an account successfully without encountering server errors, so that I can start using the application.

**Why this priority**: High. Sign-up is the entry point for all users. Currently, it is completely blocked by a database constraint violation.

**Independent Test**: Can be tested by attempting to sign up via the frontend form or API using Better-Auth.

**Acceptance Scenarios**:

1. **Given** a new user registration request, **When** the Better-Auth library attempts to insert the user record, **Then** the database MUST accept `NULL` values for `theme` and `fontSize` columns.
2. **Given** a successful sign-up, **When** the user profile is fetched, **Then** the `theme` and `font_size` fields should default to "system" and "medium" respectively (handled by Python model defaults or nullable logic).

---

### User Story 2 - Backward Compatibility (Priority: P2)

As a Developer, I want to ensure that existing users (if any) or users created via other methods are not affected by this change, maintaining system stability.

**Why this priority**: Medium. Ensures that relaxing the constraint doesn't break existing assumptions in the code.

**Independent Test**: Verify the `models.py` schema definition.

**Acceptance Scenarios**:

1. **Given** the `User` model, **When** inspected, **Then** `theme` and `font_size` fields MUST be defined as `Optional[str]` with `nullable=True` in their `sa_column`.

### Edge Cases

- **Partial Updates**: Ensure that patching the user profile still allows updating these fields from null to a specific value later.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow `NULL` values for the `theme` column in the `user` table.
- **FR-002**: System MUST allow `NULL` values for the `fontSize` column in the `user` table.
- **FR-003**: System MUST provide default values ("system", "medium") at the application level if these fields are `NULL` in the DB.

### Key Entities *(include if feature involves data)*

- **User**:
    - `theme`: Text, Nullable=True.
    - `font_size`: Text, Nullable=True (mapped to `fontSize`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 occurrences of `null value in column "theme" of relation "user" violates not-null constraint`.
- **SC-002**: 100% of valid sign-up requests return HTTP 200 OK.
