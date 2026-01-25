# Research: Fix User Defaults

## Decisions

### 1. Database Nullability
*   **Decision**: Set `nullable=True` for `theme` and `fontSize` columns.
*   **Rationale**: Better-Auth does not support injecting custom fields during its core user creation process without custom adapters. Making the DB columns nullable is the most robust way to support the default sign-up flow.
*   **Verification**: Postgres logs confirmed the `not-null constraint` violation.

### 2. Default Values Strategy
*   **Decision**: Keep Python-side `default="system"` and `default="medium"`.
*   **Rationale**: This ensures that when the application reads the user object, it gets a valid default value even if the database has `NULL`. This provides a seamless experience for the frontend without requiring DB-level defaults (which would require a migration or `server_default` which `create_all` might miss on existing tables).

## Implementation Details

*   **Target File**: `todo-hackathon3/app/models.py`
*   **Target Class**: `User`
*   **Change**: Update `theme` and `font_size` fields.
