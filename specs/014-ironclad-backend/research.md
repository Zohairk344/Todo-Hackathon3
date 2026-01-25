# Research: Ironclad Backend

## Decisions

### 1. Better-Auth Cookie Name
*   **Decision**: Use `better-auth.session_token`.
*   **Rationale**: This is the default cookie name used by the `better-auth` library.
*   **Verification**: Verified against frontend usage in `specs/014-ironclad-backend/spec.md` (implied) and standard library docs.

### 2. Startup Lifecycle
*   **Decision**: Use `contextlib.asynccontextmanager` for the `lifespan` handler in FastAPI.
*   **Rationale**: Deprecated `@app.on_event("startup")` is replaced by `lifespan` in newer FastAPI versions. It allows for cleaner setup/teardown logic (e.g., closing DB pool).

### 3. CORS Configuration
*   **Decision**: Load `FRONTEND_URL` from environment, default to `http://localhost:3000` for dev.
*   **Rationale**: Hardcoding is brittle.

## Implementation Details

*   **SQLAlchemy Mapping**:
    ```python
    user_id: str = Field(sa_column=Column("userId", Text, ForeignKey("user.id"), nullable=False))
    ```
    *Note: `create_type=False` might be needed for Enums if using Postgres.*

