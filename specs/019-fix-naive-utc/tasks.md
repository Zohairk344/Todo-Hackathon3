---
description: "Actionable tasks for Standardizing Naive UTC Timestamps"
---

# Tasks: Standardize Naive UTC Timestamps

**Input**: Design documents from `/specs/019-fix-naive-utc/`
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[Story]**: US1 (Stable Updates), US2 (Consistent Handling)

## Phase 1: Setup

**Purpose**: Initial verification

- [x] T001 Create `todo-hackathon3/check_tz.py` to verify current datetime behavior and test the naive conversion logic.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Logic Standardization

- [x] T002 **Standardize Model Defaults**: Update `todo-hackathon3/app/models.py`. Change all datetime defaults to use `default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None)`. Do NOT use `datetime.utcnow` (deprecated) or `default=...` (runs only once at import time). Ensure `sa_column` definitions do NOT enforce timezone awareness if the DB is naive.
- [x] T003 **Fix Auth Dependency**: Update `todo-hackathon3/app/api/deps.py`. In `get_current_user`, ensure `now` is calculated as a naive UTC timestamp before comparing with `expires_at`.
- [ ] T004 **Fix Task Routes**: Update `todo-hackathon3/app/api/routes/tasks.py`. In `update_task` and `complete_task`, explicitly set `updated_at` to a naive UTC timestamp before committing.

---

## Phase 3: User Story 1 - Stable Task Updates [US1]

**Goal**: Restore update functionality

- [ ] T005 [US1] **Verification Protocol**: Perform syntax check on all modified files using `py_compile`.
- [ ] T006 [US1] **Logic Validation**: Run manual API test (using `curl` or Dashboard) to toggle a task's completion status. Verify 200 OK.

---

## Phase 4: User Story 2 - Consistent Timestamp Handling [US2]

**Goal**: Prevent regression

- [ ] T007 [US2] **Safety Check**: Verify `created_at` and `updated_at` in the database (via logs or psql) do not contain offset information (e.g., `+00`).

---

## Final Phase: Polish

- [ ] T008 Remove `check_tz.py`.