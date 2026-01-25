# Phase 0: Research & Design

**Feature**: Theme Simplification and Layout Fixes
**Branch**: `036-theme-layout-fixes`

## 1. Technical Strategy

### Theme Simplification
*   **Decision**: Revert to standard `next-themes` implementation with Shadcn UI variables.
*   **Rationale**: The current custom theme system adds unnecessary complexity and potential hydration issues. Shadcn's default variables provide a robust, accessible foundation for Light/Dark modes.
*   **Action**:
    *   Clean `app/globals.css` of all `[data-theme]` blocks.
    *   Simplify `components/theme-provider.tsx`.
    *   Remove `components/dashboard/ThemePicker.tsx`.

### Chat Widget Positioning
*   **Decision**: Refactor `ChatWidget.tsx` to remove internal `fixed` positioning and allow the parent to control placement, or update internal positioning to match requirements.
*   **Rationale**: `ChatWidget` currently has hardcoded `fixed bottom-6 right-6` styles. This overrides any wrapper positioning in `DashboardLayout`, causing the confusion. The user wants it on the **left**.
*   **Action**:
    *   Update `ChatWidget` to use `bottom-6 left-6` (or better, accept a class name).
    *   Ensure `DashboardLayout` handles the positioning context correctly.
    *   Clean up the double-wrapping of `fixed` containers.

## 2. Alternatives Considered

*   **Passing props to ChatWidget**: We could pass `position="left"` prop.
    *   *Selected Approach*: Since the requirement is specific (Bottom Left), we will simply change the default styles to match the requirement or ensure the component respects the container if we remove `fixed`. However, keeping `fixed` inside the widget is common for overlays. We will update the hardcoded styles to `left-6`.
*   **Keeping ThemePicker**: We could hide it but keep code.
    *   *Selected Approach*: Delete/Disable as requested to reduce technical debt.

## 3. Unknowns Resolved
*   **Current Layout**: Verified `DashboardLayout` already attempts to position it, but `ChatWidget` overrides it.
*   **File Locations**: Confirmed all relevant file paths.
