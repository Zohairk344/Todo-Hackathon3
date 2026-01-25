# Research: Fix Task Timestamps

## Decisions

### 1. Pydantic Aliasing
*   **Decision**: Use `Field(alias="createdAt")` and `Field(alias="updatedAt")`.
*   **Rationale**: This instructs Pydantic to use the camelCase name when serializing to JSON (dumping) and when validating from input that uses the alias.

### 2. Population Strategy
*   **Decision**: Enable `populate_by_name=True` in `model_config`.
*   **Rationale**: This is critical. Without this, Pydantic (v2) will ONLY look for the alias name (`createdAt`) when creating the model instance. Since the SQLModel/SQLAlchemy object has snake_case attributes (`created_at`), validation fails. Enabling this allows Pydantic to read the snake_case attribute from the object and map it to the aliased field.

## Implementation Details

*   **Target File**: `todo-hackathon3/app/models.py`
*   **Target Class**: `TaskRead`
*   **Change**: Update `createdAt`/`updatedAt` fields and `Config`.