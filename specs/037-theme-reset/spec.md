# Feature Specification: Total Theme Reset (Light/Dark Only)

**Feature Branch**: `037-theme-reset`  
**Created**: 2026-01-25  
**Status**: Draft  
**Input**: User description: "Update speckit.md to define Phase 6: Total Theme Reset (Light/Dark Only). Context: The current theme implementation is broken, missing dependencies, and causing build errors. The user wants to abandon all custom themes and revert to a standard, bulletproof Light/Dark toggle."

## Clarifications

### Session 2026-01-25
- Q: What should be the default behavior for a brand-new user? → A: System Preference
- Q: Should we explicitly require a blocking script or specific technique to prevent theme flickering? → A: Strict "No-Flash" Requirement
- Q: How should components with color overrides behave after the reset? → A: Revert to Standard Semantic Classes
- Q: Should we implement a global smooth transition for theme switches? → A: Smooth CSS Transitions

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reliable Theme Toggling (Priority: P1)

As a dashboard user, I want to switch between Light and Dark modes using a single, intuitive control so that I can adjust the interface to my environment.

**Why this priority**: Core functionality. Replaces the current broken system with a stable, standard implementation.

**Independent Test**: Can be tested by clicking the mode toggle in the header and verifying the interface colors update immediately to the expected light or dark variant.

**Acceptance Scenarios**:

1. **Given** the application is in Light mode, **When** the user clicks the mode toggle, **Then** the application switches to Dark mode and all UI elements update their styling.
2. **Given** the application is in Dark mode, **When** the user clicks the mode toggle, **Then** the application switches to Light mode.

---

### User Story 2 - Theme Persistence (Priority: P2)

As a returning user, I want my theme preference to be remembered so that I don't have to re-select it every time I open the application.

**Why this priority**: Essential for a professional user experience and standard for modern web applications.

**Independent Test**: Can be tested by selecting a theme, refreshing the page or reopening the browser, and verifying the previously selected theme is applied automatically.

**Acceptance Scenarios**:

1. **Given** the user has selected "Dark" mode, **When** the user refreshes the page, **Then** the application remains in "Dark" mode.

---

### User Story 3 - UI Simplification (Priority: P2)

As a user, I want a clean settings interface without non-functional or confusing theme options so that I can manage my preferences efficiently.

**Why this priority**: Removes "broken" features (custom themes) that are currently causing confusion and build issues.

**Independent Test**: Can be tested by navigating to the Settings page and verifying that only Light/Dark options are available, and no "Theme Picker" with custom colors exists.

**Acceptance Scenarios**:

1. **Given** the user is on the Settings page, **When** viewing theme options, **Then** only Light/Dark mode controls are visible.

---

### Edge Cases

- **System Preference Sync**: The system MUST default to the user's OS/Browser setting (System Preference) on initial load if no preference is found in storage.
- **Incomplete Styling**: All components with hardcoded or custom theme colors MUST be updated to use standard semantic CSS variables (e.g., `bg-primary`, `text-foreground`) to ensure automatic adaptation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a single "Mode Toggle" (Sun/Moon icon) in the global Header.
- **FR-002**: System MUST persist the user's theme choice (Light, Dark, or System) across sessions.
- **FR-003**: System MUST use standard CSS variables (HLS) for all themeable colors to ensure consistency.
- **FR-004**: System MUST remove all custom theme options (e.g., "Forest", "Vibrant") from the UI and logic.
- **FR-005**: System MUST ensure full compatibility with standard accessibility contrast ratios in both modes.
- **FR-006**: System MUST prevent "Flash of Unstyled Content" (FOUC) by resolving the theme before the first paint.
- **FR-007**: System MUST implement a smooth CSS transition (e.g., 200-300ms) for background and text colors when switching themes.

### Key Entities *(include if feature involves data)*

- **User Preference**: Represents the user's interface settings, specifically the `theme` attribute (values: `light`, `dark`, `system`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Application build completes with zero errors related to theme dependencies or missing CSS variables.
- **SC-002**: Interface updates to the selected theme instantly with zero visible flicker or theme flashing on page load.
- **SC-003**: 100% of custom theme references (UI components and logic) are removed from the application.
- **SC-004**: Theme preference is correctly loaded from local storage on 100% of page initializations.