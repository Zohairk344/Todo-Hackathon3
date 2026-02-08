# Tasks: Dashboard UI Overhaul

**Input**: Design documents from `/specs/049-dashboard-ui-overhaul/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install dependencies `framer-motion`, `clsx`, `tailwind-merge` in `frontend/`
- [x] T002 Verify `package.json` contains new dependencies in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Update global CSS variables for dark mode and glassmorphism in `frontend/app/globals.css`
- [x] T004 Apply global radial gradient background to the dashboard layout in `frontend/app/dashboard/layout.tsx`

**Checkpoint**: Foundation ready - UI elements can now be themed and animated.

---

## Phase 3: User Story 1 - Premium Visual Experience (Priority: P1) 🎯 MVP

**Goal**: Transform the dashboard into a high-budget dark mode with glassmorphic cards and neon accents.

**Independent Test**: Navigate to `/dashboard` and verify the dark gradient background, glassy task cards, and neon priority badges.

### Implementation for User Story 1

- [x] T005 [P] [US1] Apply glassmorphism styling (`bg-white/5`, `backdrop-blur-md`, `border-white/10`) to task cards in `frontend/components/dashboard/task-view.tsx`
- [x] T006 [P] [US1] Update priority badges to use "Neon" styles (low-opacity backgrounds with glowing borders) in `frontend/components/dashboard/task-view.tsx`
- [x] T007 [P] [US1] Apply glassy styling and focus-state glow to the task search bar in `frontend/components/dashboard/task-view.tsx`
- [x] T008 [US1] Implement priority-specific soft shadows (glows) for task cards in `frontend/components/dashboard/task-view.tsx`

**Checkpoint**: User Story 1 functional - the "Dark & Glowing" aesthetic is established.

---

## Phase 4: User Story 2 - Dynamic Task Interactions (Priority: P1)

**Goal**: Implement smooth animations and staggered transitions for a "lively" feel.

**Independent Test**: Add a task or filter the list; tasks should slide in smoothly. Hover over a card to see the 200ms scale transition.

### Implementation for User Story 2

- [x] T009 [US2] Import `motion` and `AnimatePresence` and wrap task list in `frontend/components/dashboard/task-view.tsx`
- [x] T010 [US2] Convert task cards to `motion.div` with staggered fade-in and slide-up entry animations in `frontend/components/dashboard/task-view.tsx`
- [x] T011 [US2] Implement smooth hover scale (1.02) and border glow transitions (200ms) in `frontend/components/dashboard/task-view.tsx`
- [x] T012 [US2] Configure animations to re-trigger on list updates (filtering/searching) in `frontend/components/dashboard/task-view.tsx`
- [x] T013 [US2] Add logic to fade or remove priority glows for completed tasks in `frontend/components/dashboard/task-view.tsx`

**Checkpoint**: User Story 2 functional - the dashboard feels "alive" and responsive.

---

## Phase 5: User Story 3 - Streamlined UI Navigation (Priority: P2)

**Goal**: Clean up the dashboard header and emphasize the primary "Add Task" action.

**Independent Test**: Verify the "Add Category" button is gone from the header and the "Add Task" button has a vibrant gradient.

### Implementation for User Story 3

- [x] T014 [P] [US3] Remove the redundant "Add Category" button from the dashboard header in `frontend/app/dashboard/page.tsx`
- [x] T015 [P] [US3] Update the "Add Task" button with a high-contrast vibrant gradient in `frontend/app/dashboard/page.tsx`

**Checkpoint**: User Story 3 functional - navigation is streamlined.

---

## Phase 7: Build Fixes (Priority: P0)

**Purpose**: Resolve TypeScript compilation errors between Context and Components.

- [x] T019 Update `updateTaskStatus` signature in `frontend/context/tasks-context.tsx` to match View requirements.
- [x] T020 Align ID types (String -> Number) in `frontend/components/dashboard/task-view.tsx`.
- [x] T021 Expose `refreshTasks` in `frontend/context/tasks-context.tsx` for `ClientChatWrapper`.
- [x] T022 Update `Task` and `Category` interfaces to use `snake_case` in `frontend/services/todo-service.ts`.
- [x] T023 Restore `TasksProvider` and `ClientChatWrapper` in `frontend/app/dashboard/layout.tsx`.

---

## Phase 6: Visual Unification (Priority: P1)

**Goal**: Synchronize the visual language across Dashboard and Auth pages.

- [x] T024 Unify Dashboard Theme by removing local backgrounds in `frontend/app/dashboard/layout.tsx`
- [x] T025 Implement Glassmorphism for Sign In page in `frontend/app/(auth)/sign-in/page.tsx`
- [x] T026 Implement Glassmorphism for Sign Up page in `frontend/app/(auth)/sign-up/page.tsx`

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T016 [P] Verify WCAG-compliant contrast ratios for all neon and gradient elements
- [x] T017 [P] Verify that animations respect system "Reduced Motion" preferences
- [x] T018 Run `quickstart.md` validation to ensure all criteria are met

---

## Phase 9: Final Polish & Branding (Priority: P1)

**Purpose**: Final visual refinements and brand unification.

- [x] T027 [P] Lighten task detail text (description, date, category) for better visibility on dark background in `frontend/components/dashboard/task-view.tsx`
- [x] T028 [P] Implement pink/violet gradients on Home Page headline and buttons in `frontend/app/page.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must run first to install `framer-motion`.
- **Foundational (Phase 2)**: Depends on Setup - provides the background and CSS utilities.
- **User Story 1 & 2 (P1)**: Can run in parallel after Foundation is ready. US2 depends on US1's card structure.
- **User Story 3 (P2)**: Independent UI cleanup.

### Parallel Opportunities

- T005, T006, T007 (US1 styling) can run in parallel.
- T014, T015 (US3 cleanup) can run in parallel.
- Polish tasks T016, T017 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational layers.
2. Implement US1 (Aesthetic) and US2 (Animation) as they define the core "High-Budget" feel.
3. Validate visual and motion fidelity.

### Incremental Delivery

1. Foundation ready.
2. Add Visuals (US1).
3. Add Motion (US2).
4. Cleanup Navigation (US3).