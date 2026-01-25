# Implementation Plan: Standardize Naive UTC Timestamps

**Branch**: `019-fix-naive-utc` | **Date**: 2026-01-13 | **Spec**: [specs/019-fix-naive-utc/spec.md](/specs/019-fix-naive-utc/spec.md)
**Input**: Feature specification from `/specs/019-fix-naive-utc/spec.md`

## Summary

This plan addresses the `DataError` and `TypeError` caused by timezone offset mismatches when updating tasks. The PostgreSQL database columns are defined as `TIMESTAMP WITHOUT TIME ZONE` (offset-naive), but the Python application is currently generating and sending offset-aware datetimes (e.g., `datetime.now(timezone.utc)`). To resolve this, we will "Strip & Standardize" all datetime logic in the backend to strictly use naive UTC timestamps. This involves updating model defaults, route logic for `updated_at`, and session expiration checks.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: FastAPI, SQLModel, SQLAlchemy
**Storage**: PostgreSQL (Neon)
**Testing**: Manual verification + Verification Script
**Target Platform**: Hugging Face Spaces
**Project Type**: Web Application Backend
**Performance Goals**: N/A (Bug fix)
**Constraints**: Must align with `TIMESTAMP WITHOUT TIME ZONE` schema.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Python 3.13+).
- [x] **Schema Rules**: Adhering to existing schema constraints (naive timestamps).
- [x] **Verification Protocol**: Includes verification script and syntax checks.

## Project Structure

### Documentation (this feature)

```text
specs/019-fix-naive-utc/
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
todo-hackathon3/
├── app/
│   ├── api/
│   │   ├── deps.py      # Target: Session check
│   │   └── routes/
│   │       └── tasks.py # Target: updated_at logic
│   └── models.py        # Target: Defaults
└── check_tz.py          # Verification script
```

**Structure Decision**: Modified existing model in `todo-hackathon3`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
