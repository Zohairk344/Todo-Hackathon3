# Data Model

> **Note**: This feature uses existing tables. No schema changes are required.

## Existing Entities

### User (`user`)
*   **id**: UUID (Primary Key)
*   **email**: String (Unique)
*   **name**: String
*   **image**: String (Nullable) - *Used in UserNav*
*   **email_verified**: Boolean - *Used in Auth Response*

### Conversation (`conversation`)
*   **id**: Integer (Primary Key)
*   **user_id**: UUID (Foreign Key to `user.id`)
*   **created_at**: DateTime
*   **updated_at**: DateTime

### Message (`message`)
*   **id**: Integer (Primary Key)
*   **conversation_id**: Integer (Foreign Key to `conversation.id`)
*   **role**: String ("user" | "assistant")
*   **content**: Text
*   **created_at**: DateTime

## JSON Schemas (API)

### Auth Response
```json
{
  "token": "jwt_string...",
  "session": {
    "id": "jwt_string...",
    "userId": "uuid...",
    "expiresAt": "iso_date...",
    "ipAddress": "...",
    "userAgent": "..."
  },
  "user": {
    "id": "uuid...",
    "email": "user@example.com",
    "name": "User Name",
    "emailVerified": true,
    "image": null,
    "createdAt": "iso_date...",
    "updatedAt": "iso_date..."
  }
}
```

### Chat Request
```json
{
  "message": "Add a task to buy milk",
  "conversationId": 123  // Optional
}
```

### Chat Response
```json
{
  "response": "I've added 'Buy milk' to your task list.",
  "conversationId": 123
}
```
