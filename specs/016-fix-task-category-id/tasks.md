---
description: "Actionable tasks for Fixing Task Category Mapping"
---

# Tasks: Fix Task Category Mapping

**Input**: Design documents from `/specs/016-fix-task-category-id/`
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[Story]**: US1 (Dashboard Retrieval), US2 (Data Integrity)

## Phase 1: Setup

**Purpose**: Initial verification

- [x] T001 Verify `todo-hackathon3/app/models.py` and locate `category_id` in `Task` class

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Schema Correction

- [x] T002 **Correct category_id Column Mapping**: Update `category_id` in `todo-hackathon3/app/models.py` to use `sa_column=Column("category_id", Integer, ForeignKey("category.id"), nullable=True)`.

---

## Phase 3: User Story 1 - Categorized Task Retrieval [US1]

**Goal**: Restore dashboard loading

- [x] T003 [US1] **Verification Protocol**: Perform syntax check on `todo-hackathon3/app/models.py` using `py_compile`.
- [ ] T004 [US1] **Logic Validation**: Verify tasks can be fetched via API/Dashboard without `UndefinedColumnError` for `categoryId`.

---

## Phase 4: User Story 2 - Data Relationship Integrity [US2]

**Goal**: Ensure FK consistency

- [x] T005 [US2] **Safety Check**: Verify that `user_id` mapping remains `"userId"` and other mapped fields in `Task` class are unchanged unless explicitly required by logs.

---

## Final Phase: Polish

- [x] T006 Global search for any remaining `.categoryId` attribute access on Python objects (should already be snake_case in logic).