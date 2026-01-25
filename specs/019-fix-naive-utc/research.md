# Research: Fix Naive UTC Timestamps

## Decisions

### 1. Naive UTC Standard
*   **Decision**: Use `datetime.utcnow()` (or equivalent `datetime.now(timezone.utc).replace(tzinfo=None)`).
*   **Rationale**: `asyncpg` and SQLAlchemy throw errors when comparing or assigning offset-aware datetimes to offset-naive columns. Since we are using `TIMESTAMP WITHOUT TIME ZONE` (the default in SQLModel without `sa_column_args`), we must ensure Python sends naive datetimes that implicitly represent UTC.
*   **Note**: `datetime.utcnow()` is deprecated in Python 3.12+, so the preferred modern pattern is `datetime.now(timezone.utc).replace(tzinfo=None)` or using a custom factory function.

### 2. Implementation Pattern
*   **Models**: `default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None)`.
*   **Routes**: `task.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)`.
*   **Deps**: `now = datetime.now(timezone.utc).replace(tzinfo=None)`.

## Implementation Details

*   **Target Files**: `todo-hackathon3/app/models.py`, `todo-hackathon3/app/api/deps.py`, `todo-hackathon3/app/api/routes/tasks.py`.
