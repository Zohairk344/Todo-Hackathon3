# Research: Total Theme Reconstruction

## Decision: CSS Data Attribute Architecture

### Choice: Root Data Attribute Selector
**Decision**: Use `[data-theme="name"]` selectors applied directly to the `html` element.
**Rationale**: This allows for flat, high-priority variable overrides. Placing these at the bottom of `globals.css` ensures they are parsed last and have sufficient specificity to override standard Tailwind `base` styles without needing `!important`.
**Alternatives considered**: 
- **Class-based (`.theme-hacker`)**: Rejected due to existing specificity leaks and conflicts with nested `.dark` classes.
- **CSS Variables with JS injection**: Rejected as it separates styling from the stylesheet, making maintenance harder.

## Decision: "Forced Dark" Logic Implementation

### Choice: Custom Logic in `ThemeProvider`
**Decision**: Intercept the theme change in `useEffect` and manually toggle the `dark` class for "Hacker" and "Forest" themes.
**Rationale**: `next-themes` primarily manages the `class` or `data-theme` on the root. To support a hybrid model where some themes *force* dark mode (adding `.dark` even when system preference is light), we need a custom `useEffect` that synchronizes both the `data-theme` attribute and the `dark` class list.
**Alternatives considered**:
- **Pure CSS forced dark**: Possible by defining `[data-theme="hacker"]` to always use dark variables, but might conflict with components that explicitly check for the `.dark` class (e.g., Lucide icons or specific Tailwind `dark:` utilities).

## Decision: Persistence & Hydration

### Choice: Local Storage with Next.js Client-Side Sync
**Decision**: Use `localStorage` to persist the theme key. 
**Rationale**: Standard practice for Next.js web apps. `next-themes` handles the hydration mismatch by suppressing the attribute until client-side execution, preventing the "flash" while ensuring the correct theme is applied.
**Alternatives considered**:
- **Cookies**: Rejected to keep the server requests stateless and reduce overhead.
