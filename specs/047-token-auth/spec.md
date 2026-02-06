# Spec: Token-Based Authentication

## Context
Switching from Cookie-Based Auth to Token-Based Auth (Bearer Token) to resolve persistent Cross-Domain Cookie blocking on Vercel.

## Directives
1. Backend: Modify `auth.py` to return the `access_token` in the response body.
2. Frontend: Update `api.ts` to attach the token from LocalStorage to every request.
3. Frontend: Update `auth-context.tsx` to save the token upon login.
