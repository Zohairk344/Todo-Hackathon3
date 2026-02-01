# Research: Dashboard Session Integration

## Decision: Server-Side Session Fetching in Dashboard Layout

### Finding: Backend Session Endpoint
The backend exposes a GET `/api/auth/get-session` endpoint in `todo-hackathon3/app/api/routes/auth.py`. 
It expects a `session_token` cookie or an `Authorization: Bearer <token>` header.
The response format is:
```json
{
    "token": "...",
    "session": { "userId": "...", ... },
    "user": { "id": "...", "email": "...", "name": "...", ... }
}
```

### Finding: Next.js Server Components
In Next.js 14+ App Router, `layout.tsx` is a Server Component by default. We can use `cookies()` from `next/headers` to retrieve the `session_token` and perform a server-side `fetch`.

### Finding: Environment Variables
The `NEXT_PUBLIC_API_URL` environment variable is available on the server and should be used to construct the backend URL.

### Finding: Existing API Utilities
`frontend/lib/api.ts` has a `fetchAPI` function, but it is primarily designed for client-side use (though it has some server-side logic). For the layout's initial session check, a direct `fetch` in the layout or a specialized server-side helper is preferred to ensure immediate redirect capability.

## Rationale
Using server-side fetching in the layout ensures that unauthenticated users are redirected *before* any dashboard content is rendered, providing better security and a smoother user experience (no "flash" of unauthorized content).

## Alternatives Considered
- **Client-side session check**: Rejected because it allows the dashboard to render briefly before redirecting and doesn't solve the `IntegrityError` for the chatbot's initial load if it relies on server-provided data.
- **Middleware protection**: While viable, implementing it in the `layout.tsx` allows for easy data propagation to all dashboard sub-pages and components without redundant session checks.
