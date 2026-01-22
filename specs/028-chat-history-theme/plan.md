# Implementation Plan: Chat History & Theming

**Branch**: `028-chat-history-theme` | **Date**: 2026-01-22 | **Spec**: [specs/028-chat-history-theme/spec.md](spec.md)
**Input**: Feature specification from `/specs/028-chat-history-theme/spec.md`

## Summary

This feature addresses critical debugging and user experience issues in Phase 4. It enables persistent chat history by fixing API route mounting and implementing a missing GET endpoint, resolves CORS issues for local development, and integrates the application's visual theme (Dark/Light mode) into the Chat Widget.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), TypeScript/React (Frontend)
**Primary Dependencies**: FastAPI, SQLModel (Backend); Next.js, Tailwind CSS, next-themes (Frontend)
**Storage**: PostgreSQL (Neon) via `app.db` engine
**Testing**: Manual verification via `localhost:3000` and backend logs (as per spec constraints)
**Target Platform**: Web (Localhost)
**Project Type**: Full-stack (FastAPI + Next.js)

## Constitution Check

- [x] **Tech Stack**: Matches Constitution (FastAPI/React).
- [x] **Schema Rules**: No schema changes required (using existing `Conversation`, `Message` models).
- [x] **Verification Protocol**: Independent tests defined in Spec.

## Project Structure

### Documentation (this feature)

```text
specs/028-chat-history-theme/
├── plan.md              # This file
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Spec validation
```

### Source Code

```text
todo-hackathon3/app/
├── main.py              # Update: Fix router prefix & verify CORS
└── api/
    └── routes/
        └── chat.py      # Update: Fix route paths, add logging, verify GET logic

frontend/components/dashboard/
└── ChatWidget.tsx       # Update: Add useTheme hook & dark mode styles
```

## Implementation Steps

### 1. Backend: API Route & CORS Fixes

**Context**: 
- `app/main.py` currently mounts `chat.router` with `prefix="/api/chat"`.
- `app/api/routes/chat.py` defines routes as `/api/{user_id}/chat`.
- **Result**: The actual URL becomes `/api/chat/api/{user_id}/chat`, causing 404s for the frontend.

**Changes**:
1.  **Modify `todo-hackathon3/app/main.py`**:
    - Change the include statement for `chat.router` to remove the conflicting prefix or adjust it to match the route definition.
    - **Decision**: Remove `prefix` from `include_router` and rely on the explicit paths in `chat.py` (which are already `/api/{user_id}/chat`), OR change `chat.py` to be relative.
    - **Selected Approach**: Change `chat.py` routes to be relative to a clean prefix in `main.py` to follow FastAPI best practices, BUT given the "minimize refactor" mandate, it is safer to just **remove the prefix in `main.py`** since `chat.py` already hardcodes `/api/...`.
    - Verify `CORSMiddleware` includes `http://localhost:3000`.

2.  **Modify `todo-hackathon3/app/api/routes/chat.py`**:
    - Add `print()` or `logger.info()` statements at key failure points in `chat_endpoint` (Auth check, DB fetch, LLM call start, LLM call end).
    - Verify `get_chat_history` logic (already fetches last 10 and reverses). Ensure it handles the "no conversation" case gracefully (returns empty list).

### 2. Frontend: Theme Integration

**Context**:
- `ChatWidget.tsx` has hardcoded light-mode styles (`bg-white`, `text-gray-800`).
- It needs to respect the user's selected theme via `next-themes`.

**Changes**:
1.  **Modify `frontend/components/dashboard/ChatWidget.tsx`**:
    - Import `useTheme` from `next-themes`.
    - Retrieve `resolvedTheme`.
    - Update CSS classes with `dark:` variants as specified:
        - Container: `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`
        - Text: `text-gray-800 dark:text-gray-100`
        - Input: `bg-gray-50 dark:bg-gray-700 text-black dark:text-white`
        - Assistant Bubble: `bg-gray-100 dark:bg-gray-700`
        - User Bubble: Keep `bg-blue-600 text-white` (usually generic).
    - Ensure the "fetch history" call uses the correct URL (matching the Backend fix).

## Verification Plan

1.  **Start Backend**: `uv run main.py` (or docker).
2.  **Start Frontend**: `npm run dev`.
3.  **Test CORS & Connectivity**:
    - Send a message. Check browser console for network errors.
    - Expect 200 OK.
4.  **Test History**:
    - Refresh page.
    - Expect previous messages to appear.
5.  **Test Theming**:
    - Toggle Dark Mode.
    - Expect Chat Widget to turn dark gray/black.
6.  **Test Logging**:
    - Check backend terminal output.
    - Expect "[INFO] Processing chat for user..." logs.
