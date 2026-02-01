# Research: Cross-Domain Client-Side Authentication

## Decision: Client-Side AuthProvider with React Context

### Rationale
In a cross-domain setup (Vercel frontend, Hugging Face backend), server-side rendering (SSR) on Vercel cannot access `HttpOnly` cookies set for the Hugging Face domain. By moving authentication to the client, the browser automatically includes these cookies in requests to the backend when `credentials: "include"` is used. React Context provides a clean, centralized way to manage this state and avoid "prop drilling" user data to deep components like `UserNav` and `ClientChatWrapper`.

### Implementation Patterns
1. **AuthProvider**: A wrapper component that fetches the session on mount and provides `user` and `loading` state.
2. **Loading State**: A full-screen overlay that renders *instead* of the dashboard content while `loading` is true, preventing Flash of Unauthenticated Content (FOUC).
3. **Redirect Logic**: Using `useRouter` from `next/navigation` to push to `/sign-in` if the session check returns 401/403.

## Decision: Fetch with `credentials: "include"`

### Rationale
This is the standard web API mechanism for cross-site requests to include cookies. The backend must be configured with `Access-Control-Allow-Credentials: true` and the specific origin of the Vercel app.

## Alternatives Considered

### Alternative 1: Server-Side Proxy (Next.js API Routes)
- **Description**: Frontend calls its own API, which then calls the backend.
- **Why Rejected**: Adds latency and complexity. The Vercel API would still need to receive a session token (via cookie or header) to authenticate with the backend, which brings us back to the original problem if cookies are cross-domain and `HttpOnly`.

### Alternative 2: JWT in LocalStorage
- **Description**: Store a session token in LocalStorage instead of cookies.
- **Why Rejected**: Significantly less secure than `HttpOnly` cookies (vulnerable to XSS). The project's "Ironclad" constitution favors secure defaults.

## Error Taxonomy
- `AUTH_SESSION_EXPIRED`: 401 Unauthorized
- `AUTH_BACKEND_UNREACHABLE`: Network failure/5xx
- `AUTH_FORBIDDEN`: 403 Forbidden
