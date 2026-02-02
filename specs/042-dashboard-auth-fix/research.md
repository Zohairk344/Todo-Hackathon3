# Research & Decisions: Fix Dashboard Authentication & Fetching

**Feature Branch**: `042-dashboard-auth-fix`
**Created**: 2026-02-02
**Status**: Completed

## 1. Technical Decisions

### Decision 1: Centralized API Client Wrapper
- **Choice**: Create `frontend/lib/api-client.ts` as a unified wrapper around `fetch`.
- **Rationale**: 
    - Enforces `credentials: "include"` globally, preventing the "missing cookie" issue.
    - Standardizes `Content-Type: application/json` headers.
    - Centralizes 401 error handling (redirect logic), avoiding repetitive code in every component.
    - Provides a single point of maintenance for future API changes (e.g., adding CSRF tokens).
- **Alternatives Considered**:
    - **Global Fetch Override**: Rejected as it can be brittle in Next.js App Router environments and might affect third-party fetches unexpectedly.
    - **Per-Component Fix**: Rejected as it is prone to human error (developers forgetting to add credentials) and increases technical debt.

### Decision 2: Service Layer Pattern
- **Choice**: Implement `frontend/services/todo-service.ts` to encapsulate business logic.
- **Rationale**:
    - Decouples UI components from direct API calls.
    - Makes testing easier (mocking the service vs. mocking `fetch`).
    - Improves code readability and reusability.
- **Alternatives Considered**:
    - **Direct Fetch in Components**: Current approach, which led to the inconsistency bugs we are fixing. Rejected.

### Decision 3: Context-Based State Management
- **Choice**: Create `frontend/context/tasks-context.tsx`.
- **Rationale**:
    - Provides a reactive source of truth for Tasks and Categories.
    - Eliminates "prop drilling".
    - Allows the service layer to update state efficiently across the dashboard.
- **Alternatives Considered**:
    - **SWR / React Query**: Valid robust options, but adding a new library might be overkill for this specific fix if a simple Context is sufficient and aligns with existing project patterns (e.g., `AuthContext`). We will stick to Context for now to minimize dependencies, but keep SWR in mind for future scaling.

### Decision 4: Client-Side Auth for Chat
- **Choice**: Retrieve User ID from `useAuth` Context.
- **Rationale**:
    - Ensures the Chat Widget uses the *client's* view of the session, preventing mismatches if the cookie is stale or missing on the initial server render.
    - Reactive: If the user logs out, the context updates, and the chat can react accordingly.

## 2. Unknowns & Clarifications (Resolved)

- **Task View Structure**: Verified `frontend/components/dashboard` contains `chat-widget.tsx`, `ChatWidget.tsx` (duplicate?), `client-chat-wrapper.tsx`, `Header.tsx`, `user-nav.tsx`. It seems the actual Task List component might be in `frontend/components/task-list.tsx` (based on root file list) or `frontend/app/dashboard/page.tsx` directly. The plan assumes a standard refactor regardless of exact location.
- **Unknown**: Duplicate Chat Widgets? (`chat-widget.tsx` vs `ChatWidget.tsx`).
    - **Resolution**: We will inspect `client-chat-wrapper.tsx` to see which one is actually used and ensure that specific one gets the fix.

## 3. Best Practices (Next.js & FastAPI)

- **API Routes**: Next.js App Router client components should use absolute paths or relative paths to the public API URL. Since the backend is separate (FastAPI), we need to ensure the `api-client.ts` points to the correct backend URL (proxied or direct). The project seems to use a proxy or direct fetch. We will assume standard `/api/...` paths if a rewrite is in place, or the full backend URL if configured via env vars.
- **Environment Variables**: Use `NEXT_PUBLIC_API_URL` if defined, otherwise fallback to relative paths for proxying.
