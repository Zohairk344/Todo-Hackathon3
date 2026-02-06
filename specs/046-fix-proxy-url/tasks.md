# Implementation Tasks: Fix Proxy URL and Auth

**Feature**: `046-fix-proxy-url`
**Status**: Completed

## Phase 1: Core Implementation
*Goal: Fix the API client to use relative paths and correct proxy configuration.*

- [x] T001 Create `frontend/lib/api.ts` with strict relative path configuration (BASE_URL = "").
- [x] T002 Update `frontend/next.config.mjs` to ensure correct proxy rewrites to `https://asdadsshu768-todo-hackathon3.hf.space`.

## Phase 2: Refactoring & Integration
*Goal: Ensure all API calls use the new relative path client or relative URLs.*

- [x] T003 Update `frontend/services/todo-service.ts` to import `apiRequest` from `@/lib/api`.
- [x] T004 Update `frontend/context/auth-context.tsx` to use relative path `/api/auth/get-session` instead of `API_URL` (fixing the bypassed proxy).
- [x] T005 [Bonus] Updated `frontend/components/dashboard/chat-widget.tsx` and `frontend/components/dashboard/user-nav.tsx` to use relative paths for API calls.

## Phase 3: Verification
*Goal: Verify that requests go through the proxy.*

- [x] T006 Manual Verification: Confirmed imports and configuration via grep.