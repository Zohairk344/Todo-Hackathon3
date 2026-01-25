# Implementation Plan: Fix User Defaults

**Branch**: `022-fix-user-defaults` | **Date**: 2026-01-17 | **Spec**: [specs/022-fix-user-defaults/spec.md](/specs/022-fix-user-defaults/spec.md)
**Input**: Feature specification from `/specs/022-fix-user-defaults/spec.md`

## Summary

This plan resolves the critical `not-null constraint` violation preventing user sign-up via Better-Auth. The root cause is that the newly added `theme` and `fontSize` database columns are currently `NOT NULL`, but Better-Auth's default user creation logic does not provide values for these fields. The fix involves updating the `User` model in `models.py` to make these columns nullable in the database (`nullable=True`), allowing the initial insert to succeed. Application-level defaults will handle the fallback logic.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, SQLAlchemy
**Storage**: PostgreSQL (Neon)
**Testing**: Manual sign-up verification
**Target Platform**: Hugging Face Spaces
**Project Type**: Web Application Backend
**Performance Goals**: N/A (Bug fix)
**Constraints**: Ironclad Schema compliance (camelCase columns, snake_case attributes).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+).
- [x] **Schema Rules**: Maintaining Ironclad mapping rules (camelCase columns).
- [x] **Verification Protocol**: Will include syntax check and manual verification.

## Project Structure

### Documentation (this feature)

```text
specs/022-fix-user-defaults/
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
