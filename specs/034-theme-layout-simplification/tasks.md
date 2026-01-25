# Tasks: Theme Simplification & Layout Fixes

**Feature Branch**: `034-theme-layout-simplification`
**Status**: **Ready for Implementation**

## Dependencies

- **User Story 1** (Standard Light/Dark Toggle) depends on **Foundational Phase** (CSS & Provider update).
- **User Story 2** (Consistent Chat Access) is largely independent but shares `app/dashboard/layout.tsx` with US1 tasks.
- **Phase Order**: Setup -> Foundational -> US1 -> US2 -> Polish.

## Parallel Execution Opportunities

- **T002 (CSS)** and **T006 (Chat Layout)** can be started in parallel.
- **T004 (ThemePicker)** and **T008 (Chat Cleanup)** are independent cleanup tasks.

---

## Phase 1: Setup

*Goal: Verify environment readiness.*

- [x] T001 Verify `next-themes` and `lucide-react` are installed and dependencies are clean. `package.json`

---

## Phase 2: Foundational

*Goal: Reset the CSS baseline and replace the complex theme engine with a standard provider.*

- [x] T002 [P] **CSS Clean Slate**: Delete all `[data-theme]` blocks and restore standard Shadcn variables for `:root` and `.dark`. Add global transition rule (`* { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 200ms; }`) to satisfy FR-012. `frontend/app/globals.css`
- [x] T003 **Provider Refactor**: Rewrite `ThemeStyleProvider` to wrap standard `NextThemesProvider` (attribute="class", defaultTheme="system"). Add `useEffect` to detect legacy themes ("hacker", "forest", etc.) in localStorage and reset to "system". `frontend/lib/theme-style-context.tsx`

---

## Phase 3: User Story 1 - Standard Light/Dark Toggle (P1)

*Goal: Enable reliable Light/Dark switching via the header.*

**Independent Test**: Click Sun/Moon icon -> Theme changes instantly. Refresh -> Theme persists.

- [x] T004 [US1] **Cleanup Theme Picker**: Remove or comment out `<ThemePicker />` component usage. `frontend/components/dashboard/ThemePicker.tsx` (or where used, likely settings page)
- [x] T005 [US1] **Add Mode Toggle**: Ensure the standard `ModeToggle` component (Sun/Moon) is imported and rendered in the dashboard header. `frontend/app/dashboard/layout.tsx`

---

## Phase 4: User Story 2 - Consistent Chat Access (P1)

*Goal: Position chat widget at bottom-left, visible on all dashboard pages.*

**Independent Test**: Navigate to Dashboard -> Widget visible at bottom-left. Scroll -> Widget stays fixed. Resize < 768px -> Widget hidden.

- [x] T006 [US2] **Async Layout**: Convert `DashboardLayout` to an async component. Fetch user session using `auth.api.getSession` to retrieve `user.id`. `frontend/app/dashboard/layout.tsx`
- [x] T007 [US2] **Render Widget**: Import `ClientChatWrapper`. Render it outside the `<main>` tag with classes `fixed bottom-6 left-6 z-50 hidden md:block`. Pass `userId` from session. `frontend/app/dashboard/layout.tsx`
- [x] T008 [US2] [P] **Page Cleanup**: Remove `<ClientChatWrapper />` from the dashboard page to prevent duplication. `frontend/app/dashboard/page.tsx`

---

## Final Phase: Polish

*Goal: Verify integration and build health.*

- [x] T009 **Verification**: Run `npm run build` to ensure no type errors from the layout conversion or missing props. Verify application startup. `frontend/`
