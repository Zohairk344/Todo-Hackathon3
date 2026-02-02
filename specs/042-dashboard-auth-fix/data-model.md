# Data Model: Dashboard Frontend State

**Feature Branch**: `042-dashboard-auth-fix`
**Created**: 2026-02-02
**Status**: Draft

## 1. Entities (Frontend Interfaces)

### Task
Represents a todo item displayed on the dashboard.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique UUID. |
| `title` | `string` | Short description. |
| `isCompleted` | `boolean` | Completion status. |
| `categoryId` | `string` (optional) | Link to a category. |
| `userId` | `string` | Owner ID. |
| `createdAt` | `string` (ISO 8601) | Timestamp. |

### Category
Represents a grouping for tasks.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique UUID. |
| `name` | `string` | Display name (e.g., "Work", "Personal"). |
| `color` | `string` | Hex code or color name. |
| `userId` | `string` | Owner ID. |

## 2. State Management (TasksContext)

### TasksState Interface
The shape of the data provided by `TasksProvider`.

```typescript
interface TasksState {
  tasks: Task[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  addTask: (task: CreateTaskDTO) => Promise<Task>;
  addCategory: (category: CreateCategoryDTO) => Promise<Category>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}
```

### DTOs (Data Transfer Objects)

```typescript
interface CreateTaskDTO {
  title: string;
  categoryId?: string;
}

interface CreateCategoryDTO {
  name: string;
  color: string;
}
```
