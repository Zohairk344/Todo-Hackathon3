# Quickstart: Chatbot Memory Verification

## Prerequisites
- Local Postgres running.
- Backend environment active (`.venv`).

## Setup
1. **Apply Schema**: Since we are using `SQLModel.metadata.create_all` in `main.py`, simply running the verification script (which imports models) or restarting the server will create tables.

## Verification Steps

### 1. Run Verification Script
Execute the standalone test to create a conversation and messages.

```bash
cd todo-hackathon3
python tests/verify_chat_db.py
```

**Expected Output**:
- "Creating dummy user..." -> Success
- "Creating conversation..." -> Success (ID returned)
- "Adding User message..." -> Success
- "Adding Assistant message..." -> Success
- "Retrieving Conversation..." -> Success (Messages list validation)
- "Cleaning up..." -> Success

### 2. Check Database (Optional)
Connect to Postgres and verify tables:
```sql
SELECT * FROM conversation;
SELECT * FROM message;
```
Columns should be `userId`, `conversationId`, etc. (camelCase).