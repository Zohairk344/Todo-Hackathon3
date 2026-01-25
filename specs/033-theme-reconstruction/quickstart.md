# Quickstart: Testing the New Theme Engine

**Feature**: Total Theme Reconstruction

## Prerequisites

- Application running: `npm run dev`
- Browser DevTools open.

## Verification Steps

### 1. Verify Clean Slate

1.  Open `app/globals.css`.
2.  Ensure NO `.theme-*` classes exist.
3.  Ensure `[data-theme="..."]` blocks exist at the bottom.

### 2. Test "Hacker" (Forced Dark)

1.  Set OS/System to **Light Mode**.
2.  Open App Dashboard -> Theme Picker.
3.  Select **Hacker**.
4.  **Check**:
    *   Background is True Black (`#000000`).
    *   Text is Neon Green.
    *   DevTools Elements: `<html>` (or body) has `data-theme="hacker"` AND class `dark`.

### 3. Test "Playful" (Adaptive)

1.  Set OS/System to **Light Mode**.
2.  Select **Playful**.
3.  **Check**: Background is Lavender (`#F3F0FF` approx). Radius is Round.
4.  **Action**: Switch OS to **Dark Mode**.
5.  **Check**: Background becomes Deep Purple. Radius stays Round.

### 4. Test "Pro" (Default)

1.  Select **Pro**.
2.  **Check**: `data-theme` attribute is **REMOVED** from `<html>`.
3.  UI follows system preference using standard Zinc colors.
