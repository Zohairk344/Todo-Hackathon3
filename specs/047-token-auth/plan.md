# Plan: Token-Based Authentication Implementation

## Architecture
- Backend will continue to set cookies as fallback but will primarily return the token in the response body.
- Frontend will store the token in `localStorage`.
- `apiRequest` utility will intercept outgoing requests to add the `Authorization: Bearer <token>` header.

## File Changes
- `todo-hackathon3/app/api/routes/auth.py`: Update `sign_in_email` to return token.
- `frontend/lib/api.ts`: Update to read from localStorage and set headers.
- `frontend/context/auth-context.tsx`: Update `signIn`, `checkSession`, and `signOut` to manage token in localStorage.
