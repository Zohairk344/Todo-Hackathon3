# Tasks: Fix User Defaults

**Feature**: Fix User Defaults
**Status**: Pending
**Spec**: [specs/022-fix-user-defaults/spec.md](/specs/022-fix-user-defaults/spec.md)

## Phase 1: Setup
**Goal**: Verify current codebase state.

- [X] T001 Verify current `User` model definition in `todo-hackathon3/app/models.py`

## Phase 2: Foundational
**Goal**: Core prerequisites (None for this fix).

*(No foundational tasks required)*

## Phase 3: Successful Sign-Up
**Goal**: [US1] Ensure `theme` and `fontSize` accept NULL values in the database to allow Better-Auth sign-ups.
**Test**: Sign-up via Better-Auth works without "not-null constraint" error.

- [X] T002 [US1] Import `Text` and `Column` from `sqlalchemy` in `todo-hackathon3/app/models.py` if missing
- [X] T003 [US1] Update `theme` field in `todo-hackathon3/app/models.py` to use `nullable=True` in `sa_column`
- [X] T004 [US1] Update `font_size` field in `todo-hackathon3/app/models.py` to use `nullable=True` in `sa_column`

## Phase 4: Backward Compatibility
**Goal**: [US2] Ensure existing code/users are not negatively impacted.
**Test**: Verify model defaults still apply when accessing fields.

- [X] T005 [US2] Verify `User` model instantiation defaults for `theme` (system) and `font_size` (medium)

## Phase 5: Polish & Cross-Cutting
**Goal**: Final code quality checks.

- [X] T006 Run linters (ruff) on `todo-hackathon3/app/models.py`

## Dependencies
1. T001 (Setup) -> T002, T003, T004 (Implementation)
2. T002, T003, T004 -> T005 (Verification) -> T006 (Polish)

## Parallel Execution
- T003 and T004 can be executed in parallel as they touch different fields (though in the same file, so merge care is needed).

## Implementation Strategy
- **MVP**: Directly modify `models.py` to relax constraints.
- **Verification**: Manual sign-up test or simple script to init model.
