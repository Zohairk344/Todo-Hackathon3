# Quickstart: Verify Agent Logic

## Prerequisites
- `LLM_API_KEY` (Groq or OpenAI) in `.env`.
- Database initialized with models (Phase 3.2).

## Setup
1. Update `.env`:
   ```env
   LLM_PROVIDER=groq
   LLM_API_KEY=gsk_...
   ```

## Verification Steps

### 1. Run Agent Test Script
Execute the script to verify the "Brain" can create a task.

```bash
cd todo-hackathon3
python tests/test_agent_logic.py
```

**Expected Flow**:
1. User: "Add a task to buy eggs"
2. Agent: Decides to call `add_task`
3. Tool: Injects `user_id`, saves to Postgres.
4. Agent: Returns "I've added 'buy eggs' to your list."

### 2. Manual Verification
Check Postgres:
```sql
SELECT * FROM task WHERE title = 'buy eggs';
SELECT * FROM message; -- Should see user and assistant entries
```
