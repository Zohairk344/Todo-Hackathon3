# Data Model: Task Schema Alignment

## Entities

### Task (`task`)
*   `id` (Integer, PK): Primary Key.
*   **`due_date`** (Timestamp): Mapped to **`due_date`** (snake_case) in DB.
*   `user_id` (Text): Mapped to `userId` (camelCase) in DB (UNCHANGED).
*   `created_at` (Timestamp): Mapped to `createdAt` (camelCase) in DB (UNCHANGED).
*   `updated_at` (Timestamp): Mapped to `updatedAt` (camelCase) in DB (UNCHANGED).

## Validation Rules
*   The `sa_column` name for `due_date` MUST be exactly `"due_date"`.
*   Auth tables (`User`, `Session`, etc.) MUST remain camelCase.