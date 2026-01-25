# Tasks: Total Theme Reconstruction

**Input**: Design documents from `/specs/035-theme-reconstruction/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Sanitize `frontend/app/globals.css` by removing all legacy `.theme-*` class blocks as per "The Purge" strategy

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement core `[data-theme]` attribute architecture at the bottom of `frontend/app/globals.css`
- [x] T003 Rewrite basic `ThemeProvider` logic in `frontend/components/theme-provider.tsx` to include root attribute sanitization and `localStorage` persistence

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Switch to "Forced Dark" Theme (Priority: P1) 🎯 MVP

**Goal**: Enable Hacker and Forest themes that force dark mode regardless of system preference.

**Independent Test**: Select "Hacker" in UI and verify `data-theme="hacker"` and `.dark` class are applied simultaneously.

### Implementation for User Story 1

- [x] T004 [US1] Define Hacker theme variables (True Black, Neon Green, Radius 0) in `frontend/app/globals.css`
- [x] T005 [US1] Define Forest theme variables (Deep Green, Emerald, Radius 0.5) in `frontend/app/globals.css`
- [x] T006 [US1] Implement Forced Dark logic in `frontend/components/theme-provider.tsx` for `hacker` and `forest` theme keys

**Checkpoint**: User Story 1 is functional. Hacker and Forest themes work correctly.

---

## Phase 4: User Story 2 - Switch to "Adaptive" Theme (Priority: P2)

**Goal**: Enable Playful and Vibrant themes that adapt colors based on system preference.

**Independent Test**: Select "Playful" and toggle OS dark mode; verify background changes from Lavender to Deep Purple.

### Implementation for User Story 2

- [x] T007 [US2] Define Playful palette (Light Lavender / Dark Purple) in `frontend/app/globals.css`
- [x] T008 [US2] Define Vibrant palette (Light White / Dark Navy) in `frontend/app/globals.css`
- [x] T009 [US2] Implement Adaptive logic (toggling `.dark` class based on preference) in `frontend/components/theme-provider.tsx` for `playful` and `vibrant`

**Checkpoint**: User Story 2 is functional. Playful and Vibrant themes adapt to system mode.

---

## Phase 5: User Story 3 - Clean Default Experience (Priority: P3)

**Goal**: Provide standard Pro and System themes with neutral Zinc/Slate colors.

**Independent Test**: Select "Pro" and verify no `data-theme` attribute is present on the `html` element.

### Implementation for User Story 3

- [x] T010 [US3] Define Pro (Default) palette variables in `:root` and `.dark` blocks within `frontend/app/globals.css`
- [x] T011 [US3] Implement logic for `pro` and `system` themes in `frontend/components/theme-provider.tsx` to handle standard class toggling without attributes

**Checkpoint**: All themes specified in the requirements are now functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UI alignment and performance verification

- [x] T012 [P] Update `themes` array in `frontend/components/dashboard/ThemePicker.tsx` to match IDs: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`
- [ ] T013 [P] Verify 50ms switch time and zero layout shift (SC-001) using browser performance tools
- [x] T014 [P] Verify TypeScript syntax and imports in `frontend/components/theme-provider.tsx` as per Verification Protocol
- [ ] T015 [P] Run final validation of all success criteria defined in `spec.md`, including a manual audit for CSS specificity (SC-002)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first to clean the environment.
- **Foundational (Phase 2)**: Depends on Setup - Blocks implementation of specific themes.
- **User Stories (Phase 3-5)**: Can be implemented sequentially or in parallel once Phase 2 is complete.
- **Polish (Phase 6)**: Final alignment and verification.

### Parallel Opportunities

- T004, T005 (CSS definitions) can be done in parallel with T006 (Logic) within US1.
- T012 (UI Picker) can be done in parallel with any theme implementation tasks.
- Once T003 (Logic core) is ready, different developers could implement US1, US2, and US3 in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete US1 (Hacker/Forest).
3. Validate "Forced Dark" behavior.

### Incremental Delivery

1. Foundation + US1 → Forced Dark MVP.
2. Add US2 → Adaptive Themes.
3. Add US3 → Standard Experience.
4. Polish UI and performance.
