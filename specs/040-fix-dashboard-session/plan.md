# Implementation Plan: Dashboard Session Integration

**Branch**: `040-fix-dashboard-session` | **Date**: 2026-02-01 | **Spec**: [specs/040-fix-dashboard-session/spec.md]
**Input**: Feature specification from `/specs/040-fix-dashboard-session/spec.md`

## Summary

The objective is to replace the hardcoded mock user in `frontend/app/dashboard/layout.tsx` with a real server-side session check. This will involve fetching the user's session from the backend `/api/auth/get-session` endpoint using the `session_token` cookie. The resulting user data will be passed to the Chatbot and Navigation components, resolving database `IntegrityError` issues and correcting displayed user info. Unauthenticated users will be redirected to `/sign-in?callbackUrl=/dashboard`.

## Technical Context

**Language/Version**: Next.js 14+ (App Router), TypeScript 5+, Python 3.10+ (Backend)
**Primary Dependencies**: `next/headers`, `next/navigation`, `better-auth` (backend)
**Storage**: Neon (PostgreSQL) via SQLModel
**Testing**: `npm run build`, Manual verification of session propagation
**Target Platform**: Hugging Face Spaces (Docker)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Server-side session validation < 300ms
**Constraints**: Must use server components for route protection to avoid hydration mismatches.
**Scale/Scope**: Dashboard route protection and component data propagation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js 14, Python 3.10, Neon)
- [x] **Schema Rules**: Ironclad mapping followed? (Using existing User/Session tables)
- [x] **Verification Protocol**: Are sanity check scripts and syntax checks included in tasks? (Frontend build check included)

## Project Structure

### Documentation (this feature)

```text
specs/040-fix-dashboard-session/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── app/
│   └── dashboard/
│       └── layout.tsx   # Primary modification point
├── lib/
│   └── api.ts           # API utilities
└── components/
    ├── user-nav.tsx     # Consumer of session data
    └── chatbot/         # Consumer of session ID
```

**Structure Decision**: Web application structure with frontend/backend separation. Focus is on the frontend dashboard layout.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
