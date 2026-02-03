# Data Model: Dashboard Auth Refactor

**Implements**: Ironclad Schema (Constitution Rule II.1)
**Source of Truth**: `backend/app/models.py`

## Entities

### Task
Represents a user's todo item.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | Integer | Yes | Primary Key, Auto-increment |
| `userId` | String | Yes | Foreign Key to User.id |
| `title` | String | Yes | Max 200 chars |
| `description` | String | No | Max 1000 chars |
| `completed` | Boolean | Yes | Default: False |
| `priority` | Enum | Yes | `LOW`, `MEDIUM`, `HIGH`. Default: `MEDIUM` |
| `dueDate` | DateTime | No | Mapped to `due_date` in DB |
| `categoryId` | Integer | No | Foreign Key to Category.id |
| `createdAt` | DateTime | Yes | UTC |
| `updatedAt` | DateTime | Yes | UTC |

### Category
Represents a grouping for tasks.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | Integer | Yes | Primary Key, Auto-increment |
| `userId` | String | Yes | Foreign Key to User.id |
| `name` | String | Yes | Category name |
| `color` | String | Yes | Hex color code |

## Relationships

- **User** has many **Tasks** (One-to-Many).
- **User** has many **Categories** (One-to-Many).
- **Category** has many **Tasks** (One-to-Many).
- **Task** belongs to one **Category** (Many-to-One, optional).

## Frontend Type Alignment
Frontend interfaces (`frontend/services/todo-service.ts`) MUST match these definitions, specifically using camelCase for property access as returned by the API (`userId`, `categoryId`, `dueDate`, `createdAt`).
