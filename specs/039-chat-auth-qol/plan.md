# Implementation Plan - Chat System & Authentication QOL

**Status**: In Progress
**Branch**: `039-chat-auth-qol`

## Technical Context

**Ambiguities & Risks**:
*   **CORS Configuration**: The frontend requires `credentials: "include"` to pass cookies. We must ensure `backend/app/main.py` has `CORSMiddleware` configured with `allow_credentials=True` and appropriate `allow_origins`.
*   **Cookie Domain**: Setting `samesite="none"` requires `secure=True`. This implies the backend must be accessed via HTTPS (which Hugging Face Spaces provides). Local development might need adjustments if accessing via HTTP, but `localhost` usually permits this.
*   **User Model Fields**: The `User` model has `image` and `email_verified`. We need to ensure the auth response explicitly sets these.

## Constitution Check

**Compliance Matrix**:
*   **Tech Stack**: Next.js 14, Python 3.10, SQLModel, Better-Auth (Cookie-based). ✅
*   **Ironclad DB**: No schema changes required. `User`, `Conversation`, `Message` tables already exist and follow naming conventions. ✅
*   **Auth**: Hardening the auth response to match the "Ironclad" schema requirements (`userId` vs `user_id` translations handled in `auth.py`). ✅
*   **Architecture**: Chat logic isolated in `chat.py`. ✅
*   **Verification**: Added specific verification steps for each phase. ✅

## Phase 0: Outline & Research

### Decisions
*   **Auth Response Format**: We will manually construct the dictionary in `auth.py` to ensure exact matching with the frontend's expected `Better-Auth` client schema.
*   **Sign Out Strategy**: We will use a dedicated `POST /sign-out` endpoint to aggressively clear cookies using `samesite="none"` and `secure=True` to handle the cross-domain nature of the deployment (Vercel Frontend <-> HF Backend).
*   **Chat History**: We will use the existing `Conversation` and `Message` tables.
*   **Communication**: Standard HTTP `fetch` with `credentials: "include"` is sufficient and robust for this use case.

## Phase 1: Design & Contracts

### Data Model
*   **User**: Existing.
*   **Conversation**: Existing.
*   **Message**: Existing.
*   *Note*: No database migration required.

### API Contracts
*   `POST /api/auth/sign-out`: Clears session cookies.
*   `GET /api/{userId}/chat`: Returns list of messages `[{ role, content }]`.
*   `POST /api/{userId}/chat`: Accepts `{ message }`, returns `{ response }`.

## Phase 2: Core Implementation (Backend)

### Task 2.1: Auth Hardening
*   **File**: `todo-hackathon3/app/api/routes/auth.py`
*   **Action**: Update `format_auth_response` to include `image` and `emailVerified`.
*   **Action**: Implement `POST /sign-out` with robust cookie deletion.
*   **Verification**:
    *   Run `tests/test_auth_routes.py` (if exists) or create a temporary script `tests/sanity_auth.py` to hit the endpoints and check headers.

### Task 2.2: Verify Chat Endpoints
*   **File**: `todo-hackathon3/app/api/routes/chat.py`
*   **Action**: No code changes expected if existing code matches requirements. Verify imports and routing.
*   **Verification**: Ensure `api/routes/chat.py` is included in `api/routes/__init__.py` (or main router).

## Phase 3: Core Implementation (Frontend)

### Task 3.1: Chat Widget
*   **File**: `frontend/components/dashboard/chat-widget.tsx`
*   **Action**: Create the component using `fetch` with `credentials: "include"`.
*   **Verification**: Component builds without TypeScript errors.

### Task 3.2: Chat Wrapper
*   **File**: `frontend/components/dashboard/client-chat-wrapper.tsx`
*   **Action**: Implement wrapper to handle `router.refresh()`.

### Task 3.3: User Nav
*   **File**: `frontend/components/dashboard/user-nav.tsx`
*   **Action**: Create user menu with "Sign Out" button.

### Task 3.4: Integration
*   **File**: `frontend/app/dashboard/layout.tsx` (or `page.tsx`)
*   **Action**: Add `ClientChatWrapper`.
*   **File**: `frontend/components/dashboard/header.tsx` (if exists)
*   **Action**: Integrate `UserNav`.

## Phase 4: Verification
*   **Protocol**:
    *   Build Frontend: `npm run build` to catch type errors.
    *   Sanity Check Backend: Ensure `POST /sign-out` returns `Set-Cookie` headers with `Max-Age=0`.
    *   Manual Test: Log in, open chat, send message, log out.