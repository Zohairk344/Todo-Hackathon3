# Tasks: The Definitive Theme Fix

**Feature Branch**: `032-fix-theme-logic`
**Status**: Ready for Implementation

## Phase 1: Setup
*(No tasks required - utilizing existing project structure)*

## Phase 2: Foundational (Blocking)
**Goal**: Establish the split state management (Theme vs. Mode) and create missing UI components required for all stories.

- [x] T001 [US1] Refactor `ThemeStyleContext` to separate `style` into `theme` (visual) and `mode` (light/dark) state in `frontend/lib/theme-style-context.tsx`
- [x] T002 [US1] Create `ModeToggle` component with Light/Dark/System options in `frontend/components/mode-toggle.tsx`
- [x] T003 [US1] Update `ThemeSelector` to consume the new `theme` state and remove "System" from the theme list in `frontend/components/theme-selector.tsx`

## Phase 3: User Story 1 - Apply Fixed Custom Themes
**Goal**: Ensure selected themes apply reliably using high-specificity CSS selectors.
**Priority**: P1
**Independent Test**: Select "Hacker" and verify green/black styling persists; Select "Forest" and verify emerald styling.

- [x] T004 [US1] Implement Data-Attribute Theme Architecture (Base Pro, Hacker, Forest blocks) in `frontend/app/globals.css`
- [x] T005 [US1] Update `useEffect` logic in `ThemeStyleProvider` to apply `data-theme` attributes to document root in `frontend/lib/theme-style-context.tsx`

## Phase 4: User Story 2 - Forced Dark Mode Themes
**Goal**: Enforce Dark mode for specific themes (Hacker/Forest) and prevent user override.
**Priority**: P1
**Independent Test**: Set system to Light, select Hacker, verify Dark mode is forced and toggle is disabled.

- [x] T006 [US2] Implement logic to force `dark` class and lock mode when Hacker/Forest themes are active in `frontend/lib/theme-style-context.tsx`
- [x] T007 [US2] Update `ModeToggle` to visually disable and show tooltip when `isModeForced` is true in `frontend/components/mode-toggle.tsx`

## Phase 5: User Story 3 - Adaptive Vibrant Themes
**Goal**: Enable "Vibrant" and "Playful" themes to adapt to Light/Dark mode preference.
**Priority**: P2
**Independent Test**: Select "Vibrant", toggle between Light/Dark, verify distinct palettes. Switch from Hacker to Vibrant, verify previous mode preference restores.

- [x] T008 [US3] Add "Vibrant" and "Playful" adaptive CSS blocks (Light base + Dark overrides) in `frontend/app/globals.css`
- [x] T009 [US3] Implement logic to restore user's saved mode preference when switching from a forced theme to an adaptive theme in `frontend/lib/theme-style-context.tsx`

## Phase 6: Polish & Cross-Cutting
**Goal**: Final cleanups and ensuring correct file structure integration.

- [x] T010 Export `ModeToggle` and ensure it is placed in the layout or user navigation (e.g. `frontend/components/user-nav.tsx` or `frontend/app/dashboard/layout.tsx`) so it is accessible.

## Dependencies & Execution Order
1. **Foundational**: T001 -> T002 -> T003
2. **US1 (CSS & Logic)**: T004 + T005 (Parallelizable)
3. **US2 (Forced Logic)**: T006 -> T007
4. **US3 (Adaptive Logic)**: T008 + T009

## Parallel Execution Opportunities
- **CSS Work**: T004 (Base CSS) and T008 (Adaptive CSS) can be written independently, though T008 depends on the structure established in T004.
- **UI Components**: T002 (ModeToggle) and T003 (ThemeSelector) can be built in parallel once T001 (Context) is agreed upon.

## Implementation Strategy
- **MVP**: Complete Phase 2 and 3. This gives working Pro, Hacker, and Forest themes with correct CSS application.
- **Full Feature**: Complete Phase 4 and 5 to add the "Smart" logic for forced modes and adaptive Vibrant/Playful themes.