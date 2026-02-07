# Data Model: Task Enhancements

## Task Entity (Existing)
No schema changes required. Existing model supports:
- `title`: String
- `description`: Optional[String]
- `priority`: Enum (LOW, MEDIUM, HIGH)
- `due_date`: Optional[DateTime] (Mapped to `due_date` column)
- `category_id`: Optional[Integer] (Mapped to `category_id` column)

## Enums
### Priority
- `LOW`
- `MEDIUM`
- `HIGH`

## Frontend Types (Updates)
### Task Interface
Ensure the TypeScript interface matches the API response:
```typescript
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string; // ISO String
  categoryId?: number;
  category?: {
    id: number;
    name: string;
    color: string;
  };
}
```
