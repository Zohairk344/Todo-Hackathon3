# API Contract: Chatbot

## POST /api/chat

Sends a user message to the chatbot and receives a response.

**Auth**: Required (Bearer Token OR Cookie)

### Request Body

```json
{
  "message": "Hello, what tasks do I have today?"
}
```

### Response (200 OK)

```json
{
  "response": "Chatbot Ready"
}
```

### Response (401 Unauthorized)

```json
{
  "detail": "Not authenticated"
}
```
