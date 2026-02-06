---
id: "0001"
title: "Switch to Token-Based Auth"
stage: "green"
date: "2026-02-06"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "047-token-auth"
branch: "047-token-auth"
user: "zohair"
command: "/sp.implement"
labels: ["auth", "token", "bearer", "localStorage"]
links:
  spec: "specs/047-token-auth/spec.md"
  plan: "specs/047-token-auth/plan.md"
  tasks: "specs/047-token-auth/tasks.md"
files:
  - todo-hackathon3/app/api/routes/auth.py
  - todo-hackathon3/app/api/deps.py
  - frontend/lib/api.ts
  - frontend/context/auth-context.tsx
  - frontend/app/(auth)/sign-in/page.tsx
  - frontend/app/(auth)/sign-up/page.tsx
  - frontend/components/dashboard/user-nav.tsx
  - frontend/app/layout.tsx
  - frontend/app/(auth)/layout.tsx
  - frontend/app/dashboard/layout.tsx
tests:
  - "Manual verification of login/signup/logout flow"
---

## Prompt
$ARGUMENTS (Switching from Cookie-Based Auth to Token-Based Auth (Bearer Token) to resolve persistent Cross-Domain Cookie blocking on Vercel.)

## Response
Switched authentication from cookie-based to token-based (Bearer token) stored in `localStorage`. 

### Key Changes:
- **Backend**: Updated `auth.py` to return `access_token` in response body and handle `OAuth2PasswordRequestForm`. Standardized fallback cookie to `access_token`.
- **Backend**: Updated `deps.py` to support `access_token` and `session_token` cookies alongside `Authorization` header.
- **Frontend**: Updated `api.ts` to automatically inject `Authorization: Bearer <token>` from `localStorage` into all requests.
- **Frontend**: Refactored `AuthContext` to manage token persistence and provide `signIn`, `signUp`, and `signOut` methods.
- **Frontend**: Updated `SignInPage`, `SignUpPage`, and `UserNav` to utilize the new centralized `AuthContext`.
- **Frontend**: Cleaned up layout structure by moving `AuthProvider` to `RootLayout`.
- **Frontend**: Removed `better-auth` local catch-all route to ensure authentication requests are proxied to the FastAPI backend.

### Outcome
Authentication is now stateless on the client (using Bearer tokens), bypassing cross-domain cookie issues while maintaining a secure fallback for compatible environments.

## Evaluation
- [X] Token returned in sign-in/sign-up body
- [X] Token saved to localStorage
- [X] Token attached to subsequent API calls
- [X] Auth state preserved across page reloads
- [X] Better-auth conflict resolved