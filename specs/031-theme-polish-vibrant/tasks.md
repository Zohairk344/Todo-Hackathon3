# Tasks: Theme Perfection & Premium Polish

**Input**: Design documents from `specs/031-theme-polish-vibrant/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are excluded as this is a purely frontend visual feature, manual verification is prioritized.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project dependencies and environment setup

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `ThemeStyle` type definition in `frontend/lib/theme-style-context.tsx` to include "vibrant"

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fix Visual Regressions (Priority: P1) 🎯 MVP

**Goal**: Restore distinct visual identities for existing themes by strictly isolating CSS variables.

**Independent Test**: Select "Hacker" -> Verify sharp corners (`border-radius: 0`) and neon green. Select "Playful" -> Verify rounded corners (`border-radius: 1.5rem`) and pastel colors.

### Implementation for User Story 1

- [x] T003 [US1] Reset `:root` variables in `frontend/app/globals.css` to define sensible defaults (Pro theme)
- [x] T004 [US1] Refactor `.theme-hacker` block in `frontend/app/globals.css` to strictly override `--radius: 0rem` and core colors
- [x] T005 [US1] Refactor `.theme-playful` block in `frontend/app/globals.css` to strictly override `--radius: 1.5rem` and core colors
- [x] T006 [US1] Refactor `.theme-forest` block in `frontend/app/globals.css` to strictly override `--radius: 0.5rem` and core colors

**Checkpoint**: At this point, existing themes should look visually distinct and correct.

---

## Phase 4: User Story 2 - Add "Vibrant" Theme (Priority: P2)

**Goal**: Add a high-saturation, energetic theme with distinct Light and Dark palettes.

**Independent Test**: Select "Vibrant" in the picker and verify the Electric Blue/Hot Pink palette.

### Implementation for User Story 2

- [x] T007 [US2] Define `.theme-vibrant` block in `frontend/app/globals.css` for Light Mode (Electric Blue)
- [x] T008 [US2] Define `.dark .theme-vibrant` block in `frontend/app/globals.css` for Dark Mode (Deep Purple) overrides
- [x] T009 [US2] Add "Vibrant" theme to `themes` array in `frontend/components/theme-selector.tsx`
- [x] T010 [US2] Update `useEffect` logic in `frontend/lib/theme-style-context.tsx` to handle "vibrant" class application

**Checkpoint**: At this point, the new Vibrant theme should be selectable and functional.

---

## Phase 5: User Story 3 - Premium Animations & Polish (Priority: P3)

**Goal**: Make the interface feel smooth and responsive with animations.

**Independent Test**: Refresh the dashboard and observe elements fading in. Hover over a card and observe it scaling up.

### Implementation for User Story 3

- [x] T011 [US3] Add global transition rule to `*` selector in `frontend/app/globals.css` targeting specific properties
- [x] T012 [US3] Define `@keyframes fade-in-up` and `.animate-enter` utility class in `frontend/app/globals.css`
- [x] T013 [US3] Apply `.animate-enter` to main containers in `frontend/app/dashboard/page.tsx`
- [x] T014 [US3] Add `.hover-scale` utility class in `frontend/app/globals.css`
- [x] T015 [US3] Apply `.hover-scale` to interactive cards and buttons in `frontend/components/theme-selector.tsx` and other UI components

**Checkpoint**: At this point, the UI should feel fluid and animated.

---

## Phase 6: User Story 4 - Fix Technical Debt (Priority: P4)

**Goal**: Remove console warnings about deprecated metadata.

**Independent Test**: Check browser console during build or runtime for `themeColor` warnings.

### Implementation for User Story 4

- [x] T016 [US4] Remove `themeColor` from `metadata` export in `frontend/app/layout.tsx`
- [x] T017 [US4] Add `viewport` export with `themeColor` configuration in `frontend/app/layout.tsx`

**Checkpoint**: Console logs should be clean of metadata warnings.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T018 [P] Verify `theme-color` meta tag updates correctly for "vibrant" theme in `frontend/lib/theme-style-context.tsx`
- [x] T019 [P] Manual visual verification of all themes (Pro, Playful, Hacker, Forest, Vibrant) in both Light and Dark OS modes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Blocks US2.
- **User Stories (Phase 3+)**: 
    - US1 (Isolation) is foundational for US2 (Vibrant).
    - US3 (Animations) can run parallel to US1/US2 CSS work but integration tasks depend on CSS existing.
    - US4 (Metadata) is independent.

### User Story Dependencies

- **US1 (P1)**: Fixes the base CSS architecture. Should go first.
- **US2 (P2)**: Depends on US1's architecture strategy.
- **US3 (P3)**: Visual polish, best done after layout is stable.
- **US4 (P4)**: Isolated layout change.

### Parallel Opportunities

- T016/T017 (Metadata) can run anytime.
- T011-T015 (Animations) can be developed alongside T003-T006 (CSS Refactor) if careful with file conflicts.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup & Foundation.
2. Refactor CSS (US1) to fix broken themes.
3. Add Vibrant Theme (US2) to complete visual options.
4. **VALIDATE**: Ensure all themes look distinct.

### Incremental Delivery

1. Fix Regressions (US1) -> Deploy/Commit.
2. Add Vibrant (US2) -> Deploy/Commit.
3. Add Animations (US3) -> Deploy/Commit.
4. Fix Metadata (US4) -> Deploy/Commit.
