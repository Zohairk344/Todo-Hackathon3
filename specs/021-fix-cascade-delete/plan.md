# Implementation Plan: Fix Cascade Delete

**Branch**: `021-fix-cascade-delete` | **Date**: 2026-01-13 | **Spec**: [specs/021-fix-cascade-delete/spec.md](/specs/021-fix-cascade-delete/spec.md)
**Input**: Feature specification from `/specs/021-fix-cascade-delete/spec.md`

## Summary

This plan addresses the `IntegrityError` causing 500 errors during account deletion by implementing database-level cascading deletes. It involves updating the `ForeignKey` definitions in all child models (`Session`, `Account`, `Task`, `Category`) to include `ondelete="CASCADE"`, and configuring SQLAlchemy relationships in the `User` model with `cascade="all, delete"`. Additionally, it includes an audit of the `User` model and update route to ensure appearance settings (theme/font) are correctly persisted, addressing a secondary user report.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, SQLAlchemy
**Storage**: PostgreSQL (Neon)
**Testing**: Manual API verification (Deletion & Update)
**Target Platform**: Hugging Face Spaces
**Project Type**: Web Application Backend
**Performance Goals**: N/A (Bug fix)
**Constraints**: Ironclad Schema compliance (camelCase columns, snake_case attributes).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+).
- [x] **Schema Rules**: Maintaining Ironclad mapping rules while adding constraints.
- [x] **Verification Protocol**: Will include syntax check and manual verification.

## Project Structure

### Documentation (this feature)

```text
specs/021-fix-cascade-delete/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
└── app/
    ├── models.py        # Target: Relationship & FK updates
    └── api/
        └── users.py     # Target: Cleanup delete logic, fix update logic
```

**Structure Decision**: Modified existing files in `todo-hackathon3`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
