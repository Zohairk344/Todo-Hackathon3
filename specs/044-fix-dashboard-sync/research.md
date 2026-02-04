# Research: Fix Dashboard Sync

## Decision: Standardized Task Data Model Mapping
**Rationale:** The frontend currently uses `camelCase` properties, while the backend returns `snake_case`. This mismatch causes runtime crashes and empty dashboards.
**Selected Approach:** Strictly follow the backend `Task` model from `todo-hackathon3/app/models.py`.
- `due_date`: `datetime | null` (ISO String in Frontend)
- `created_at`: `datetime` (ISO String in Frontend)
- `updated_at`: `datetime` (ISO String in Frontend)
- `status`: `"pending" | "in-progress" | "completed"` (maps to backend `completed: bool` and `status` alias if present, but current backend uses `completed: bool` and `TaskRead` uses `status` logic potentially).

*Self-Correction after reading backend `models.py`:*
The backend `TaskBase` has `completed: bool` and `due_date: Optional[datetime]`.
However, `todo-service.ts` uses `status: "pending" | "in-progress" | "completed"`.
I must ensure the frontend `Task` interface and API calls align with what the backend actually returns.
Checking `backend/app/models.py` again:
`TaskRead` has `TaskBase` + `id`, `user_id`, `created_at`, `updated_at`, `category_id`, `category`.
`TaskBase` has `completed: bool`, `priority`, `due_date`, `category_id`.
The frontend `todo-service.ts` currently has `status` but the backend has `completed`. I should standardize on what the Backend API actually sends. If the backend sends `completed`, the frontend should use it or the service should transform it.
*Decision:* Update `Task` interface to include both `completed` (boolean) and `status` (computed or as returned) to ensure compatibility with existing components like `TaskCard`.

## Decision: UI Component Restoration (Select)
**Rationale:** The `NewTaskDialog` currently uses a native `<select>` which breaks the UI aesthetic.
**Selected Approach:** 
1. Since `frontend/components/ui/select.tsx` is missing, I will check if I can install it or if it was accidentally deleted.
2. Given I cannot install new packages easily, I will implement a simplified `Select` component using Radix UI primitives (if `@radix-ui/react-select` is available) or a styled custom component that matches Shadcn UI patterns.
3. *Alternative:* Use the existing `Popover` and a list if `Select` is too complex to implement from scratch without the boilerplate.

## Decision: Race Condition Prevention in TasksContext
**Rationale:** `401 Unauthorized` errors occur when `refreshTasks` runs before `user` is populated.
**Selected Approach:** Add a strict check `if (!user?.id) return;` in both `refreshTasks` and the `useEffect` that triggers it. This ensures no API calls are made without a valid session ID.
