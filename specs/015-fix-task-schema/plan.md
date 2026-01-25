# Implementation Plan: Fix Task Model Schema Alignment

**Branch**: `015-fix-task-schema` | **Date**: 2026-01-13 | **Spec**: [specs/015-fix-task-schema/spec.md](/specs/015-fix-task-schema/spec.md)
**Input**: Feature specification from `/specs/015-fix-task-schema/spec.md`

## Summary

The current implementation of the `Task` model maps the `due_date` Python attribute to a camelCase `dueDate` column in the database. However, the existing Postgres table schema uses a snake_case `due_date` column for this field. This mismatch results in `UndefinedColumnError` (500 errors) when the application attempts to persist or retrieve tasks with due dates. This plan executes a surgical fix to align the model mapping with the actual database schema.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, SQLAlchemy
**Storage**: PostgreSQL (Neon)
**Testing**: Manual verification via API
**Target Platform**: Hugging Face Spaces
**Project Type**: Web Application Backend
**Performance Goals**: N/A (Bug fix)
**Constraints**: Fix ONLY `due_date`; preserve all other "Ironclad" mappings.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+).
- [x] **Schema Rules**: Correcting a mapping error to match existing schema while preserving Ironclad rules for Auth tables.
- [x] **Verification Protocol**: Inclusion of syntax checks and manual API verification.

## Project Structure

### Documentation (this feature)

```text
specs/015-fix-task-schema/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
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