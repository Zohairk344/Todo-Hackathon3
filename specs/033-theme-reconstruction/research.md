# Research: Theme Architecture

**Feature**: Total Theme Reconstruction

## Decisions

### 1. Data Attributes vs. Classes

**Decision**: Use `data-theme="name"` attributes instead of `.theme-name` classes.

**Rationale**:
- **Specificity**: Attributes (especially when placed at the bottom of CSS) provide a clear, uniform specificity level that overrides base styles without needing `!important` or complex chaining.
- **Isolation**: Prevents accidental "leakage" where a nested element might inherit a class-based theme unexpectedly.
- **Tooling**: Easier to inspect in DevTools (one attribute on `<html>` or `<body>` vs classes buried in `class="..."`).

**Alternatives Considered**:
- **Class-based (`.theme-dark`)**: The previous approach. Rejected due to "leaking" and specificity conflicts described in the context.
- **CSS-in-JS**: Rejected to stick with the project's Tailwind + CSS Variables convention.

### 2. Forced Dark Mode Implementation

**Decision**: "Hacker" and "Forest" themes will programmatically force the `.dark` class in addition to setting the `data-theme` attribute.

**Rationale**:
- Tailwind's `darkMode: 'class'` strategy relies on the `.dark` class being present on a parent. To ensure Tailwind utilities (like `dark:text-white`) work correctly within these forced-dark themes, the class must be present regardless of the user's system preference.

**Alternatives Considered**:
- **CSS-only override**: Trying to override `dark:` variants in CSS only is fragile and fights against Tailwind's compiler.

### 3. Persistence

**Decision**: `localStorage` (Key: `theme`).

**Rationale**:
- Simple, standard, works client-side.
- Matches user clarification.
