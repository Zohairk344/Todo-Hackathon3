# Feature Specification: Theme Simplification and Layout Fixes

**Feature Branch**: `036-theme-layout-fixes`
**Created**: 2026-01-25
**Status**: Draft
**Input**: User description: "Update `speckit.md` to define **Phase 5: Simplification & Layout Fixes**. **Context:** The user wants to abandon the complex multi-theme system in favor of a standard, reliable Light/Dark toggle in the header. Additionally, the Chat Widget is incorrectly nested inside the task area and needs to be moved to the bottom-left of the screen. **Requirement 1: Theme Simplification (`app/globals.css`)** * **Action:** 1. **DELETE** all custom `[data-theme="..."]` blocks (Hacker, Forest, Playful, Vibrant). 2. **Revert** to standard Shadcn CSS variables for `:root` (Light) and `.dark` (Dark). 3. **Verify** variables: `--background`, `--foreground`, `--primary`, etc., are correctly set for standard black/white contrast. **Requirement 2: Remove Custom Logic (`components/theme-provider.tsx` & `ThemePicker.tsx`)** * **Action:** 1. Revert `ThemeProvider` to use the standard `next-themes` logic without custom `useEffect` hooks for data attributes. 2. **Delete/Disable** the `ThemePicker` component (the card selection UI) since it's no longer needed. 3. **Ensure** the Header has the standard `ModeToggle` (Sun/Moon icon) for switching modes. **Requirement 3: Fix Chat Button Position (`app/dashboard/layout.tsx` or `page.tsx`)** * **Problem:** The chat button is currently rendered *inside* the main grid container, which clips it or positions it awkwardly. * **Fix:** Move the `<ChatWidget />` component out of the dashboard grid and into the root `DashboardLayout`. * **CSS:** Apply `fixed bottom-6 left-6 z-50` to the widget container. (User specifically requested **Bottom Left**). Update the specification to reflect this clean-up."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standard Light/Dark Mode Switching (Priority: P1)

Users should be able to switch between Light and Dark modes using a simple toggle in the header, with reliable high-contrast styling.

**Why this priority**: The current multi-theme system is complex and potentially buggy. A standard system ensures better usability and maintenance.

**Independent Test**: Can be tested by toggling the theme and verifying standard colors are applied without custom theme artifacts.

**Acceptance Scenarios**:

1. **Given** the user is on the dashboard, **When** they click the mode toggle (sun/moon), **Then** the application theme switches between Light and Dark modes.
2. **Given** the application is in Light mode, **When** viewed, **Then** the background is white/light and text is dark (standard Shadcn contrast).
3. **Given** the application is in Dark mode, **When** viewed, **Then** the background is dark/black and text is light.
4. **Given** a user previously selected a custom theme (e.g., "Forest"), **When** they reload the page, **Then** the application falls back to the standard Light or Dark mode (or System preference).

---

### User Story 2 - Chat Widget Accessibility (Priority: P1)

Users need to access the AI Chat Widget from any dashboard screen without it being clipped or oddly positioned within the content area.

**Why this priority**: The chat widget is a core feature but is currently visually broken/clipped.

**Independent Test**: Can be tested by navigating to different dashboard pages and checking the widget's position.

**Acceptance Scenarios**:

1. **Given** the user is on any dashboard page, **When** they look at the bottom-left corner, **Then** the Chat Widget button is visible.
2. **Given** the Chat Widget is open, **When** scrolling the dashboard content, **Then** the widget remains fixed in position (bottom-left) and z-indexed above the content.
3. **Given** the dashboard grid layout, **When** the widget renders, **Then** it is NOT constrained by the grid cells (it is outside the grid container).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support only Light and Dark color modes.
- **FR-002**: System MUST remove all CSS support for custom themes ("Hacker", "Forest", "Playful", "Vibrant").
- **FR-003**: System MUST use standard Shadcn UI CSS variables for `:root` (Light) and `.dark` (Dark) to ensure proper contrast.
- **FR-004**: The `ThemeProvider` MUST rely on standard `next-themes` logic without custom `useEffect` hooks for data attributes.
- **FR-005**: The `ThemePicker` component (card selection UI) MUST be removed or disabled from the UI.
- **FR-006**: The Header MUST include a standard `ModeToggle` component for switching between Light and Dark modes.
- **FR-007**: The `ChatWidget` component MUST be rendered outside the main dashboard grid content flow.
- **FR-008**: The `ChatWidget` MUST be positioned using `fixed bottom-6 left-6 z-50` CSS classes.

### Key Entities

- **Theme Configuration**: Simplified to just `class="dark"` or no class (Light), managed by `next-themes`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Custom theme data attributes (`data-theme="forest"`, etc.) are never present on the `<html>` or `<body>` tag.
- **SC-002**: Chat Widget is 100% visible (no clipping) on all dashboard viewports larger than mobile breakpoints.
- **SC-003**: Theme toggle successfully switches CSS variables from light to dark values (verified by computed styles).
- **SC-004**: No console errors related to missing theme attributes or hydration mismatches from theme logic.

### Edge Cases

- **Legacy Local Storage**: Users might have old theme preferences saved in local storage. The system should gracefully ignore these and default to system or light/dark.
- **Mobile View**: Verify that the bottom-left position of the chat widget does not overlap with essential mobile navigation if applicable (though request specifically asked for bottom-left).