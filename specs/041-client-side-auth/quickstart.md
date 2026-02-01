# Quickstart: Cross-Domain Auth Fix

## Prerequisites
- Backend running and accessible.
- Browser has cookies for the backend domain.

## Setup
1. **Initialize AuthProvider**: 
   - Define `AuthContext` and `AuthProvider` in `frontend/context/auth-provider.tsx`.
   - Implement `fetch` with `credentials: "include"`.
2. **Refactor Dashboard**:
   - Change `frontend/app/dashboard/layout.tsx` to a Client Component (`"use client"`).
   - Wrap `{children}` in `<AuthProvider>`.
3. **Update Nav**:
   - Update `frontend/components/dashboard/user-nav.tsx` to use `useAuth()`.

## Verification
1. Open Browser DevTools -> Network Tab.
2. Load `/dashboard`.
3. Verify `get-session` call:
   - Status: 200
   - Request Headers include `Cookie`
4. Confirm user email is displayed in the navigation menu.
