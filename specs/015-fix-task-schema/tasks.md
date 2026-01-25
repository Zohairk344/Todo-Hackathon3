---
description: "Actionable, dependency-ordered tasks for Fixing Task Model Schema Alignment"
---

# Tasks: Fix Task Model Schema Alignment

**Input**: Design documents from `/specs/015-fix-task-schema/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable
- **[Story]**: US1 (Stable Persistence), US2 (Legacy Preservation)

## Phase 1: Setup

**Purpose**: Initial project verification

- [x] T001 Verify `todo-hackathon3/app/models.py` existence and current `Task` class structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Critical Schema Correction. MUST be completed before verification stories.

- [x] T002 **Correct Task Model Column Mapping**: Update the `due_date` field in `todo-hackathon3/app/models.py` to use `sa_column=Column("due_date", DateTime, nullable=True)`. Ensure the column name is snake_case to match the existing database table.

---

## Phase 3: User Story 1 - Stable Task Persistence [US1]

**Goal**: Prevent 500 errors during task persistence.

- [x] T003 [US1] **Verification Protocol**: Perform syntax check on `todo-hackathon3/app/models.py` using `py_compile` to ensure no syntax errors were introduced.
- [ ] T004 [US1] **Logic Validation**: Run manual API test (as per `quickstart.md`) by creating a task with a due date using `curl`. Verify the response is `201 Created` and no `UndefinedColumnError` occurs.

---

## Phase 4: User Story 2 - Legacy Field Preservation [US2]

**Goal**: Ensure surgical fix didn't break Ironclad mappings.

- [x] T005 [US2] **Safety Check**: Verify `user_id` still maps to `userId` and timestamps map to `createdAt`/`updatedAt` in `todo-hackathon3/app/models.py`.

---

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T006 Remove any temporary manual test records from the database if created.

---

## Dependencies & Execution Order

1.  **Phase 2 (T002)** blocks ALL subsequent phases as it addresses the root cause.
2.  **Phase 3 & 4** can be performed in any order after Phase 2 is complete.

## Implementation Strategy

- **MVP First**: T002 is the only code change required.
- **Verify**: T003 and T004 are critical to ensure the fix works in the real environment.
- **Format Validation**: All tasks follow the strict checklist format.