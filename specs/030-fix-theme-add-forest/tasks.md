# Tasks: Theme Repair & Expansion

**Input**: Design documents from `specs/030-fix-theme-add-forest/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are excluded as this is a purely frontend visual feature, manual verification is prioritized.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project dependencies and environment setup

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `ThemeStyle` type definition in `frontend/lib/theme-style-context.tsx` to include "forest"

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fix Theme Application Logic (Priority: P1) 🎯 MVP

**Goal**: Ensure selecting a theme actually updates the DOM by migrating from attribute-based to class-based theming.

**Independent Test**: Select "Playful" or "Hacker" and verify `<html>` tag has `.theme-playful` or `.theme-hacker` class, and data attribute is removed (or ignored).

### Implementation for User Story 1

- [x] T003 [US1] Refactor `ThemeStyleProvider` in `frontend/lib/theme-style-context.tsx` to use `classList` manipulation instead of `setAttribute`
- [x] T004 [US1] Update `frontend/app/globals.css` to replace `:root[data-style="..."]` selectors with `.theme-...` class selectors
- [x] T005 [US1] Implement `useEffect` logic in `frontend/lib/theme-style-context.tsx` to clear old theme classes before adding the new one
- [x] T006 [US1] Add logic to `frontend/lib/theme-style-context.tsx` to resolve "system" preference to light/dark when no theme is explicitly set
- [x] T007 [US1] Implement mobile meta theme color update in `frontend/app/layout.tsx` (or appropriate layout file)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Add "Forest" Theme (Priority: P2)

**Goal**: Create a cohesive "Dark Nature" theme palette and make it selectable.

**Independent Test**: Select "Forest" in the picker and verify the green color palette is applied.

### Implementation for User Story 2

- [x] T008 [US2] Define `.theme-forest` CSS block in `frontend/app/globals.css` with specific HSL values
- [x] T009 [US2] Update `themes` array in `frontend/components/theme-selector.tsx` to include the "Forest" theme option
- [x] T010 [US2] Verify and adjust `frontend/app/globals.css` to ensure `.theme-forest` works correctly with `.dark` class if needed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T011 [P] Verify persistence of theme selection across page reloads
- [x] T012 [P] Manual visual verification of all themes (Pro, Playful, Hacker, Forest) in both Light and Dark OS modes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 CSS changes but can be implemented in parallel

### Within Each User Story

- T002 (Type update) before T003/T009
- T004 (CSS refactor) should happen alongside T003 (Logic refactor) to avoid broken state
- T008 (Forest CSS) independent of T004 but relies on the new class strategy

### Parallel Opportunities

- T003 (Logic) and T004 (CSS Refactor) can technically be parallelized but require close coordination
- T008 (Forest CSS) and T009 (Picker UI) can run in parallel
- T011 and T012 (Verification) can be done by different testers

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test theme switching logic independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Fixes existing broken themes
3. Add User Story 2 → Test independently → Adds new "Forest" theme
4. Each story adds value without breaking previous stories