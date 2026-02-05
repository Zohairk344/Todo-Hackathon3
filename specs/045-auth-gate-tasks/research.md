# Research: Authentication Gate for Tasks

## Decision: Gating TasksProvider with `authLoading`

**Rationale**: The current issue stems from a race condition where the `TasksProvider` and its children (the Dashboard) mount and trigger data fetching before the `AuthContext` has completed its `/api/auth/get-session` call. By the time the dashboard is visible, the browser might not have fully established the session cookie, leading to 401 errors.

**Implementation Choice**: 
- Consume `loading` (aliased as `authLoading`) from `useAuth`.
- Return a centered `<Loader2 />` spinner if `authLoading` is true.
- Return `null` if `authLoading` is false but `user` is null (preventing accidental renders before redirect).
- Add guard clauses `if (!user || authLoading) return;` to all async functions in the context.

## Alternatives Considered

### 1. Simple `if (!user) return;` check in `useEffect`
- **Why Rejected**: This is the current state (or close to it). It doesn't prevent the *render* of children, only the *fetch*. Components inside the children might still try to use the `user` object or trigger their own fetches, and it doesn't solve the visual flash of empty state before data loads.

### 2. Move data fetching to a dedicated wrapper component
- **Why Rejected**: Adding more nesting complicates the component tree. Gating at the Context Provider level is cleaner and more authoritative.

## Technical Patterns

### Centered Loader
We will use the same styling as `AuthProvider` for consistency:
```tsx
<div className="h-full w-full flex items-center justify-center p-8">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>
```
Note: Since it's "Content-only" per clarification, we use `h-full` instead of `h-screen`.
