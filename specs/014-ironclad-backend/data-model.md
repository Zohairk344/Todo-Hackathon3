# Data Model: Ironclad Backend

## Entities

### User (`user`)
*   `id` (Text, PK): User ID.
*   `name` (Text): Display name.
*   `email` (Text, Unique, Index): Email address.
*   `email_verified` (Boolean) -> `emailVerified` (DB).
*   `image` (Text, Optional): Avatar URL.
*   `created_at` (Timestamp) -> `createdAt` (DB).
*   `updated_at` (Timestamp) -> `updatedAt` (DB).

### Session (`session`)
*   `id` (Text, PK): Session ID.
*   `token` (Text, Index): Session token.
*   `user_id` (Text, FK `user.id`) -> `userId` (DB).
*   `expires_at` (Timestamp) -> `expiresAt` (DB).
*   `ip_address` (Text, Optional) -> `ipAddress` (DB).
*   `user_agent` (Text, Optional) -> `userAgent` (DB).
*   `created_at` (Timestamp) -> `createdAt` (DB).
*   `updated_at` (Timestamp) -> `updatedAt` (DB).

### Account (`account`)
*   `id` (Text, PK): Account ID.
*   `user_id` (Text, FK `user.id`) -> `userId` (DB).
*   `account_id` (Text) -> `accountId` (DB).
*   `provider_id` (Text) -> `providerId` (DB).
*   `password` (Text, Optional): Hashed password.
*   `created_at` (Timestamp) -> `createdAt` (DB).
*   `updated_at` (Timestamp) -> `updatedAt` (DB).

### Verification (`verification`)
*   `id` (Text, PK): Verification ID.
*   `identifier` (Text): Email/Phone.
*   `value` (Text): The code.
*   `expires_at` (Timestamp) -> `expiresAt` (DB).
*   `created_at` (Timestamp, Optional) -> `createdAt` (DB).
*   `updated_at` (Timestamp, Optional) -> `updatedAt` (DB).

### Jwks (`jwks`)
*   `id` (Text, PK): Key ID.
*   `public_key` (Text) -> `publicKey` (DB).
*   `private_key` (Text) -> `privateKey` (DB).
*   `created_at` (Timestamp) -> `createdAt` (DB).

### Task (`task`)
*   `id` (Integer, PK, Auto): Task ID.
*   `title` (Text): Task title.
*   `description` (Text, Optional): Details.
*   `completed` (Boolean): Status.
*   `priority` (Enum: LOW, MEDIUM, HIGH): Priority.
*   `due_date` (Timestamp, Optional) -> `dueDate` (DB).
*   `user_id` (Text, FK `user.id`) -> `userId` (DB).
*   `category_id` (Integer, Optional, FK `category.id`) -> `categoryId` (DB).
*   `created_at` (Timestamp): Creation time.
*   `updated_at` (Timestamp): Update time.

### Category (`category`)
*   `id` (Integer, PK, Auto): Category ID.
*   `name` (Text): Category name.
*   `color` (Text): Color code.
*   `user_id` (Text, FK `user.id`) -> `userId` (DB).

## Validation Rules
*   **CamelCase Constraint**: All DB columns MUST use the mapped name via `sa_column`.
*   **Foreign Keys**: `Task` and `Category` MUST link to `User.id` via `userId` column.
