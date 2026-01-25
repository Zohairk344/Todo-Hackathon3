# Phase 0: Research & Key Decisions

**Feature**: Theme Perfection & Premium Polish
**Branch**: `031-theme-polish-vibrant`

## 1. Technical Context & Unknowns

### Visual Regressions
*   **Problem**: "Playful" and "Forest" themes inherit variables incorrectly or lack specific overrides (e.g., radius), causing them to look like "Pro" or "Hacker".
*   **Fix Strategy**: **Strict Variable Isolation**.
    *   Each theme class (`.theme-playful`, `.theme-hacker`, `.theme-forest`, `.theme-vibrant`) must explicitly define its own `--radius`, `--background`, `--primary`, etc.
    *   We will NOT rely on fallback to `:root` for these core variables to ensure distinctiveness.

### Animation Performance vs. Aesthetics
*   **Goal**: "Premium" feel with smooth theme transitions.
*   **Decision**: **Universal Transition** (`* { transition... }`).
    *   **Rationale**: While heavy, modern browsers handle CSS opacity/color transitions efficiently. Limiting to `body` often misses borders, nested cards, or inputs, breaking the immersion. We accept the slight performance hit for the UX gain.
    *   **Optimization**: We will target specific properties (`background-color`, `border-color`, `color`) rather than `all` to mitigate layout thrashing.

### Dark Mode & Vibrant Theme
*   **Challenge**: "Vibrant" has two distinct palettes (Light: Electric Blue, Dark: Deep Purple).
*   **Strategy**: **Separate CSS Blocks**.
    *   Instead of complex media queries or `oklch` magic, we will define:
        1.  `.theme-vibrant` (Light defaults)
        2.  `.dark .theme-vibrant` (Dark overrides)
    *   This aligns with Tailwind's class-based dark mode (`class` strategy).

## 2. Technology Decisions

### Next.js Metadata
*   **Deprecation**: `metadata.themeColor` is deprecated in Next.js 14.
*   **Solution**: Move to `export const viewport`. This is a standard migration.

### CSS Architecture
*   **File**: `frontend/app/globals.css`.
*   **Structure**:
    *   `:root` (Base variables)
    *   `.dark` (Dark mode overrides)
    *   Theme Classes (`.theme-hacker`, etc.)
    *   Utilities (`.animate-fade-in-up`)

## 3. Library & Framework
*   **Frontend**: Next.js 14 (App Router), Tailwind CSS.
*   **No new libraries**: Animations will be pure CSS/Tailwind utility classes.
