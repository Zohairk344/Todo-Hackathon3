# Phase 0: Research & Key Decisions

**Feature**: Theme Repair & Expansion
**Branch**: `030-fix-theme-add-forest`

## 1. Technical Context & Unknowns

### Current Implementation
*   **Provider**: `ThemeStyleProvider` in `frontend/lib/theme-style-context.tsx`.
*   **Mechanism**: Uses `data-style` attribute on `<html>` (`pro`, `playful`, `hacker`).
*   **CSS**: `frontend/app/globals.css` uses `:root[data-style="..."]` selectors.
*   **Dark Mode**: Handled via `.dark` class (likely via `next-themes` or manual toggle, currently mixed).

### User Requirement vs. Current State
*   **User Request**: Explicitly asks for `root.classList.remove/add` logic using classes (`theme-midnight`, `theme-forest`).
*   **Conflict**: Current code uses attributes.
*   **Decision**: **Migrate to Class-Based Theming**.
    *   **Rationale**: The user spec explicitly defines class manipulation logic. Using classes allows for cleaner Tailwind integration and standardizes how themes (variants) and modes (light/dark) interact.
    *   **Mapping**:
        *   `data-style="pro"` -> (Default/No Class or `.theme-pro`)
        *   `data-style="playful"` -> `.theme-playful`
        *   `data-style="hacker"` -> `.theme-hacker`
        *   (New) -> `.theme-forest`

## 2. Technology Decisions

### Theme Provider Logic
*   **Refactor**: Modify `theme-style-context.tsx`.
*   **Logic**:
    *   Maintain `style` state.
    *   `useEffect`:
        1.  Remove `theme-playful`, `theme-hacker`, `theme-forest`.
        2.  If `style` is not default (`pro`), add corresponding class.
        3.  Ensure `dark` class is preserved/managed if it's separate (User spec implies themes *are* the modes, but "Hacker" forces dark. We must ensure "Forest" forces dark or works with dark mode).
    *   **Critical**: The spec implies mixing "Light", "Dark" (modes) with "Forest" (variant).
    *   **Refined Approach**:
        *   We will treat "Forest" and "Hacker" as *Themes* that enforce specific color variables, likely appearing "Dark".
        *   We will ensure the `dark` class is applied when these dark themes are active to trigger Tailwind's `dark:` variant if needed, OR simply redefine the variables at the root level for that theme so `.dark` isn't strictly necessary for the colors, but might be for other components.
        *   **Selected Strategy**: The `globals.css` structure shows `:root[data-style="hacker"]` overrides variables. We will replicate this with `.theme-forest`.

### CSS Strategy
*   **File**: `frontend/app/globals.css`
*   **Action**: Convert `[data-style="..."]` selectors to `.theme-...` class selectors.
*   **New Theme**: Define `.theme-forest` with the requested color palette.

## 3. Library & Framework
*   **Frontend**: React (Context API), Tailwind CSS v4 (inferred from `@theme` blocks).
*   **Storage**: `localStorage` (Preserve existing behavior).
