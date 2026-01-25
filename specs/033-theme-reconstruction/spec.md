# Feature Specification: Phase 5: Total Theme Reconstruction

**Feature Branch**: `033-theme-reconstruction`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "Update `speckit.md` to define **Phase 5: Total Theme Reconstruction**. **Context:** The current theme implementation suffers from CSS specificity conflicts and "leaking" styles. We are abandoning the previous patch-work approach. **Instruction:** We will effectively "Rewrite" the theme engine from scratch. **Requirement 1: Clean Slate CSS (`app/globals.css`)** * **Action:** 1. Keep ONLY the standard Tailwind directives (`@tailwind base;` etc.) and the basic `layer base` setup for defaults. 2. **DELETE** all existing `.theme-hacker`, `.theme-forest`, `.theme-playful` class blocks. 3. **Implement New Architecture:** Use **Data Attributes** (`[data-theme="name"]`) placed at the **VERY BOTTOM** of the file to guarantee precedence. **Requirement 2: The Definitive Theme Palettes (CSS)** * Define these exact blocks at the bottom of `globals.css`: * **Pro (Default):** Defined in `:root` and `.dark`. Neutral Zinc/Slate colors. Radius: `0.5rem`. * **Hacker (Forced Dark):** * Selector: `[data-theme="hacker"]` * Variables: `--background: 0 0% 0%;` (True Black), `--primary: 142 70% 50%;` (Neon Green), `--radius: 0rem;` (Sharp). * **Forest (Forced Dark):** * Selector: `[data-theme="forest"]` * Variables: `--background: 150 30% 8%;` (Deep Green), `--primary: 142 70% 45%;` (Emerald), `--radius: 0.5rem;`. * **Playful (Adaptive):** * Selector: `[data-theme="playful"]` (Light Base): `--background: 262 20% 97%;` (Lavender), `--primary: 262 80% 60%;` (Purple), `--radius: 1.5rem;` (Round). * Selector: `[data-theme="playful"] .dark` (Dark Override): `--background: 262 20% 10%;` (Deep Purple). * **Vibrant (Adaptive):** * Selector: `[data-theme="vibrant"]` (Light Base): `--background: 0 0% 100%;` (White), `--primary: 330 80% 60%;` (Hot Pink), `--radius: 0.75rem;`. * Selector: `[data-theme="vibrant"] .dark` (Dark Override): `--background: 220 20% 10%;` (Navy Blue), `--primary: 190 90% 50%;` (Cyan). **Requirement 3: The "Brain" Logic (`components/theme-provider.tsx`)** * **Action:** Completely rewrite the `useEffect` hook handling theme changes. * **Logic:** 1. **Sanitize:** `root.removeAttribute("data-theme")`. 2. **Check Base Preference:** Is the system/user preferring Dark mode? 3. **Apply Logic:** * **If Hacker/Forest:** `setAttribute("data-theme", theme)` AND `classList.add("dark")`. (Always Dark). * **If Playful/Vibrant:** `setAttribute("data-theme", theme)`. Then, IF base preference is dark, `classList.add("dark")`, ELSE `classList.remove("dark")`. (Adaptive). * **If Pro/System:** Do NOT set attribute. Just toggle `.dark` class based on preference. **Requirement 4: The UI (`components/dashboard/ThemePicker.tsx`)** * **Action:** Update the options array to match these IDs exactly: `['pro', 'hacker', 'forest', 'playful', 'vibrant', 'system']`. Update the specification to enforce this clean, conflict-free architecture."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standard & System Theme Switching (Priority: P1)

Users should be able to select standard themes that respect their system's light/dark preference.

**Why this priority**: Ensure the default experience works correctly before adding complex themes.

**Independent Test**: Can be tested by selecting "Pro" or "System" and toggling the OS light/dark mode.

**Acceptance Scenarios**:

1. **Given** the user is on the dashboard, **When** they select "Pro" theme, **Then** the UI uses Zinc/Slate colors, 0.5rem radius, and matches the system's light/dark mode.
2. **Given** the user selects "System", **When** they change their OS theme, **Then** the app immediately updates to match without page reload.
3. **Given** "Pro" or "System" is active, **Then** the `data-theme` attribute should NOT be present on the root element.

---

### User Story 2 - Forced Dark Themes (Hacker & Forest) (Priority: P1)

Users who prefer high-contrast or specialized dark aesthetics should be able to force a dark theme regardless of system settings.

**Why this priority**: Specific user personas (e.g., developers, night-mode users) require these themes.

**Independent Test**: Select "Hacker" or "Forest" while the OS is in Light mode.

**Acceptance Scenarios**:

1. **Given** the OS is in Light mode, **When** user selects "Hacker", **Then** the app forces Dark mode, background becomes True Black, primary color becomes Neon Green, and border radius becomes 0rem (sharp).
2. **Given** the OS is in Light mode, **When** user selects "Forest", **Then** the app forces Dark mode, background becomes Deep Green, primary color becomes Emerald, and border radius becomes 0.5rem.
3. **Given** a forced dark theme is active, **Then** the `data-theme` attribute on root is set to "hacker" or "forest".

---

### User Story 3 - Adaptive Themes (Playful & Vibrant) (Priority: P2)

Users who want more personality should see distinct palettes that adapt to light and dark modes.

**Why this priority**: Enhances personalization and visual appeal.

**Independent Test**: Select "Playful" or "Vibrant" and toggle OS light/dark mode.

**Acceptance Scenarios**:

1. **Given** user selects "Playful", **When** in Light mode, **Then** background is Lavender, primary is Purple, radius is 1.5rem (Round).
2. **Given** user selects "Playful", **When** in Dark mode, **Then** background becomes Deep Purple.
3. **Given** user selects "Vibrant", **When** in Light mode, **Then** background is White, primary is Hot Pink, radius is 0.75rem.
4. **Given** user selects "Vibrant", **When** in Dark mode, **Then** background becomes Navy Blue, primary is Cyan.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove all legacy `.theme-*` class definitions from CSS.
- **FR-002**: System MUST implement themes using `[data-theme="name"]` selectors at the bottom of the global CSS file to ensure correct specificity.
- **FR-003**: System MUST support a "Pro" (default) theme using standard Zinc/Slate colors and `0.5rem` radius, defined in `:root` and `.dark` without a data attribute.
- **FR-004**: System MUST support a "Hacker" theme (id: `hacker`) that forces dark mode, uses True Black (`0 0% 0%`) background, Neon Green (`142 70% 50%`) primary, and `0rem` radius.
- **FR-005**: System MUST support a "Forest" theme (id: `forest`) that forces dark mode, uses Deep Green (`150 30% 8%`) background, Emerald (`142 70% 45%`) primary, and `0.5rem` radius.
- **FR-006**: System MUST support a "Playful" theme (id: `playful`) that adapts to light/dark mode:
    - Light: Lavender (`262 20% 97%`) bg, Purple (`262 80% 60%`) primary.
    - Dark: Deep Purple (`262 20% 10%`) bg.
    - Radius: `1.5rem`.
- **FR-007**: System MUST support a "Vibrant" theme (id: `vibrant`) that adapts to light/dark mode:
    - Light: White (`0 0% 100%`) bg, Hot Pink (`330 80% 60%`) primary.
    - Dark: Navy Blue (`220 20% 10%`) bg, Cyan (`190 90% 50%`) primary.
    - Radius: `0.75rem`.
- **FR-008**: Theme logic MUST correctly handle "Forced Dark" vs "Adaptive" behavior:
    - Forced Dark (Hacker/Forest): Apply `data-theme` AND add `.dark` class.
    - Adaptive (Playful/Vibrant): Apply `data-theme`, then add/remove `.dark` based on system preference.
    - Default (Pro/System): Remove `data-theme`, toggle `.dark` based on system preference.
- **FR-009**: The Theme Picker UI MUST display exactly these options: Pro, Hacker, Forest, Playful, Vibrant, System.

### Key Entities

- **Theme**: A configuration set (id, display name, type: adaptive/forced-dark) that determines visual variables.
- **User Preference**: The stored selection of the user (using `localStorage`).

## Clarifications

### Session 2026-01-24

- Q: Where should the theme preference be stored? → A: localStorage

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Switching between any two themes updates the UI in under 100ms.
- **SC-002**: "Hacker" and "Forest" themes render in dark mode 100% of the time, regardless of system settings.
- **SC-003**: The codebase contains ZERO instances of `.theme-hacker`, `.theme-forest`, or `.theme-playful` CSS classes (replaced by data attributes).
- **SC-004**: "Playful" and "Vibrant" themes correctly switch palettes when the system theme changes from Light to Dark.