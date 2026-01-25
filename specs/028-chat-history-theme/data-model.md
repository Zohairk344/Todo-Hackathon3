# Phase 1: Data Model

**Feature**: Chat History & Theming (`028-chat-history-theme`)
**Date**: 2026-01-22

## Entities

### Conversation
*Existing entity in `backend/app/models.py`*
- **id**: `int` (Primary Key)
- **user_id**: `str` (Foreign Key to `User.id`)
- **created_at**: `datetime`
- **updated_at**: `datetime`

### Message
*Existing entity in `backend/app/models.py`*
- **id**: `int` (Primary Key)
- **conversation_id**: `int` (Foreign Key to `Conversation.id`)
- **user_id**: `str`
- **role**: `str` ("user" | "assistant")
- **content**: `str`
- **created_at**: `datetime`

## Schema Validation (Ironclad)

- **Column Mapping**:
  - `user_id` -> `userId`
  - `conversation_id` -> `conversationId`
  - `created_at` -> `createdAt`
  - `updated_at` -> `updatedAt`

## API Models

### ChatHistoryResponse
- **Type**: `List[MessageSchema]`
- **Structure**:
  ```json
  [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi there! How can I help?"
    }
  ]
  ```
