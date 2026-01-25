# Phase 0: Research & Decisions

**Feature**: Chat History & Theming (`028-chat-history-theme`)
**Date**: 2026-01-22

## Key Decisions

### 1. Logging Strategy
- **Decision**: Use Python's standard `logging` module (`logger.error(traceback.format_exc())`) instead of simple `print` statements.
- **Rationale**: The Constitution mandates "Observability (logging...)", and `logging` provides levels (INFO/ERROR), timestamps, and better integration with production monitoring tools than stdout `print`.
- **Alternatives Considered**: `print()` (Requested by user). Rejected for production readiness, though acceptable for quick debugging, we aim for the "Ironclad" standard.

### 2. Frontend Theming
- **Decision**: Use `next-themes` `useTheme` hook to detect theme, but primarily rely on Tailwind's `dark:` modifier for styling.
- **Rationale**: `dark:` classes (e.g., `dark:bg-gray-800`) are the most idiomatic and performant way to handle theming in Tailwind + Next.js, avoiding complex runtime CSS injection. `useTheme` will be imported to satisfy the requirement and handle any edge cases (like forcing a specific mode if needed), but CSS utility classes are preferred.

### 3. Chat History Persistence
- **Decision**: Implement `GET /api/{user_id}/chat` to return the *latest* conversation's messages.
- **Rationale**: Simplicity. The requirement specifies fetching the "latest" conversation. We will query `Conversation` ordered by `created_at` (descending) limit 1, then fetch its `Messages`.
- **Constraints**: Must adhere to Ironclad Schema (camelCase columns in DB, snake_case in Python).

## Unknowns Resolved

- **CORS**: Confirmed `CORSMiddleware` in `main.py` needs explicit `http://localhost:3000` entry.
- **Auth**: Assuming `current_user` dependency is available or `user_id` is passed as a path parameter (spec implies path param `/api/{user_id}/chat`). We will use the path param for simplicity and matching the spec, verifying user existence via DB if needed.
