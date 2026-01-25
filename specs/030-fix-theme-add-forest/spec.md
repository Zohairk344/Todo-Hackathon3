# Feature Specification: Theme Repair & Expansion

**Feature Branch**: `030-fix-theme-add-forest`
**Created**: 2026-01-23
**Status**: Draft
**Input**: User description: "Update speckit.md to define Phase 4.3: Theme Repair & Expansion..."

## Clarifications
### Session 2026-01-23
- Q: Default Theme State → A: System (Check OS preference `prefers-color-scheme`)
- Q: Mobile Meta Theme Color → A: Yes (Dynamically update to match theme background)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Theme Application Logic (Priority: P1)

As a user, when I select a theme in the theme picker, I expect the application's visual appearance to change immediately to reflect my selection, ensuring the UI matches my preference.

**Why this priority**: This addresses a critical bug where the UI indicates a change (checkmark) but the actual visual theme does not update, causing confusion and a broken user experience.

**Independent Test**: Can be fully tested by selecting existing themes (e.g., Light, Dark, Midnight) and verifying that the `<html>` tag's class list updates and the visual colors change accordingly.

**Acceptance Scenarios**:

1. **Given** the application is loaded, **When** I select a different theme (e.g., switching from 'Light' to 'Dark'), **Then** the `class` attribute of the `<html>` element must immediately update to include the corresponding class (e.g., `dark`) and remove the previous one.
2. **Given** a theme is selected, **When** I reload the page, **Then** the selected theme must persist and be applied immediately upon load.
3. **Given** the 'System' theme is selected, **When** my operating system is in Dark Mode, **Then** the application must render using the Dark theme values.

---

### User Story 2 - Add "Forest" Theme (Priority: P2)

As a user, I want to select a "Forest" theme so that I have a nature-inspired dark mode option, balancing the available choices between light and dark variants.

**Why this priority**: Enhances user customization and fulfills the request to balance the theme options (2 Light, 2 Dark).

**Independent Test**: Can be tested by selecting "Forest" in the picker and verifying the specific green color palette is applied to UI elements.

**Acceptance Scenarios**:

1. **Given** the theme picker is open, **When** I look at the options, **Then** I see "Forest" listed as a selectable choice.
2. **Given** I select the "Forest" theme, **When** the theme applies, **Then** the `theme-forest` class is added to the `<html>` element.
3. **Given** the "Forest" theme is active, **When** I view the application background and cards, **Then** they display the specified dark green and emerald color palette (Background: Dark Green/Gray, Primary: Vibrant Emerald).

### Edge Cases

- What happens if the stored theme preference is invalid or no longer exists? (System should fall back to a default, likely 'system' or 'light').
- What happens if the OS system preference changes (e.g., Light to Dark) while "System" is selected? (The application should reactively update).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST ensure that changing the theme state triggers an update to the `document.documentElement` (`<html>` tag) class list.
- **FR-002**: System MUST explicitly remove all known conflicting theme classes (`light`, `dark`, `theme-midnight`, `theme-forest`) from the `<html>` tag before adding the new active theme class.
- **FR-003**: System MUST resolve the "System" theme preference to either 'light' or 'dark' based on the user's operating system settings before applying the CSS class.
- **FR-004**: System MUST define the "Forest" theme in the global CSS with the specific color values:
    - `--background`: 150 30% 10% (Dark Green/Gray)
    - `--card`: 150 25% 12%
    - `--primary`: 142 76% 36% (Vibrant Emerald)
    - `--primary-foreground`: White
    - `--muted`: 150 10% 20%
- **FR-005**: The Theme Picker UI component MUST include "Forest" in the list of available themes.
- **FR-006**: The "Forest" theme option MUST display a preview or icon consistent with the existing theme picker design.
- **FR-007**: System MUST default to "System" preference (checking `prefers-color-scheme`) when no theme is stored.
- **FR-008**: System MUST dynamically update the `<meta name="theme-color">` tag to match the active theme's background color.

### Key Entities *(include if feature involves data)*

- **Theme**: A distinct visual configuration identified by a unique key (e.g., 'light', 'dark', 'forest') and associated CSS variables.
- **Theme Configuration**: The mapping of semantic color names (background, primary) to specific HSL color values for each theme class.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Clicking any theme option in the picker results in the corresponding CSS class being applied to the `<html>` tag within 100ms.
- **SC-002**: The "Forest" theme is visible in the picker and, when active, renders the background with the HSL color `150 30% 10%`.
- **SC-003**: Switching between all 4 themes (Light, Dark, Midnight, Forest) and System produces zero console errors.
- **SC-004**: Reloading the application maintains the user's last selected theme (including "Forest") without reverting to a default.
