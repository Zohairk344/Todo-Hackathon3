# Data Model: Client-Side Authentication State

## Entities

### Authentication State (Client-Side)
The global state managed by `AuthContext`.

| Field | Type | Description |
|-------|------|-------------|
| user | UserIdentity \| null | The currently authenticated user object. |
| loading | boolean | True while the initial session check is in progress. |
| error | string \| null | Error message/code if the session check fails. |

### User Identity
The structure of the user object returned by the backend session API.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the user. |
| email | string | Primary email address. |
| name | string \| null | Display name of the user. |
| image | string \| null | URL to the user's profile image. |

## State Transitions

1. **Initial**: `user: null`, `loading: true`, `error: null`.
2. **Mount**: `useEffect` triggers fetch.
3. **Success**: `user: { ...data }`, `loading: false`, `error: null`.
4. **Unauthorized (401/403)**: `user: null`, `loading: false`, `error: "AUTH_SESSION_EXPIRED"`.
5. **Network Failure**: `user: null`, `loading: false`, `error: "AUTH_BACKEND_UNREACHABLE"`.
