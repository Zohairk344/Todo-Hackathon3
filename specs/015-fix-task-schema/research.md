# Research: Task Model Schema Fix

## Decisions

### 1. Column Name Alignment
*   **Decision**: Map `due_date` Python attribute to `due_date` database column.
*   **Rationale**: The database error `column task.dueDate does not exist` and the hint `Perhaps you meant to reference the column "task.due_date"` confirms that the table was created with snake_case for this application field.
*   **Verification**: Postgres error logs explicitly state the expected column name.

### 2. Implementation Pattern
*   **Decision**: Use `sa_column=Column("due_date", DateTime, nullable=True)`.
*   **Rationale**: This ensures SQLModel uses the explicit snake_case column name in the generated SQL queries, overriding any default naming conventions that might favor camelCase.

## Implementation Details

*   **Target File**: `todo-hackathon3/app/models.py`
*   **Target Line**: Locate `due_date` in `Task` class and update the `sa_column` name.