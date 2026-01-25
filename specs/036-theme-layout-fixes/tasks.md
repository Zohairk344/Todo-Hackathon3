# Tasks: Theme Simplification and Layout Fixes

**Feature**: Theme Simplification and Layout Fixes
**Branch**: `036-theme-layout-fixes`
**Status**: Ready for Implementation

## Implementation Strategy
- **Phase 1**: Clean up the global CSS and remove custom themes.
- **Phase 2**: Simplify the theme logic in React components and remove the picker.
- **Phase 3**: Move and reposition the Chat Widget to the bottom-left.

## Phase 1: Setup & CSS Cleanup (Setup)
- [x] T001 [P] Remove custom theme blocks from globals CSS in `frontend/app/globals.css`
- [x] T002 [P] Verify and restore standard Shadcn light/dark variables in `frontend/app/globals.css`

## Phase 2: User Story 1 - Standard Light/Dark Mode Switching (Priority: P1)
**Goal**: Revert to standard light/dark toggling without custom theme logic.
**Independent Test**: Verify theme toggles between standard light/dark and no custom themes persist.

- [x] T003 [US1] Simplify ThemeProvider logic to standard next-themes in `frontend/components/theme-provider.tsx`
- [x] T004 [US1] Remove ThemePicker component usage from dashboard in `frontend/app/dashboard/page.tsx`
- [x] T005 [US1] Delete ThemePicker component file `frontend/components/dashboard/ThemePicker.tsx`
- [x] T006 [US1] Verify ModeToggle presence in Header (already exists) in `frontend/app/dashboard/layout.tsx`

## Phase 3: User Story 2 - Chat Widget Accessibility (Priority: P1)
**Goal**: Fix Chat Widget positioning to bottom-left outside the grid.
**Independent Test**: Widget appears fixed in bottom-left corner on all dashboard pages.

- [x] T007 [US2] Update ChatWidget internal styles to support external positioning or default to bottom-left in `frontend/components/dashboard/ChatWidget.tsx`
- [x] T008 [US2] Move ChatWidget component to DashboardLayout root in `frontend/app/dashboard/layout.tsx`
- [x] T009 [US2] Remove duplicate ChatWidget references (if any) from `frontend/app/dashboard/page.tsx`
- [x] T010 [US2] Apply fixed positioning classes (bottom-6 left-6 z-50) to widget container in `frontend/app/dashboard/layout.tsx`

## Phase 4: Verification & Polish
- [x] T011 Verify no hydration errors or console warnings
- [x] T012 Verify visual contrast in dark mode

## Dependencies
- US1 (Themes) and US2 (Layout) are largely independent and can be done in parallel, but CSS cleanup (Phase 1) should happen first to avoid visual regressions during layout work.

## Parallel Execution Examples
- T003 (ThemeProvider) and T007 (ChatWidget Styles) can be worked on simultaneously by different developers.
