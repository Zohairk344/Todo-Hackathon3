# Feature Specification: Theme Perfection & Premium Polish

**Feature Branch**: `031-theme-polish-vibrant`
**Created**: 2026-01-23
**Status**: Draft
**Input**: User description: "Update speckit.md to define Phase 4.4: Theme Perfection & Premium Polish..."

## Clarifications
### Session 2026-01-23
- Q: Vibrant Theme Dark Mode Strategy → A: Separate Block (Define `.dark .theme-vibrant` separately to override light variables)
- Q: Global Transition Scope → A: Universal (`* { transition... }` - Heaviest performance hit but smoothest result)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Visual Regressions (Priority: P1)

As a user, when I switch between themes (Playful, Hacker, Forest, Pro), I expect distinct visual styles (shapes, colors, fonts) for each, so that the theme actually feels different.

**Why this priority**: Currently, themes look broken or identical due to CSS variable leaking, degrading the user experience.

**Independent Test**: Select "Hacker" -> Verify sharp corners (`border-radius: 0`) and neon green. Select "Playful" -> Verify rounded corners (`border-radius: 1.5rem`) and pastel colors.

**Acceptance Scenarios**:

1. **Given** the "Hacker" theme is active, **When** I inspect a button, **Then** the `border-radius` must be `0` (or `0rem`) and the font should ideally be distinct (monospace).
2. **Given** the "Playful" theme is active, **When** I inspect a card, **Then** the `border-radius` must be `1.5rem` or greater, and colors should be purple/pink based.
3. **Given** the "Forest" theme is active, **When** I inspect the background, **Then** it must be Deep Green (`hsl(150 30% 8%)`), distinct from Hacker's black.

---

### User Story 2 - Add "Vibrant" Theme (Priority: P2)

As a user, I want a high-saturation "Vibrant" theme option, so that I can have an energetic, colorful interface.

**Why this priority**: requested as a new feature to expand customization.

**Independent Test**: Select "Vibrant" in the picker and verify the Electric Blue/Hot Pink palette.

**Acceptance Scenarios**:

1. **Given** the theme picker is open, **When** I scroll, **Then** "Vibrant" is a selectable option.
2. **Given** "Vibrant" is active in Light Mode, **When** I view the dashboard, **Then** the primary color is Electric Blue (`hsl(190 90% 50%)`) or Hot Pink.
3. **Given** "Vibrant" is active in Dark Mode, **When** I view the dashboard, **Then** the background is Deep Purple (`hsl(270 50% 10%)`).

---

### User Story 3 - Premium Animations & Polish (Priority: P3)

As a user, I want the interface to feel smooth and responsive with animations, so that the application feels premium and modern.

**Why this priority**: The site currently feels "static".

**Independent Test**: Refresh the dashboard and observe elements fading in. Hover over a card and observe it scaling up.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the grid appears, **Then** items should fade in and slide up (staggered or together).
2. **Given** any card or button, **When** I hover over it, **Then** it should scale up slightly (`scale-[1.02]`).
3. **Given** I switch themes, **When** the colors change, **Then** the transition should be smooth (300ms), not instant.

---

### User Story 4 - Fix Technical Debt (Priority: P4)

As a developer, I want to remove console warnings about deprecated metadata, so that the log is clean.

**Why this priority**: Maintenance and best practices.

**Independent Test**: Check browser console during build or runtime.

**Acceptance Scenarios**:

1. **Given** the app is running, **When** I check the server/browser console, **Then** there should be no warning about `metadata.themeColor`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST strictly isolate theme variables in `globals.css` so that `.theme-hacker`, `.theme-playful`, etc. override `radius` and all core colors explicitly.
    - Hacker: `radius: 0`, BG: Black, Primary: Neon Green.
    - Playful: `radius: 1.5rem`, BG: Light/Dark Purple, Primary: Purple/Pink.
    - Forest: BG: Deep Green, Primary: Emerald.
    - Pro: `radius: 0.5rem` (Default).
- **FR-002**: System MUST define `.theme-vibrant` with:
    - Radius: `0.75rem`.
    - Light Primary: Electric Blue (`190 90% 50%`).
    - Dark BG: Deep Purple (`270 50% 10%`).
- **FR-003**: System MUST export a `viewport` object in `layout.tsx` and remove `themeColor` from `metadata` to fix Next.js 14+ deprecation warning.
- **FR-004**: System MUST apply a global transition to `background-color`, `border-color`, and `color` (300ms) on the `body` selector.
- **FR-005**: System MUST apply entry animations (`animate-in`, `fade-in`, `slide-in-from-bottom`) to main dashboard containers (Grid, Chat Widget).
- **FR-006**: System MUST apply micro-interactions (`hover:scale-105` or `1.02`, `active:scale-95`) to interactive cards and buttons via Tailwind utility classes.
- **FR-007**: Theme Picker MUST display "Vibrant" and render accurate preview colors for all themes (Hacker=Black/Green, Playful=Purple).
- **FR-008**: System MUST override Vibrant theme variables for dark mode using a separate `.dark .theme-vibrant` CSS block.
- **FR-009**: System MUST apply the global transition rule universally (`*` selector) to ensure all nested elements animate smoothly.

### Key Entities

- **Viewport Configuration**: Next.js specific object for meta tags.
- **Theme Definition**: Enhanced CSS variable set including `radius`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visual inspection confirms distinct shapes (radius) and colors for all 5 themes (Pro, Playful, Hacker, Forest, Vibrant).
- **SC-002**: Browser console shows ZERO warnings related to `themeColor`.
- **SC-003**: Dashboard load triggers visible fade-in animation (verified visually).
- **SC-004**: Hovering over task cards produces a visible scale transform.
