# Feature Specification: Theme Simplification & Layout Fixes

**Feature Branch**: `034-theme-layout-simplification`  
**Created**: 2026-01-24  
**Status**: Draft  
**Input**: User description: "Update speckit.md to define Phase 5: Simplification & Layout Fixes. Context: The user wants to abandon the complex multi-theme system in favor of a standard, reliable Light/Dark toggle in the header. Additionally, the Chat Widget is incorrectly nested inside the task area and needs to be moved to the bottom-left of the screen. Requirement 1: Theme Simplification (app/globals.css) * Action: 1. DELETE all custom [data-theme="..."] blocks (Hacker, Forest, Playful, Vibrant). 2. Revert to standard Shadcn CSS variables for :root (Light) and .dark (Dark). 3. Verify variables: --background, --foreground, --primary, etc., are correctly set for standard black/white contrast. Requirement 2: Remove Custom Logic (components/theme-provider.tsx & ThemePicker.tsx) * Action: 1. Revert ThemeProvider to use the standard next-themes logic without custom useEffect hooks for data attributes. 2. Delete/Disable the ThemePicker component (the card selection UI) since it's no longer needed. 3. Ensure the Header has the standard ModeToggle (Sun/Moon icon) for switching modes. Requirement 3: Fix Chat Button Position (app/dashboard/layout.tsx or page.tsx) * Problem: The chat button is currently rendered inside the main grid container, which clips it or positions it awkwardly. * Fix: Move the <ChatWidget /> component out of the dashboard grid and into the root DashboardLayout. * CSS: Apply fixed bottom-6 left-6 z-50 to the widget container. (User specifically requested Bottom Left). Update the specification to reflect this clean-up."

## Clarifications

### Session 2026-01-24
- Q: How should the system handle users who have a legacy theme currently selected? → A: Automatically fallback to "system" or "light" if the saved theme is no longer valid.
- Q: What should be the default theme for the application? → A: System (matches user's OS preference).
- Q: Should the Chat Widget be visible outside of the authenticated dashboard area? → A: Dashboard only (strictly within the authenticated dashboard layout).
- Q: How should the widget behave on small screens (mobile viewports)? → A: Hide on mobile (viewports < 768px).
- Q: Should the theme switch include a transition effect? → A: Smooth transition (e.g., `transition-colors duration-200`).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standard Light/Dark Toggle (Priority: P1)

As a user, I want to switch between Light and Dark modes using a familiar and reliable toggle in the header, so that I can adjust the interface to my environment without complexity.

**Why this priority**: High. This replaces the current buggy multi-theme system with a standard, expected feature that improves accessibility and user experience.

**Independent Test**: Can be fully tested by clicking the sun/moon icon in the header and observing the entire application theme change between standard light and dark variants.

**Acceptance Scenarios**:

1. **Given** the application is in Light mode, **When** the user clicks the theme toggle in the header and selects "Dark", **Then** the application immediately applies the dark theme variables.
2. **Given** the application is in Dark mode, **When** the user clicks the theme toggle and selects "Light", **Then** the application immediately applies the light theme variables.

---

### User Story 2 - Consistent Chat Access (Priority: P1)

As a user, I want the chat widget to be positioned consistently at the bottom-left of my screen, so that I can easily access help without it being hidden or clipped by other layout elements.

**Why this priority**: High. The current positioning is broken (nested in a grid), making the feature difficult or impossible to use in certain viewport sizes.

**Independent Test**: Can be fully tested by navigating different pages and scrolling; the chat widget should remain fixed at the bottom-left.

**Acceptance Scenarios**:

1. **Given** any dashboard page, **When** the page loads, **Then** the chat widget is visible at the bottom-left corner of the viewport.
2. **Given** a dashboard page with long content, **When** the user scrolls down, **Then** the chat widget remains fixed at the bottom-left of the screen.

---

### Edge Cases

- **Theme Persistence**: Does the theme preference persist after a page refresh? (It should, handled by `next-themes`).
- **Mobile Viewport**: Does the fixed chat widget at `bottom-6 left-6` overlap with critical UI elements on mobile? (Should be verified).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove all custom `[data-theme="..."]` blocks (Hacker, Forest, Playful, Vibrant) from the global CSS.
- **FR-002**: System MUST revert to standard Shadcn CSS variables for `:root` (Light) and `.dark` (Dark) to ensure high contrast and readability.
- **FR-003**: System MUST remove custom synchronization logic from the `ThemeProvider` that manually sets data attributes.
- **FR-004**: System MUST disable or remove the `ThemePicker` (card-based selection UI) and ensure it is no longer reachable by the user.
- **FR-005**: System MUST include a standard `ModeToggle` (Sun/Moon icon) in the header for theme switching.
- **FR-006**: System MUST move the `ChatWidget` component from the dashboard grid/page content into the root `DashboardLayout`.
- **FR-007**: System MUST apply CSS to the `ChatWidget` container to fix it at `bottom-6 left-6` with `z-index: 50`.
- **FR-008**: System MUST default to "system" theme preference for new users or if no valid preference is found.
- **FR-009**: System MUST automatically fallback to "system" or "light" if a legacy theme (e.g., "Forest") is detected in local storage.
- **FR-010**: System MUST restrict Chat Widget visibility to the authenticated dashboard area only.
- **FR-011**: System MUST hide the Chat Widget on mobile viewports (width < 768px) to prevent layout obstruction.
- **FR-012**: System MUST apply a smooth color transition (e.g., 200ms) when toggling between theme states.

### Key Entities

- **Theme**: Represents the visual state of the application (Light or Dark).
- **ChatWidget**: A persistent UI element for user assistance, now decoupled from page-level layout constraints.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Theme switching completes instantly upon user interaction.
- **SC-002**: Zero references to "Hacker", "Forest", "Playful", or "Vibrant" themes remain in the active application code/UI.
- **SC-003**: The Chat Widget is 100% visible on all dashboard routes and is not clipped by any parent containers.
- **SC-004**: System successfully persists the Light/Dark choice across sessions using standard local storage (via `next-themes`).