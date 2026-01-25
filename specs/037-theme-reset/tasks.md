# Tasks: Total Theme Reset (Phase 6)

**Input**: Design documents from `/specs/037-theme-reset/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Manual verification of theme toggling and persistence is required. No automated tests requested for this phase.

**Organization**: Tasks are grouped by user story to ensure a clean transition from the broken custom theme system to a standard implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependency stabilization to stop build errors.

- [x] T001 [P] Install core styling dependencies: `tailwindcss-animate`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge` in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Restore the standard Shadcn styling engine and Tailwind configuration.

**⚠️ CRITICAL**: This foundation must be stable before UI components can be safely refactored.

- [x] T002 Reset `frontend/app/globals.css` to standard Shadcn Zinc palette with `:root` and `.dark` variables
- [x] T003 Reset `frontend/tailwind.config.ts` to map HSL variables and include `tailwindcss-animate` plugin

**Checkpoint**: Styling foundation restored - build errors related to missing variables should be resolved.

---

## Phase 3: User Story 2 - Theme Persistence (Priority: P2)

**Goal**: Ensure the user's theme choice is remembered across sessions and loads without flickering (No-Flash).

**Independent Test**: Select "Dark" mode, refresh the page, and verify the application remains in Dark mode with zero visible flicker.

- [x] T004 [US2] Reset `frontend/components/theme-provider.tsx` to a simple `next-themes` pass-through wrapper

**Checkpoint**: Theme logic is now standard; persistence is handled by `next-themes`.

---

## Phase 4: User Story 1 - Reliable Theme Toggling (Priority: P1) 🎯 MVP

**Goal**: Provide a single, intuitive Sun/Moon toggle for Light/Dark mode switching.

**Independent Test**: Toggle the mode in the dashboard header and verify the interface updates immediately.

- [x] T005 [P] [US1] Create/Verify `frontend/components/mode-toggle.tsx` using standard `useTheme` logic from `next-themes`
- [x] T006 [P] [US1] Create `frontend/components/dashboard/Header.tsx` by extracting the header UI with the `ModeToggle`
- [x] T007 [US1] Update `frontend/app/dashboard/layout.tsx` to use the new `Header` component and verify layout integrity

**Checkpoint**: User Story 1 is functional; theme switching is active via the header.

---

## Phase 5: User Story 3 - UI Simplification (Priority: P2)

**Goal**: Remove all non-functional custom theme options and the broken Theme Picker.

**Independent Test**: Navigate to the Settings page and confirm the "Appearance" card and `ThemePicker` are gone.

- [x] T008 [P] [US3] Delete `frontend/components/dashboard/ThemePicker.tsx` entirely
- [x] T009 [US3] Remove `ThemePicker` reference and Appearance card from `frontend/app/dashboard/settings/page.tsx`

**Checkpoint**: UI is cleaned; custom themes are fully removed from the user interface.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification of the "bulletproof" implementation.

- [x] T010 Verify build integrity with `npm run build` to confirm zero CSS or dependency errors
- [x] T011 [P] Confirm smooth CSS transitions (200-300ms) are active for background and text colors (FR-007)
- [x] T012 Run `quickstart.md` validation to ensure a clean developer experience

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must run first to ensure libraries exist.
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS all UI work.
- **User Story 2 (Phase 3)**: Foundational for US1 to prevent logic conflicts.
- **User Story 1 (Phase 4)**: The core MVP functionality.
- **User Story 3 (Phase 5)**: Cleanup phase.
- **Polish (Phase 6)**: Final verification.

### Parallel Opportunities

- T001 (Setup) can run while reviewing T002/T003 logic.
- T005 and T006 can be developed in parallel as they touch different component files.
- T008 and T011 can be handled in parallel during the cleanup and polish phases.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Stabilize dependencies and foundation (Phases 1 & 2).
2. Reset theme provider logic (Phase 3).
3. Implement the ModeToggle and Header (Phase 4).
4. **STOP and VALIDATE**: Confirm toggling works and persistence is active.

### Incremental Delivery

1. **Foundation Ready**: CSS variables and Tailwind config restored.
2. **Logic Ready**: `next-themes` integration simplified.
3. **UI Ready**: Header toggle active.
4. **Cleanup Ready**: Broken components removed.
