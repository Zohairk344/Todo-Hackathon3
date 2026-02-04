# Data Model: Fix Dashboard Sync

## Entities

### Task (Standardized)
Represents a user's todo item, synchronized with the Backend Pydantic model.

| Field | Type | Description |
|-------|------|-------------|
| id | string / number | Unique identifier (Backend returns int, Frontend usually string) |
| title | string | Task title (max 200) |
| description | string \| null | Optional detailed description |
| status | "pending" \| "in-progress" \| "completed" | Current task status |
| completed | boolean | Direct mapping to backend `completed` field |
| priority | "LOW" \| "MEDIUM" \| "HIGH" | Task priority |
| due_date | string (ISO) \| null | Due date in ISO format |
| category_id | number \| null | Reference to Category ID |
| category_name | string \| null | Flattened category name for UI |
| created_at | string (ISO) | Creation timestamp |
| updated_at | string (ISO) | Last update timestamp |

### Category
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Category name |
| color | string | Hex color code |
| userId | string | Owner ID |

## Mappings (Frontend to Backend)
- `dueDate` (UI) -> `due_date` (API)
- `categoryId` (UI) -> `category_id` (API)
- `completed` (UI) -> `completed` (API)
