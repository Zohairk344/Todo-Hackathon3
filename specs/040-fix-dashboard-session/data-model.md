# Data Model: Dashboard Session Integration

## Entities

### User
Represents the authenticated user within the system.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier (Primary Key) |
| email | String | User's email address |
| name | String | User's display name |
| image | String | Optional URL to user's profile image |

### Session
Represents a temporary, valid authentication session.

| Field | Type | Description |
|-------|------|-------------|
| token | String | The JWT or session token string |
| userId | UUID | Foreign key to the User entity |
| expiresAt | DateTime | When the session becomes invalid |

## Relationships
- **User 1 : N Session**: A single user can have multiple active sessions across different devices/browsers.
- **Session N : 1 User**: Each session belongs to exactly one user.

## Validation Rules
- **Session Token**: Must be present in the `session_token` cookie for dashboard access.
- **User ID**: Must be a valid UUID present in the `User` table to avoid `ForeignKeyViolationError` when creating related records (like Tasks).
