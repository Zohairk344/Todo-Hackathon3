# API Contract: Authentication Session

## Get Current Session
Retrieves the authenticated user's session data based on provided cookies.

- **URL**: `/api/auth/get-session`
- **Method**: `GET`
- **Auth required**: YES (via HttpOnly cookies)
- **CORS Requirements**: `credentials: true`, `origin: <Vercel URL>`

### Success Response
- **Code**: `200 OK`
- **Content**:
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "image": null
  },
  "session": {
    "id": "sess_456",
    "userId": "user_123",
    "expiresAt": "2026-02-01T12:00:00Z"
  }
}
```

### Error Responses
- **Code**: `401 Unauthorized` (Session missing or expired)
- **Code**: `403 Forbidden` (CSRF failure or blocked user)
- **Code**: `500 Internal Server Error` (Backend failure)
