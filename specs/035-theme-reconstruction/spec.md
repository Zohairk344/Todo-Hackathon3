# Feature Specification: Total Theme Reconstruction (Phase 5)

**Feature Branch**: `035-theme-reconstruction`  
**Created**: 2026-01-25  
**Status**: Draft  
**Input**: User description: "Update `speckit.md` to define **Phase 5: Total Theme Reconstruction**. **Context:** The current theme implementation suffers from CSS specificity conflicts and "leaking" styles. We are abandoning the previous patch-work approach. **Instruction:** We will effectively "Rewrite" the theme engine from scratch. **Requirement 1: Clean Slate CSS (`app/globals.css`)** * **Action:** 1. Keep ONLY the standard Tailwind directives (`@tailwind base;` etc.) and the basic `layer base` setup for defaults. 2. **DELETE** all existing `.theme-hacker`, `.theme-forest`, `.theme-playful` class blocks. 3. **Implement New Architecture:** Use **Data Attributes** (`[data-theme="name"]`) placed at the **VERY BOTTOM** of the file to guarantee precedence. **Requirement 2: The Definitive Theme Palettes (CSS)** * Define these exact blocks at the bottom of `globals.css`: * **Pro (Default):** Defined in `:root` and `.dark`. Neutral Zinc/Slate colors. Radius: `0.5rem`. * **Hacker (Forced Dark):** * Selector: `[data-theme="hacker"]` * Variables: `--background: 0 0% 0%;` (True Black), `--primary: 142 70% 50%;` (Neon Green), `--radius: 0rem;` (Sharp). * **Forest (Forced Dark):** * Selector: `[data-theme="forest"]` * Variables: `--background: 150 30% 8%;` (Deep Green), `--primary: 142 70% 45%;` (Emerald), `--radius: 0.5rem;`. * **Playful (Adaptive):** * Selector: `[data-theme="playful"]` (Light Base): `--background: 262 20% 97%;` (Lavender), `--primary: 262 80% 60%;` (Purple), `--radius: 1.5rem;` (Round). * Selector: `[data-theme="playful"] .dark` (Dark Override): `--background: 262 20% 10%;` (Deep Purple). * **Vibrant (Adaptive):** * Selector: `[data-theme="vibrant"]` (Light Base): `--background: 0 0% 100%;` (White), `--primary: 330 80% 60%;` (Hot Pink), `--radius: 0.75rem;`. * Selector: `[data-theme="vibrant"] .dark` (Dark Override): `--background: 220 20% 10%;` (Navy Blue), `--primary: 190 90% 50%;` (Cyan). **Requirement 3: The "Brain" Logic (`components/theme-provider.tsx`)** * **Action:** Completely rewrite the `useEffect` hook handling theme changes. * **Logic:** 1. **Sanitize:** `root.removeAttribute("data-theme")`. 2. **Check Base Preference:** Is the system/user preferring Dark mode? 3. **Apply Logic:** * **If Hacker/Forest:** `setAttribute("data-theme", theme)` AND `classList.add("dark")`. (Always Dark). * **If Playful/Vibrant:** `setAttribute("data-theme", theme)`. Then, IF base preference is dark, `classList.add("dark")`, ELSE `classList.remove("dark")`. (Adaptive). * **If Pro/System:** Do NOT set attribute. Just toggle `.dark` class based on preference. **Requirement 4: The UI (`components/dashboard/ThemePicker.tsx`)** * **Action:** Update the options array to match these IDs exactly: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`. Update the specification to enforce this clean, conflict-free architecture."

## Clarifications

### Session 2026-01-25

- Q: Which persistence mechanism should be the primary source of truth for the theme state? → A: Local Storage (Client-side primary)
- Q: Should the theme engine actively listen for system light/dark mode preference changes while the app is open? → A: Yes (Real-time listener)
- Q: Should the theme engine include a CSS transition for color/background properties when switching themes? → A: No (Instant switch)
- Q: What should the fallback theme be if the stored preference is missing or invalid? → A: System (Default)
- Q: Should themes always be applied globally to the html/body tags, or should the architecture support scoping themes to specific sub-containers? → A: Global only (html/body)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch to "Forced Dark" Theme (Priority: P1)

As a user who prefers high-contrast or specialized dark environments, I want to select the "Hacker" or "Forest" theme and have the application immediately switch to a dark mode layout regardless of my system preference.

**Why this priority**: Core requirement for accessibility and branding. Forced themes ensure a specific visual identity.

**Independent Test**: Can be tested by selecting "Hacker" in the theme picker and verifying the `data-theme="hacker"` attribute is on the root element and the `.dark` class is present, even if system preference is light.

**Acceptance Scenarios**:

1. **Given** the user is in "System" (Light) mode, **When** they select "Hacker", **Then** the application becomes black/green and the `.dark` class is applied.
2. **Given** the user is in "System" (Light) mode, **When** they select "Forest", **Then** the application becomes deep green/emerald and the `.dark` class is applied.

---

### User Story 2 - Switch to "Adaptive" Theme (Priority: P2)

As a user who enjoys expressive color palettes, I want to select the "Playful" or "Vibrant" theme and have it adapt its background and colors based on whether I have dark mode enabled in my system or user settings.

**Why this priority**: Provides a polished, modern experience that respects user environmental preferences while offering thematic flavor.

**Independent Test**: Select "Playful" and toggle system dark mode. The background should change from lavender (light) to deep purple (dark) while maintaining the "Playful" identity (rounding, etc.).

**Acceptance Scenarios**:

1. **Given** the application is in Light mode, **When** the user selects "Playful", **Then** the background is lavender and the UI is rounded.
2. **Given** the application is in Dark mode, **When** the user selects "Playful", **Then** the background is deep purple and the UI is rounded.

---

### User Story 3 - Clean Default Experience (Priority: P3)

As a user who prefers standard UI, I want to use the "Pro" or "System" themes and have the application appear in a clean, neutral Zinc/Slate palette that follows standard dark mode behavior.

**Why this priority**: Essential for users who find specialized themes distracting or who prefer the default professional look.

**Independent Test**: Select "Pro" and verify no `data-theme` attribute is present on the root element, and standard Tailwind variables are used.

**Acceptance Scenarios**:

1. **Given** any theme is active, **When** the user selects "Pro", **Then** all specialized colors are removed and the UI returns to neutral Zinc/Slate.

---

### Edge Cases

- **System Preference Change**: If the user has "Adaptive" or "System" themes active, the application MUST use a real-time listener to react instantly when the OS toggles light/dark mode.
- **Theme Desynchronization**: What happens if the `data-theme` attribute is manually removed or modified? (The `theme-provider` hook should re-sync it).
- **Initial Load**: Ensuring no flicker occurs when the page loads before JS execution (handled by standard Next.js `next-themes` patterns, but critical for the rewrite).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Clean Slate" CSS architecture by removing all legacy `.theme-*` class blocks and relying on data attributes.
- **FR-002**: System MUST implement themes using data attributes (`[data-theme="name"]`) applied globally to the root element (html) and defined at the end of the stylesheet to ensure priority over base styles.
- **FR-003**: System MUST define five definitive palettes: Pro (Default), Hacker (Forced Dark), Forest (Forced Dark), Playful (Adaptive), and Vibrant (Adaptive).
- **FR-004**: System MUST apply "Forced Dark" logic for Hacker and Forest themes, adding the `.dark` class regardless of user/system preference.
- **FR-005**: System MUST apply "Adaptive" logic for Playful and Vibrant themes, toggling the `.dark` class based on base preference.
- **FR-006**: System MUST sanitize the root element by removing existing `data-theme` attributes before applying new ones.
- **FR-007**: The Theme Picker UI MUST support exactly these options: `pro`, `hacker`, `forest`, `playful`, `vibrant`, `system`.

### Key Entities

- **Theme Palette**: A set of CSS variables (`--background`, `--primary`, `--radius`, etc.) associated with a specific `data-theme` identifier.
- **Theme State**: The current selection in the application (stored in local storage) which dictates which palette and base mode (light/dark) is active. Defaults to 'system' if preference is missing or invalid.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of theme switches occur in under 50ms with instant changes (no CSS transitions) and without layout shift.
- **SC-002**: Zero CSS specificity conflicts (verified by ensuring no `.theme-name .some-class` overrides are needed outside the data-attribute blocks).
- **SC-003**: Theme definitions are reduced in complexity by moving from complex class hierarchies to a flat data-attribute structure.
- **SC-004**: "Forced Dark" themes (Hacker/Forest) result in the `.dark` class being present 100% of the time they are active.
- **SC-005**: The UI theme picker matches the specified list of six IDs exactly.