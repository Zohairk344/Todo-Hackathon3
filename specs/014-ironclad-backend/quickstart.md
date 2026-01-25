# Quickstart: Ironclad Backend

## Prerequisites
*   Python 3.10+
*   PostgreSQL (Neon) running
*   `.env` file configured with `DATABASE_URL` and `BETTER_AUTH_SECRET`

## Installation

```bash
cd todo-hackathon3
uv pip install -r requirements.txt
```

## Running the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 7860
```

## Verification

1.  **Check Tables**: Connect to DB and verify `user`, `task`, `session` tables exist with camelCase columns (e.g., `emailVerified`).
2.  **Check Auth**:
    *   **Header**: `curl -H "Authorization: Bearer <token>" http://localhost:7860/api/tasks`
    *   **Cookie**: Use browser dev tools to set `better-auth.session_token` and visit `http://localhost:7860/api/tasks` directly.
