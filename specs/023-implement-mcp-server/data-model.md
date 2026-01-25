# Data Model: MCP Server & Tools

**Status**: No Schema Changes Required.

The MCP server interacts with existing entities defined in `backend/app/models.py`.

## Used Entities

### User
- **Fields Used**: `id` (as `user_id` argument)
- **Permissions**: Tools operate on behalf of a specific `user_id`.

### Task
- **Fields**:
    - `id` (PK)
    - `title` (Text)
    - `description` (Text, Nullable)
    - `status` (Mapped to `completed` boolean)
    - `user_id` (FK)
    - `created_at` / `updated_at`

### Category (Indirect)
- Not explicitly manipulated by current toolset but available in schema.

## Tool-to-Database Mapping

| Tool | Operation | Tables Affected | Logic |
|------|-----------|-----------------|-------|
| `add_task` | INSERT | `task` | Create new row with `user_id` |
| `list_tasks` | SELECT | `task` | Filter by `user_id` and optional status |
| `complete_task` | UPDATE | `task` | Set `completed=True` where `id=task_id` AND `user_id=user_id` |
| `delete_task` | DELETE | `task` | Remove row where `id=task_id` AND `user_id=user_id` |
| `update_task` | UPDATE | `task` | Modify fields where `id=task_id` AND `user_id=user_id` |
