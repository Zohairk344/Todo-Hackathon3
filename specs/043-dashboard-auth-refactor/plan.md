# Implementation Plan: Secure Dashboard Data Fetching via TasksContext

**Branch**: `043-dashboard-auth-refactor` | **Date**: 2026-02-02 | **Spec**: [specs/043-dashboard-auth-refactor/spec.md](specs/043-dashboard-auth-refactor/spec.md)
**Input**: Feature specification from `/specs/043-dashboard-auth-refactor/spec.md`

## Summary

Refactor the Dashboard UI (`page.tsx`, `AddTaskForm`, `CategoryPicker`, `TaskList`) to exclusively use `TasksContext` for all data operations. This eliminates potential "legacy" insecure `fetch` calls and ensures all API requests include the necessary session cookies via `api-client.ts`. The plan includes strict verification of the current implementation and removal of any lingering direct API calls (e.g., in `frontend/lib/api.ts` if used).

## Technical Context

**Language/Version**: TypeScript 5+ (Frontend), Python 3.10+ (Backend)
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, FastAPI, SQLModel
**Storage**: Neon (PostgreSQL) via SQLModel & SQLAlchemy
**Testing**: Playwright (implied by skills), Jest (if available)
**Target Platform**: Web (Vercel/Hugging Face Spaces)
**Project Type**: web
**Performance Goals**: UI updates < 200ms
**Constraints**: Must use existing `api-client.ts` for authentication compliance.
**Scale/Scope**: Dashboard feature (Page + Modals).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js + Python/FastAPI)
- [x] **Schema Rules**: Ironclad mapping followed? (Verified against `models.py`)
- [x] **Verification Protocol**: Are sanity check scripts and syntax checks included in tasks? (Will be in `/sp.tasks`)

## Project Structure

### Documentation (this feature)

```text
specs/043-dashboard-auth-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── openapi.yaml
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── tasks.py
│   │       └── categories.py
│   └── models.py
└── tests/

frontend/
├── app/
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── add-task-form.tsx
│   ├── category-picker.tsx
│   ├── task-list.tsx
│   └── features/
│       ├── edit-task-dialog.tsx
│       └── task-toolbar.tsx
├── context/
│   └── tasks-context.tsx
└── lib/
    ├── api-client.ts  # Secure
    └── api.ts         # Legacy (avoid)
```

**Structure Decision**: Standard Full-Stack Web Application structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |