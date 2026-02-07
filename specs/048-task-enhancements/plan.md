# Implementation Plan - Task Dashboard Enhancements and Fixes

## 1. Technical Context

**Feature:** Task Dashboard Enhancements (Bug Fixes, Due Date, UI Enrichment)
**Status:** Planning
**Architecture:** Frontend (Next.js/Tailwind) -> Backend (FastAPI/SQLModel)

### 1.1 Known Constraints
- **Backend Protocol:** Frontend uses `PATCH` for partial updates, Backend currently expects `PUT` (Replace All) on `update_task`.
- **Database Schema:** `Task` model likely already has a `due_date` column (based on "Missing Features" context implying it's just not exposed). *Need to verify if column exists.*
- **State Management:** Dashboard modal states (`isTaskModalOpen`, `isCategoryModalOpen`) are local to `DashboardPage`.

### 1.2 Dependencies & Integrations
- **FastAPI Router:** `backend/app/api/routes/tasks.py`
- **Frontend Components:** `new-task-dialog.tsx`, `task-view.tsx`, `page.tsx` (Dashboard)
- **UI Library:** Lucide React (Calendar icon), Custom Badge component (implied)

### 1.3 Unknowns & Risks
- [ ] **Data Model:** Does the `Task` SQLModel in `backend/app/models.py` actually have a `due_date` field? If not, a migration is needed.
- [ ] **Badge Component:** Does a reusable `Badge` component exist, or do we need to build one?
- [ ] **Category Colors:** How are category colors stored? Hex codes? Enum?

## 2. Constitution Check

| Rule ID | Compliant? | Notes |
|:--- |:--- |:--- |
| **I. Tech Stack** | YES | Using Next.js, FastAPI, SQLModel as prescribed. |
| **II.1 Ironclad Schema** | **CHECK** | Must verify `Task` model column naming (`due_date` vs `dueDate`). |
| **II.3 Auth** | N/A | Feature relies on existing auth; no changes to auth logic. |
| **IV. Workflow** | YES | Atomic changes to existing components. |
| **V. Verification** | **PLAN** | Will run existing tests and verify route fix with curl/script. |

## 3. Phase 0: Research & Discovery

### 3.1 Research Tasks
- [ ] **R1:** Inspect `backend/app/models.py` to check for `due_date` field in `Task` model.
- [ ] **R2:** Inspect `backend/app/models.py` to check `Category` color storage format.
- [ ] **R3:** Check `frontend/components/ui/badge.tsx` (or similar) for existence.

### 3.2 Key Decisions
- **Decision:** Use `PATCH` for `update_task`.
  - **Rationale:** Aligns with REST standards for partial updates and fixes the current 405 error.
- **Decision:** Reopen Task Dialog after Category Shortcut.
  - **Rationale:** Preserves user flow (context restoration).
- **Decision:** Truncate descriptions to 2 lines.
  - **Rationale:** Keeps dashboard UI clean and consistent.

## 4. Phase 1: Design & Data Model

### 4.1 Data Model Changes (`data-model.md`)
*If R1 finds `due_date` missing:*
- Add `due_date: Optional[datetime] = Field(default=None, sa_column=Column("dueDate"))` to `Task` model.
- *Note: If migration needed, will include SQL script.*

### 4.2 API Contracts (`contracts/api-schema.json`)
- **PATCH /tasks/{task_id}**: Accepts `TaskUpdate` (all fields optional).
- Returns: `TaskPublic`.

## 5. Phase 2: Implementation Tasks

### 5.1 Backend
- [ ] **T1:** Verify/Add `due_date` to `Task` model in `models.py`.
- [ ] **T2:** Update `update_task` route in `routes/tasks.py` to use `@router.patch`.
- [ ] **T3:** Verify `TaskUpdate` Pydantic model supports partial updates (all fields optional).

### 5.2 Frontend
- [ ] **T4:** Update `NewTaskDialog` to include `dueDate` state and input field.
- [ ] **T5:** Implement `onAddCategory` logic in `DashboardPage` and `NewTaskDialog`.
- [ ] **T6:** Update `TaskView` (Card) to display Description, Priority Badge, Due Date, Category.

## 6. Verification Plan

### 6.1 Automated Tests
- Run `npm run build` to check for TS errors.
- Run `pytest` (if available) for backend models.

### 6.2 Manual Verification
- **Scenario 1:** Click checkbox on dashboard task -> Verify 200 OK (Network Tab).
- **Scenario 2:** Create Task with Due Date -> Verify saved and displayed on card.
- **Scenario 3:** Click "+" in Create Task -> Create Category -> Verify Task Dialog reopens.