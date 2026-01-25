<!--
SYNC IMPACT REPORT
Version Change: 2.0.0 -> 2.1.0
Impact:
- Added Section V: VERIFICATION PROTOCOL ("Trust but Verify").
- Enforced syntax integrity checks upon Python file edits.
- Mandated logic validation via temporary "sanity check" scripts for new routes.
- Required running existing tests in tests/ after modifications.
- Established self-correction rule: no task progression if verification fails.
Templates Checked:
- plan-template.md: ✅ Updated (Added Verification Protocol check).
- spec-template.md: ✅ Compatible.
- tasks-template.md: ✅ Updated (Added Verification tasks guidance).
TODOs:
- None.
-->

# Phase 3 (Todo App + Chatbot MCP) Constitution

## Core Principles

### I. Technology Stack (NON-NEGOTIABLE)
1. **Frontend:** Next.js 14+ (App Router), Tailwind CSS, Lucide React.
2. **Backend:** Python 3.10+ (FastAPI), Uvicorn.
3. **Database:** Neon (PostgreSQL) via SQLModel & SQLAlchemy (Async).
4. **Authentication:** Better-Auth (Email/Password Strategy).
5. **Deployment:** Hugging Face Spaces (Docker).

### II. Critical Architecture Rules

#### 1. The "Ironclad" Database Schema (Auth Compliance)
* **Authority:** `backend/app/models.py` is the Single Source of Truth.
* **Table Naming:** MUST be strictly lowercase (e.g., `__tablename__ = "user"`).
* **Column Naming (The "Translation" Rule):**
    * Python attributes MUST be **snake_case** (e.g., `user_id`, `expires_at`).
    * Database columns MUST be **camelCase** (e.g., `"userId"`, `"expiresAt"`) to satisfy Better-Auth.
    * **Implementation:** You MUST use `sa_column` for these fields.
    * *Example:* `user_id: str = Field(sa_column=Column("userId", ForeignKey("user.id")))`
* **Required Tables:** `User`, `Session`, `Account`, `Verification`, `Jwks` (Auth) + `Task`, `Category` (App).

#### 2. Startup & Initialization
* **Lifecycle Manager:** Use `asynccontextmanager` in `main.py` for startup.
* **Table Creation:** ALL models must be imported inside the lifespan function *before* calling `SQLModel.metadata.create_all`.
* **Race Condition Prevention:** The backend MUST create tables before the frontend attempts to sign in.

#### 3. Authentication & Dependencies
* **Dual-Token Strategy:** The `get_current_user` dependency in `deps.py` MUST check for:
    1. **Header:** `Authorization: Bearer <token>` (for API calls).
    2. **Cookie:** `better-auth.session_token` (for Web Dashboard).
* **Validation:** Verify `expires_at` against UTC time. Use Python attribute names (`user.id`) only.

#### 4. MCP & Chatbot Structure
* **Route Isolation:** Chatbot logic goes in `backend/app/api/routes/chat.py`.
* **Context Awareness:** The Chatbot MUST have read-access to `Task` and `Category` tables via the `current_user` dependency.

### III. Deployment & Compliance (Hugging Face)
* **Port:** The application MUST listen on **Port 7860**.
* **Host:** The application MUST listen on **0.0.0.0**.
* **Dockerfile:**
    * Base: `python:3.10`
    * CMD: `uvicorn app.main:app --host 0.0.0.0 --port 7860`

### IV. Development Workflow
* **Atomic Changes:** Do not break existing features when adding new ones.
* **Defensive Coding:** Always use `DROP TABLE IF EXISTS` logic in SQL scripts when changing schema structure during development.
* **Error Handling:** All API routes must return clean JSON error messages, not raw 500 stack traces.

### V. VERIFICATION PROTOCOL (NEW: "Trust but Verify")
* **Syntax Integrity:** Upon editing any Python file, the Agent MUST verify that all new imports are present and no syntax errors exist (e.g., mismatched parentheses, undefined variables).
* **Logic Validation:**
    * When implementing a **new route** (e.g., `chat.py`), the Agent MUST generate a small, temporary "sanity check" script (e.g., `tests/sanity_chat.py`) to verify the endpoint is reachable.
    * If existing tests are detected in `tests/`, they MUST be run after modification.
* **Self-Correction:** If a verification step fails, the Agent must NOT proceed to the next task until the error is resolved.

## Governance

*   **Supremacy:** This constitution overrides all previous defaults and assumptions.
*   **Amendments:** Changes to the Tech Stack or Architecture Rules require a MAJOR version bump and team consensus.
*   **Compliance:** All Pull Requests must verify against the "Ironclad" DB Schema rules.
*   **Runtime Guidance:** Refer to `GEMINI.md` for active context, but this file is the supreme law for architecture.

**Version**: 2.1.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13
