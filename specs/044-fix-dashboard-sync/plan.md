# Implementation Plan: Fix Dashboard Sync

**Branch**: `044-fix-dashboard-sync` | **Date**: 2026-02-03 | **Spec**: [specs/044-fix-dashboard-sync/spec.md](spec.md)
**Input**: Feature specification from `/specs/044-fix-dashboard-sync/spec.md`

## Summary
The goal is to stabilize the Dashboard by aligning the Frontend `Task` interface with the Backend's `snake_case` model, restoring the `NewTaskDialog` UI to project standards, and hardening the `TasksContext` to prevent unauthorized data fetching during session initialization.

## Technical Context
**Language/Version**: TypeScript 5+, Next.js 16.1.1 (Frontend) / Python 3.10+ (Backend)
**Primary Dependencies**: React Context, Radix UI, Lucide React, FastAPI
**Storage**: PostgreSQL (Neon)
**Testing**: Manual verification + lint checks
**Target Platform**: Web (Next.js)
**Project Type**: Full-stack (Web App)
**Constraints**: Must match Backend `snake_case` format; must use Shadcn UI design patterns.

## Constitution Check
- [x] **Tech Stack**: Matches Constitution (Next.js, FastAPI, SQLModel).
- [x] **Schema Rules**: Standardizing on Backend `snake_case` as per Constitution II.1.
- [x] **Verification Protocol**: Tasks will include linting and manual UI verification scripts.

## Project Structure

### Documentation (this feature)
```text
specs/044-fix-dashboard-sync/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # Standardized Task entity
├── quickstart.md        # Verification guide
├── contracts/           # API expectations
└── tasks.md             # Implementation tasks (generated via /sp.tasks)
```

### Source Code
```text
frontend/
├── components/
│   └── dashboard/
│       ├── new-task-dialog.tsx  # Restoration of Select UI
│       └── task-view.tsx        # Property mapping fix
├── context/
│   └── tasks-context.tsx        # Race condition hardening
└── services/
    └── todo-service.ts          # Interface standardization
```

**Structure Decision**: Single project layout with distinct frontend and backend (nested) directories.

## Complexity Tracking
*No constitution violations detected.*