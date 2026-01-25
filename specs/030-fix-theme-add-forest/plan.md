# Implementation Plan - Phase 4.3: Theme Repair & Expansion

**Feature**: Fix Theme Application & Add Forest Theme
**Branch**: `030-fix-theme-add-forest`

## Technical Context

### 1. Fix Theme Application Logic (`frontend/lib/theme-style-context.tsx`)
*   **Problem**: Current implementation uses `document.documentElement.setAttribute("data-style", ...)` but user requirements and standard Tailwind patterns favor class-based switching (`classList.add(...)`).
*   **Strategy**: **Migration**. We will refactor the provider to toggle CSS classes instead of data attributes.
*   **Logic**:
    *   Maintain `style` state (`ThemeStyle`).
    *   On change:
        1.  Remove all theme classes: `.theme-playful`, `.theme-hacker`, `.theme-forest`.
        2.  Add the active theme class (if not default).
        3.  Update `localStorage`.

### 2. Define "Forest" Theme (`frontend/app/globals.css`)
*   **Goal**: Add the new requested dark theme.
*   **Action**:
    *   Convert existing `[data-style="..."]` blocks to `.theme-...` classes.
    *   Add `.theme-forest` block:
        *   `--background`: `hsl(150 30% 10%)` (Dark Green/Gray)
        *   `--card`: `hsl(150 25% 12%)`
        *   `--primary`: `hsl(142 76% 36%)` (Emerald)
        *   `--primary-foreground`: `white`
        *   `--muted`: `hsl(150 10% 20%)`

### 3. Update Theme Picker (`frontend/components/theme-selector.tsx`)
*   **Goal**: Expose the new theme to the user.
*   **Action**:
    *   Update `themes` array to include "Forest".
    *   Metadata:
        *   Name: "Forest"
        *   Description: "Deep green, nature-inspired."
        *   Preview Class: `bg-[#112211] border-emerald-600 text-emerald-400` (Approximate).

## Constitution Check

### I. Technology Stack
*   Frontend: Next.js 14+, Tailwind CSS (Confirmed).
*   State: React Context (Confirmed).

### II. Architecture Rules
*   **Atomic Changes**: The theme refactor is contained within the context and CSS; unlikely to break backend.
*   **Verification**: "Sanity checks" are manual UI verification for this frontend task.

## Phase 1: Design & Contracts

### 1. Data Model
*   See `data-model.md`.
*   Updates `ThemeStyle` enum.

### 2. API Contracts
*   N/A (Frontend Only).

## Phase 2: Implementation Steps

### Step 1: CSS Refactor & Expansion
*   **File**: `frontend/app/globals.css`
*   **Task**:
    1.  Rename selectors:
        *   `:root[data-style="playful"]` -> `.theme-playful`
        *   `:root[data-style="hacker"]` -> `.theme-hacker`
    2.  Add `.theme-forest` with spec colors.
    3.  Verify standard `.dark` class behavior works with these themes.

### Step 2: Theme Provider Logic Update
*   **File**: `frontend/lib/theme-style-context.tsx`
*   **Task**:
    *   Update `useEffect` to manage `classList` instead of `setAttribute`.
    *   Ensure "default" theme ("pro") cleans up other classes.

### Step 3: UI Update
*   **File**: `frontend/components/theme-selector.tsx`
*   **Task**: Add "Forest" option to the list.

### Step 4: Verification
*   **Task**:
    *   Click each theme.
    *   Verify `<html>` has correct class.
    *   Verify colors change visually.
    *   Reload page -> Verify persistence.

## Verification Plan

### Automated Tests
*   N/A (Visual UI changes are hard to unit test without E2E; manual verification prioritized for this phase).

### Manual Verification
1.  **Light Mode Check**: Select "Pro", "Playful". Check backgrounds are light.
2.  **Dark Mode Check**: Select "Hacker", "Forest". Check backgrounds are dark.
3.  **Persistence**: Refresh page after selecting "Forest". Ensure it stays green.