# Implementation Plan - The Definitive Theme Fix

**Feature**: The Definitive Theme Fix
**Status**: In Progress

## Technical Context

**Language/Framework**: TypeScript, Next.js, Tailwind CSS
**Key Components**:
- `app/globals.css`: Global styles and Shadcn variables.
- `components/theme-provider.tsx` (To be created/renamed from `lib/theme-style-context.tsx` or wrapped): Logic for theme application.
- `frontend/lib/theme-style-context.tsx`: Current state management (needs refactoring).
- `frontend/components/theme-selector.tsx`: Current UI (needs update).

**Architecture**:
- **CSS Strategy**: Move from class-based specificity (which is failing) to `data-theme` attribute selectors.
- **State Management**: Refactor `ThemeStyleContext` to track `theme` (Visual Style) and `mode` (Light/Dark/System) separately.
- **Overrides**: "Hacker" and "Forest" are opinionated (Dark only). "Vibrant" and "Playful" are adaptive.

**Resolved Clarifications**:
- **Q**: Does `components/theme-provider.tsx` wrap `next-themes`? **A**: No, custom implementation in `lib/theme-style-context.tsx`.
- **Q**: Where is the "Light/Dark" toggle component? **A**: It does not exist. We must create `components/mode-toggle.tsx`.

## Constitution Check

### Principles
- [x] **Smallest viable change**: Modifying existing CSS and Provider logic.
- [x] **Testable**: Independent test cases defined for each theme behavior.
- [x] **Performance**: Pure CSS variables for theming is performant.
- [x] **Security**: No new data handling or API endpoints.

### Gates
- [x] **Design**: Approved.
- [x] **Spec**: Complete and unambiguous.

## Phase 0: Research & Discovery

### Research Tasks
- [x] Verify `components/theme-provider.tsx` implementation details. -> Found `frontend/lib/theme-style-context.tsx`.
- [x] Locate the Light/Dark toggle component. -> Does not exist, will create.
- [x] Confirm `next-themes` version/usage. -> Not used.

### Decisions
- **Decision**: Use `data-theme` attribute for scoping.
  - **Rationale**: Higher specificity than utility classes, cleanly separates "Theme" (Palette) from "Mode" (Light/Dark).
- **Decision**: Split `ThemeStyleContext` state into `theme` and `mode`.
  - **Rationale**: User scenarios require independent control of "Vibrant" (Theme) and "Light/Dark" (Mode), which is impossible with the current single-list approach.
- **Decision**: Create `ModeToggle` component.
  - **Rationale**: Required to fulfill "Vibrant needs to adapt to Light/Dark mode" scenario (user needs a way to switch modes).

## Phase 1: Design & Contracts

### Artifacts to Generate
1.  **`specs/032-fix-theme-logic/data-model.md`**: Define the Client-Side State Model (`ThemeState`, `Theme`, `Mode`).
2.  **`specs/032-fix-theme-logic/quickstart.md`**: Developer guide for using the new Theme system.
