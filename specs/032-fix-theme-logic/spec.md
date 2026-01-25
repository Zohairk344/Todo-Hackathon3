# Feature Specification: The Definitive Theme Fix

**Feature Branch**: `032-fix-theme-logic`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "Update `speckit.md` to define **Phase 4.5: The Definitive Theme Fix**. **Context:** All custom themes fail to apply and revert to the default "Pro" look. This is a CSS specificity issue. Additionally, "Vibrant" needs to adapt to Light/Dark mode, whereas "Hacker" and "Forest" should force Dark mode. **Requirement 1: Global CSS Restructure (`app/globals.css`)** * **Strategy:** Use `data-theme` attributes for higher reliability than classes. * **Action:** Rewrite the file structure: 1. **Keep:** Standard `:root` and `.dark` (Base Shadcn). 2. **Append (At the VERY BOTTOM):** * `[data-theme="hacker"]` (Force Dark/Green variables). * `[data-theme="forest"]` (Force Dark/Emerald variables). * `[data-theme="playful"]` (Light Mode: Purple/White) & `[data-theme="playful"].dark` (Dark Mode: Purple/Black). * `[data-theme="vibrant"]` (Light Mode: Cyan/White) & `[data-theme="vibrant"].dark` (Dark Mode: Cyan/Deep Blue). * **Variable Fix:** Ensure ALL variables (background, foreground, card, primary, radius) are explicitly redefined in each block. **Requirement 2: Theme Provider Logic (`components/theme-provider.tsx`)** * **Action:** Update the `useEffect` logic. * **Logic:** 1. `const root = window.document.documentElement;` 2. `root.setAttribute("data-theme", theme);` (This triggers the CSS selectors above). 3. **The "Vibrant/Playful" Adaptive Check:** * If `theme` is "vibrant" or "playful": Use the user's *previous* mode preference (recover `savedMode` from localStorage, defaulting to system). Toggle the `.dark` class accordingly. * If `theme` is "hacker" or "forest": **Force** the `.dark` class (add it). * If `theme` is "pro" or "system": Remove `data-theme` attribute and rely on standard `.dark` toggling. **Requirement 3: Vibrant Theme Definition** * **Light:** `--background: 0 0% 100%`, `--primary: 320 90% 60%` (Hot Pink). * **Dark:** `--background: 240 20% 10%`, `--primary: 190 90% 50%` (Cyan). * **Radius:** `0.75rem`. Update the specification to use `data-theme` selectors and adaptive logic."

## Clarifications

### Session 2026-01-24
- Q: How should the Light/Dark mode toggle behave when a "forced dark" theme (Hacker/Forest) is active? → A: **Disable the toggle** (visually grayed out/unclickable) and show a tooltip explanation.

## User Scenarios & Testing

### User Story 1 - Apply Fixed Custom Themes (Priority: P1)

Users want their selected theme (Hacker, Forest, etc.) to apply reliably without reverting to the default look.

**Why this priority**: Core bug fix; current themes are broken.

**Independent Test**: Select "Hacker" theme and verify strict dark/green styling persists.

**Acceptance Scenarios**:

1. **Given** the user is on the dashboard, **When** they select "Hacker" theme, **Then** the UI changes to dark background with green accents and does not revert to default gray/white.
2. **Given** the user is on the dashboard, **When** they select "Forest" theme, **Then** the UI changes to dark background with emerald accents.

---

### User Story 2 - Forced Dark Mode Themes (Priority: P1)

Users expect specific themes (Hacker, Forest) to always be Dark, regardless of their system preference or previous toggle.

**Why this priority**: Ensures thematic consistency (Hacker themes shouldn't have a light mode).

**Independent Test**: Set system to Light mode, then select Hacker theme.

**Acceptance Scenarios**:

1. **Given** the user's system or preference is "Light", **When** they select "Hacker" or "Forest", **Then** the application forces Dark mode styling.
2. **Given** the user is in "Hacker" mode, **When** they look at the Light/Dark toggle, **Then** the toggle is disabled (grayed out) and unclickable.
3. **Given** the user hovers over the disabled toggle, **Then** a tooltip explains that the current theme forces Dark mode.

---

### User Story 3 - Adaptive Vibrant Themes (Priority: P2)

Users expect "Vibrant" and "Playful" themes to support both Light and Dark modes, adapting to their preference.

**Why this priority**: Provides flexibility for these specific themes.

**Independent Test**: Select "Vibrant" and toggle between Light and Dark modes.

**Acceptance Scenarios**:

1. **Given** the user selects "Vibrant", **When** they toggle Dark mode, **Then** the UI shifts from Cyan/White (Light) to Cyan/Deep Blue (Dark).
2. **Given** the user was previously in "Hacker" (Forced Dark), **When** they switch to "Vibrant", **Then** the system restores their previous Light/Dark preference (e.g., if they were Light before Hacker, it goes back to Light Vibrant) and re-enables the toggle.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST supports `data-theme` attributes on the root HTML element to scope CSS variables.
- **FR-002**: The "Hacker" theme MUST be defined using `[data-theme="hacker"]` and MUST strictly enforce Dark Mode variables (Green/Black).
- **FR-003**: The "Forest" theme MUST be defined using `[data-theme="forest"]` and MUST strictly enforce Dark Mode variables (Emerald/Dark).
- **FR-004**: The "Playful" theme MUST support both Light (`[data-theme="playful"]`) and Dark (`[data-theme="playful"].dark`) modes with Purple accents.
- **FR-005**: The "Vibrant" theme MUST support both Light (`[data-theme="vibrant"]`) and Dark (`[data-theme="vibrant"].dark`) modes with Hot Pink (Light) and Cyan (Dark) primaries.
- **FR-006**: The Theme Provider MUST apply the `data-theme` attribute to the document root based on the selected theme.
- **FR-007**: The Theme Provider MUST force the `.dark` class when "Hacker" or "Forest" themes are active.
- **FR-008**: The Theme Provider MUST remove the `data-theme` attribute when "Pro" or "System" themes are selected to revert to default Shadcn styling.
- **FR-009**: The Theme Provider MUST restore the user's previously saved Light/Dark mode preference when switching from a Forced Dark theme (Hacker/Forest) to an Adaptive theme (Vibrant/Playful/Pro).
- **FR-010**: All theme definitions in CSS MUST explicitly redefine `background`, `foreground`, `card`, `primary`, and `radius` variables to prevent specificity leakage from the default theme.
- **FR-011**: The UI MUST disable (visually gray out) the Light/Dark toggle switch when a forced-mode theme (Hacker/Forest) is active.

### Key Entities

- **Theme Configuration**: Set of CSS variables mapped to a specific `data-theme` and optional `.dark` class.
- **User Preference**: Stored state including `theme` (name) and `mode` (light/dark/system).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Selecting any custom theme applies the correct CSS variables 100% of the time without reloading the page.
- **SC-002**: "Hacker" and "Forest" themes render in Dark mode even if the user's browser/OS is set to Light mode.
- **SC-003**: "Vibrant" and "Playful" themes correctly render distinct Light and Dark variations.
- **SC-004**: Switching from a forced-dark theme back to an adaptive theme restores the user's original light/dark preference correctly.
- **SC-005**: Users cannot accidentally toggle Light mode when in a strict Dark theme (Hacker/Forest) due to disabled UI controls.
