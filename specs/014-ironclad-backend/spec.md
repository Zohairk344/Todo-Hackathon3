# Feature Specification: Ironclad Backend Architecture

**Feature Branch**: `014-ironclad-backend`
**Created**: 2026-01-13
**Status**: Draft
**Input**: Update backend to mandate "Ironclad" architecture (strict schema, dual-token auth, robust startup).

## Clarifications

### Session 2026-01-13
- Q: Should the spec define the full field list for all tables (e.g., Task.priority, Category.color) or only the userId/Auth fields? → A: Yes, define full schema.
- Q: How should CORS allowed origins be configured? → A: Environment Variable (FRONTEND_URL).
- Q: What is the preferred strategy for database schema synchronization on startup? → A: Strict Sync (Create All).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Seamless Authentication (Priority: P1)

As a User, I want to access the application via both the Web Dashboard and direct API calls without authentication errors, so that I can manage my tasks from any interface.

**Why this priority**: Authentication is the gateway to all functionality; if this fails, the app is unusable. The "Dual-Mode" requirement ensures compatibility with both the frontend (Cookie-based) and potential future clients (Token-based).

**Independent Test**:
1.  **API Test**: Send `GET /api/tasks` with `Authorization: Bearer <token>`. Should return 200 OK.
2.  **Browser Test**: Log in via frontend, ensuring `better-auth.session_token` cookie is set. Reload page. Should stay logged in (backend accepts cookie).

**Acceptance Scenarios**:

1.  **Given** a valid Bearer token in the header, **When** I request a protected route, **Then** I receive a successful response with user data.
2.  **Given** no Bearer token but a valid `better-auth.session_token` cookie, **When** I request a protected route, **Then** I receive a successful response (cookie fallback works).
3.  **Given** an expired token/cookie, **When** I request a protected route, **Then** I receive a 401 Unauthorized response.

---

### User Story 2 - Robust System Startup (Priority: P2)

As a Developer/System, I want the database tables to be automatically verified and created upon server startup, so that the application never crashes with "table not found" errors.

**Why this priority**: Reliability is key. Manual SQL scripts are error-prone. The application must be self-healing regarding its schema presence.

**Independent Test**:
1.  Drop the entire database.
2.  Start the backend server (`uvicorn`).
3.  Inspect the database. All tables (`user`, `session`, `account`, `task`, `category`) must exist.

**Acceptance Scenarios**:

1.  **Given** a fresh database (no tables), **When** the server application starts, **Then** all required tables are created automatically without error.
2.  **Given** an existing database, **When** the server restarts, **Then** no errors occur and existing data is preserved.

---

### User Story 3 - Data Integrity & Compatibility (Priority: P3)

As a User, I expect my profile and task data to be saved and retrieved correctly, ensuring compatibility between the Python backend and the JavaScript frontend.

**Why this priority**: The frontend expects camelCase (e.g., `userId`), but Python uses snake_case (`user_id`). Mismatches cause data to vanish or UI errors.

**Independent Test**:
1.  Create a user via API. Check DB column names. Must be `emailVerified`, `createdAt` (not `email_verified`).
2.  Fetch user profile. JSON response must have keys `userId`, `emailVerified`.

**Acceptance Scenarios**:

1.  **Given** the `User` model, **When** mapped to the database, **Then** columns use camelCase names (`emailVerified`, `createdAt`).
2.  **Given** the `Task` model, **When** mapped to the database, **Then** the foreign key column is named `userId`.
3.  **Given** a Task API response, **When** serialized to JSON, **Then** field keys are camelCase (e.g., `userId`, `createdAt`) to match frontend expectations.

### Edge Cases

- **Token vs Cookie Conflict**: If both provided, Header should take precedence.
- **Timezone Mismatch**: `expires_at` checks must use UTC to prevent premature/delayed session expiry.
- **Race Conditions**: Frontend requests hitting backend before tables are ready (solved by Startup logic).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement "CamelCase Translation" for all database columns in `User`, `Account`, `Session`, `Verification`, and `Jwks` tables using `sa_column`.
- **FR-002**: System MUST map `user_id` Python attribute to `userId` database column in `Task` and `Category` tables.
- **FR-003**: The `get_current_user` dependency MUST accept `Authorization: Bearer <token>` header.
- **FR-004**: The `get_current_user` dependency MUST fallback to `better-auth.session_token` cookie if header is missing.
- **FR-005**: Authentication validation MUST check `Session.expires_at` against current UTC time.
- **FR-006**: Backend MUST use `asynccontextmanager` to import all models and run `SQLModel.metadata.create_all` on EVERY startup to ensure schema consistency.
- **FR-007**: API Responses for Tasks and Categories MUST serialize `user_id` as `userId`.
- **FR-008**: CORS configuration MUST load allowed origins from `FRONTEND_URL` environment variable.

### Key Entities

- **User**: Core identity. 
  - Python: `id`, `name`, `email`, `email_verified`, `image`, `created_at`, `updated_at`.
  - DB: `emailVerified`, `createdAt`, `updatedAt`.
- **Session**: Auth token storage. 
  - Python: `id`, `token`, `user_id`, `expires_at`, `ip_address`, `user_agent`, `created_at`, `updated_at`.
  - DB: `userId`, `expiresAt`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`.
- **Account**: OAuth/Provider links. 
  - Python: `id`, `user_id`, `account_id`, `provider_id`, `password`, `created_at`, `updated_at`.
  - DB: `userId`, `accountId`, `providerId`, `createdAt`, `updatedAt`.
- **Verification**: Security verification codes.
  - Python: `id`, `identifier`, `value`, `expires_at`, `created_at`, `updated_at`.
  - DB: `expiresAt`, `createdAt`, `updatedAt`.
- **Jwks**: Security keys.
  - Python: `id`, `public_key`, `private_key`, `created_at`.
  - DB: `publicKey`, `privateKey`, `createdAt`.
- **Task**: User work item. 
  - Python: `id`, `title`, `description`, `completed`, `priority`, `due_date`, `user_id`, `category_id`.
  - DB: `userId`, `dueDate`, `categoryId`.
- **Category**: Task grouping. 
  - Python: `id`, `name`, `color`, `user_id`.
  - DB: `userId`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Server starts successfully on a fresh database with 0 manual SQL executions required.
- **SC-002**: 100% of authentication tables use camelCase column names in Postgres.
- **SC-003**: API accepts valid requests from both cURL (Header) and Browser (Cookie) without 401 errors.
- **SC-004**: Frontend receives JSON payloads with `userId` (not `user_id`) for all Task/Category responses.
