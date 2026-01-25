# Tasks: Phase 5: Total Theme Reconstruction

**Feature**: Total Theme Reconstruction
**Status**: Completed
**Branch**: 033-theme-reconstruction
**Plan**: [plan.md](plan.md)
**Spec**: [spec.md](spec.md)

## Implementation Strategy

- **MVP First**: Establish the CSS foundation first (Phase 1), as everything depends on it.
- **Incremental Logic**: Build the logic provider next (Phase 2), enabling the switching mechanism.
- **UI & Polish**: Finally, update the UI picker (Phase 3) and verify all themes (Phase 4).

## Phase 1: CSS Clean Slate & Foundation

**Goal**: Establish a clean CSS baseline with `data-theme` architecture.
**Independent Test**: Verify `app/globals.css` has no `.theme-*` classes and new `[data-theme]` blocks exist.

- [x] T001 Remove legacy theme classes from app/globals.css
- [x] T002 Implement "Hacker" theme (Forced Dark) in app/globals.css
- [x] T003 Implement "Forest" theme (Forced Dark) in app/globals.css
- [x] T004 Implement "Playful" theme (Adaptive) in app/globals.css
- [x] T005 Implement "Vibrant" theme (Adaptive) in app/globals.css

## Phase 2: Logic Core Rewrite (User Story 1 & 2)

**Goal**: Rewrite the theme provider to handle forced vs. adaptive logic.
**Independent Test**: Verify `data-theme` attribute appears/disappears correctly on `<html>` when changing themes programmatically.

- [x] T006 [US1] Rewrite ThemeProvider to use localStorage and data attributes in components/theme-provider.tsx
- [x] T007 [US2] Implement logic for Forced Dark themes (Hacker/Forest) in components/theme-provider.tsx
- [x] T008 [US2] Implement logic for Adaptive themes (Playful/Vibrant) in components/theme-provider.tsx

## Phase 3: UI Updates (User Story 3)

**Goal**: Update the frontend to reflect the new architecture.
**Independent Test**: Theme Picker shows all options and clicking them triggers the correct state change.

- [x] T009 [US3] Update ThemePicker options in components/dashboard/ThemePicker.tsx

## Phase 4: Polish & Verification

**Goal**: Ensure specific success criteria are met.

- [x] T010 Verify SC-002: Hacker/Forest always render in dark mode
- [x] T011 Verify SC-004: Adaptive themes switch palettes correctly

## Dependencies

1.  **Phase 1** (CSS) blocks **Phase 2** (Logic) - Logic needs CSS selectors to target.
2.  **Phase 2** (Logic) blocks **Phase 3** (UI) - UI needs the provider to be updated to work correctly.

## Parallel Execution Opportunities

- None significantly. The flow is strictly sequential: CSS -> Logic -> UI.