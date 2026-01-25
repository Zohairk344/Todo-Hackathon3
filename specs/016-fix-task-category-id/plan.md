# Implementation Plan: Fix Task Category Schema Alignment

**Branch**: `016-fix-task-category-id` | **Date**: 2026-01-13 | **Spec**: [specs/016-fix-task-category-id/spec.md](/specs/016-fix-task-category-id/spec.md)
**Input**: Feature specification from `/specs/016-fix-task-category-id/spec.md`

## Summary

This plan resolves the `UndefinedColumnError` for `task.categoryId` by aligning the SQLModel mapping with the actual Postgres schema. Following the pattern established by the `due_date` fix, this implementation updates the `category_id` field in the `Task` model to explicitly map to the snake_case `category_id` column in the database. This fix is essential for restoring dashboard functionality when tasks are associated with categories.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, SQLAlchemy
**Storage**: PostgreSQL (Neon)
**Testing**: Manual verification via API/Dashboard
**Target Platform**: Hugging Face Spaces
**Project Type**: Web Application Backend
**Performance Goals**: N/A (Bug fix)
**Constraints**: Fix ONLY `category_id`; preserve `userId` camelCase mapping per Ironclad rules.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+).
- [x] **Schema Rules**: Correcting a mapping mismatch to align with existing Application data layer.
- [x] **Verification Protocol**: Will include syntax checks and manual verification.

## Project Structure

### Documentation (this feature)

```text
specs/016-fix-task-category-id/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
└── app/
    └── models.py        # Target for correction
```

**Structure Decision**: Modified existing model in `todo-hackathon3`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
