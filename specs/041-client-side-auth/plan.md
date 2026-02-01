# Implementation Plan: Cross-Domain Client-Side Authentication Fix

**Branch**: `041-client-side-auth` | **Date**: 2026-02-01 | **Spec**: [specs/041-client-side-auth/spec.md]
**Input**: Feature specification from `/specs/041-client-side-auth/spec.md`

## Summary

The core requirement is to resolve a "Redirect Loop" caused by server-side cookie isolation between Vercel and Hugging Face. The technical approach is to move authentication validation to the client-side using a React Context-based `AuthProvider`. This provider will fetch the session using `credentials: "include"`, enabling the browser to send HttpOnly cookies to the backend domain.

## Technical Context

**Language/Version**: TypeScript 5+, Next.js 14+ (App Router)
**Primary Dependencies**: React Context API, Lucide React (for UI)
**Storage**: Client-side state (Context), Backend (PostgreSQL)
**Testing**: Vitest/React Testing Library
**Target Platform**: Vercel (Frontend), Hugging Face (Backend)
**Project Type**: Web application
**Performance Goals**: Session validation < 500ms
**Constraints**: Cross-domain HttpOnly cookie support
**Scale/Scope**: All authenticated routes under `/dashboard`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js/React/FastAPI)
- [x] **Schema Rules**: Ironclad mapping followed? (Existing schema reused)
- [x] **Verification Protocol**: Are sanity check scripts and syntax checks included in tasks? (Will be added in /sp.tasks)

## Project Structure

### Documentation (this feature)

```text
specs/041-client-side-auth/
├── plan.md              # This file
├── research.md          # Research on cross-domain auth
├── data-model.md        # Client-side state model
├── quickstart.md        # Setup guide
├── contracts/           
│   └── auth.md          # get-session API contract
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
frontend/
├── app/
│   └── dashboard/
│       └── layout.tsx   # Refactor to Client Component
├── components/
│   └── dashboard/
│       ├── user-nav.tsx # Consume useAuth
│       └── client-chat-wrapper.tsx # Consume useAuth
├── context/             # NEW: Context providers
│   └── auth-provider.tsx # New AuthProvider
└── lib/
    └── api.ts           # Utility for authenticated fetch
```

**Structure Decision**: Web application structure (frontend/backend separation).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Client-Side Auth | Cross-domain cookie isolation | SSR cannot access Hugging Face cookies from Vercel |