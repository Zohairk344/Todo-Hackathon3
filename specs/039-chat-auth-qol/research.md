# Research & Technical Decisions

## Authentication & Cookies

### Decision: Cross-Domain Cookie Handling
*   **Context**: Frontend is on Vercel (e.g., `app.vercel.app`), Backend is on Hugging Face (e.g., `app.hf.space`). These are different domains.
*   **Choice**: Use `SameSite=None; Secure; HttpOnly`.
*   **Rationale**: `SameSite=Lax` (default) blocks cookies on cross-site subrequests (like Fetch/XHR) unless the top-level navigation matches. Since the API is on a different domain, `SameSite=None` is required to allow the browser to send the cookie. This *mandates* `Secure=True` (HTTPS).
*   **Implementation**: `response.set_cookie(..., samesite="none", secure=True, httponly=True)`.

### Decision: Auth Response Schema
*   **Context**: The frontend uses a typed client (likely generated or manual) that expects specific fields on the User object to avoid "undefined" errors.
*   **Choice**: Explicitly map `User` model to a JSON dict.
*   **Rationale**: The `User` SQLModel has `email_verified` (snake_case). The frontend expects `emailVerified` (camelCase). Explicit mapping in `auth.py` is safer than relying on auto-serialization which might miss aliases.

## Chat Architecture

### Decision: HTTP Polling/Fetch vs WebSockets
*   **Context**: Chat is a secondary feature; high reliability and simplicity are preferred over sub-millisecond latency.
*   **Choice**: Standard HTTP `POST` and `GET`.
*   **Rationale**: Hugging Face Spaces handles HTTP requests robustly. WebSockets can be tricky with timeouts and connection drops on serverless/containerized environments. Given the P3 priority of "Real-time updates", triggering a `router.refresh()` after an HTTP POST is a much simpler and "stateless" approach than managing socket connections.

### Decision: Client-Side Fetch
*   **Context**: Next.js Server Actions vs Client Fetch.
*   **Choice**: Client-side `fetch` inside `useEffect`.
*   **Rationale**: To pass the **browser-scoped** HttpOnly cookie, the request *must* originate from the browser. Server Components (RSC) cannot easily forward these cookies to a third-party domain without complex middleware. Client-side fetch with `credentials: "include"` is the standard pattern for this architecture.
