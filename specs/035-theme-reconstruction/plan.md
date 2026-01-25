# Implementation Plan: Total Theme Reconstruction (Phase 5)

**Branch**: `035-theme-reconstruction` | **Date**: 2026-01-25 | **Spec**: [specs/035-theme-reconstruction/spec.md](spec.md)
**Input**: Feature specification from `/specs/035-theme-reconstruction/spec.md`

## Summary

The current theme implementation suffers from CSS specificity conflicts and "leaking" styles. This phase executes the "Clean Slate Protocol": a complete rewrite of the theme engine. We will replace the patchwork class-based approach with a strict data-attribute architecture (`[data-theme="name"]`), rebuild the logic engine to support forced (dark-only) and adaptive themes, and align the UI picker with the new system.

## Technical Context

**Language/Version**: TypeScript (Frontend), Next.js 14+ (App Router)  
**Primary Dependencies**: Tailwind CSS, `next-themes` (standard in project), Lucide React  
**Storage**: Local Storage (Theme State persistence)  
**Testing**: Manual visual verification + DOM attribute checking (Standard for UI themes)  
**Target Platform**: Web (Cross-browser compatible)
**Project Type**: Web application (Frontend focus)  
**Performance Goals**: <50ms theme switch time, zero layout shift  
**Constraints**: Zero CSS specificity conflicts outside of base Tailwind; strictly global theme scope  
**Scale/Scope**: 5 definitive palettes, 1 root logic engine, 1 UI picker component  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js 14, Tailwind confirmed)
- [x] **Schema Rules**: N/A (UI-only change, no backend models modified)
- [x] **Verification Protocol**: Are sanity check scripts and syntax checks included in tasks? (Will be included in /sp.tasks)

## Project Structure

### Documentation (this feature)

```text
specs/035-theme-reconstruction/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output
```

### Source Code

```text
frontend/
├── app/
│   └── globals.css             # CSS Architecture Rewrite
├── components/
│   └── theme-provider.tsx      # Logic Engine Rewrite
└── components/dashboard/
    └── ThemePicker.tsx         # UI Alignment
```

**Structure Decision**: Web application structure with focus on the `frontend/` directory as specified in the Constitution.

## Complexity Tracking

*No violations detected.*