# Implementation Plan: Total Theme Reset (Phase 6)

**Branch**: `037-theme-reset` | **Date**: 2026-01-25 | **Spec**: [specs/037-theme-reset/spec.md](spec.md)
**Input**: Feature specification from `/specs/037-theme-reset/spec.md`

## Summary
The current theme implementation is broken and contains conflicting custom logic. This plan restores a bulletproof, standard Shadcn UI Light/Dark system by resetting the CSS foundation (`globals.css`), Tailwind configuration, and logic providers. All custom themes (Forest, Vibrant, etc.) and the `ThemePicker` component will be deleted to ensure stability and clean UI.

## Technical Context

**Language/Version**: TypeScript 5+, Next.js 16.1.1 (App Router)
**Primary Dependencies**: `next-themes`, `tailwindcss`, `lucide-react`, `tailwindcss-animate`
**Storage**: LocalStorage (client-side theme state)
**Testing**: Manual UI verification + Build integrity check
**Target Platform**: Web (Responsive)
**Project Type**: Web application
**Performance Goals**: Instant theme switching (<100ms), zero FOUC (Flash of Unstyled Content)
**Constraints**: Must use standard HSL CSS variables; must support System preference sync
**Scale/Scope**: 5 core files modified/created; 1 component deleted

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js/Tailwind used correctly)
- [x] **Schema Rules**: N/A (No DB changes)
- [x] **Verification Protocol**: Build check and manual theme verification included in strategy.

## Project Structure

### Documentation (this feature)

```text
specs/037-theme-reset/
├── plan.md              # This file
├── research.md          # Standard palette & CSS engine research
├── data-model.md        # Client-side UserPreference state
├── quickstart.md        # Setup & cleanup steps
├── contracts/           # N/A (No API changes)
└── tasks.md             # To be created by /sp.tasks
```

### Source Code

```text
frontend/
├── app/
│   ├── globals.css      # Reset to standard
│   └── dashboard/
│       ├── layout.tsx   # Refactor to use new Header component
│       └── settings/
│           └── page.tsx # Remove ThemePicker
├── components/
│   ├── theme-provider.tsx # Reset to simple wrapper
│   └── dashboard/
│       ├── Header.tsx     # NEW: Extracted header with ModeToggle
│       └── ThemePicker.tsx # DELETED
├── tailwind.config.ts     # Reset to standard
└── package.json           # Verify dependencies
```

**Structure Decision**: Standard Next.js/Shadcn layout. Extracting `Header` to `components/dashboard/` for better isolation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
