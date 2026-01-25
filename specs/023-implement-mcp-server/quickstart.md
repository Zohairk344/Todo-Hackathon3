# Quickstart: Verify MCP Server

## Prerequisites
- Local Postgres running (or Neon connection string in `.env`).
- Dependencies installed: `pip install mcp` (plus existing backend deps).

## Setup
1. **Environment**: Ensure `.env` has `DATABASE_URL`.
2. **Install**: `pip install -r todo-hackathon3/requirements.txt` (after adding `mcp`).

## Verification Steps

### 1. Run Standalone Test
Run the verification script to confirm tools work against the DB.

```bash
cd todo-hackathon3
python tests/test_mcp_standalone.py
```

**Expected Output**:
- "Creating task..." -> Success (ID returned)
- "Listing tasks..." -> Shows created task
- "Updating task..." -> Success
- "Completing task..." -> Success
- "Deleting task..." -> Success

### 2. Manual Inspection (Optional)
Check database rows to ensure `user_id` was correctly respected and no data leaked.
