# Implementation Plan: Theme Simplification and Layout Fixes

**Branch**: `036-theme-layout-fixes` | **Date**: 2026-01-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/036-theme-layout-fixes/spec.md`

## Summary

This feature simplifies the application's theming system by removing custom themes (Forest, Hacker, etc.) and reverting to a standard Light/Dark mode implementation using `next-themes` and Shadcn UI defaults. Additionally, it fixes the positioning of the AI Chat Widget, moving it to the bottom-left corner of the screen to avoid layout clipping and improve accessibility.

## Technical Context

**Language/Version**: TypeScript 5+ (Frontend), Python 3.10+ (Backend - Unchanged)
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, next-themes, lucide-react
**Storage**: N/A
**Testing**: Manual Verification (Visual regression checks)
**Target Platform**: Web (Desktop & Mobile)
**Project Type**: Web Application
**Performance Goals**: N/A
**Constraints**: Must use standard Shadcn CSS variables for proper contrast.
**Scale/Scope**: Frontend-only refactoring.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution? (Next.js, Tailwind)
- [x] **Schema Rules**: Ironclad mapping followed? (N/A)
- [x] **Verification Protocol**: Are sanity check scripts and syntax checks included in tasks? (Will be included in tasks.md)

## Project Structure

### Documentation (this feature)

```text
specs/036-theme-layout-fixes/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (Empty)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── globals.css           # Refactored for standard themes
│   └── dashboard/
│       └── layout.tsx        # Chat widget positioning context
├── components/
│   ├── theme-provider.tsx    # Simplified logic
│   ├── mode-toggle.tsx       # Standard toggle
│   └── dashboard/
│       ├── ChatWidget.tsx    # Positioning update
│       └── ThemePicker.tsx   # To be deleted
```

**Structure Decision**: Frontend-focused refactoring within existing `frontend/` directory.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |