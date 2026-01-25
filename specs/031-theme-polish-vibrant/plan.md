# Implementation Plan - Phase 4.4: Theme Perfection & Premium Polish

**Feature**: Theme Polish & Vibrant Addition
**Branch**: `031-theme-polish-vibrant`

## Technical Context

### 1. Theme Isolation Engine (`frontend/app/globals.css`)
*   **Problem**: Themes "bleed" into each other because they rely on shared `:root` variables.
*   **Strategy**: **Strict Isolation**. Each theme class (`.theme-hacker`, `.theme-playful`) will explicitly redefine *all* critical variables (`--radius`, `--background`, `--primary`, etc.).
*   **New Theme**: "Vibrant" will be added with distinct Light (Electric Blue) and Dark (Deep Purple) palettes.

### 2. Premium Animations (`frontend/app/globals.css`)
*   **Goal**: Fluid transitions and "alive" feel.
*   **Actions**:
    *   **Global Transition**: Apply `transition-colors` and `border-color` to `*` (Universal) for 300ms.
    *   **Entry Animation**: Add `@keyframes fade-in-up` and utility class.
    *   **Micro-interactions**: Use Tailwind `hover:scale` on interactive elements.

### 3. Metadata Fix (`frontend/app/layout.tsx`)
*   **Problem**: Next.js 14 warns about `metadata.themeColor`.
*   **Fix**: Migrate to `export const viewport`.

### 4. Component Updates (`frontend/components/theme-selector.tsx` & Context)
*   **Goal**: Enable "Vibrant" theme.
*   **Action**: Update Type definitions and UI array.

## Constitution Check

### I. Technology Stack
*   Frontend: Next.js 14, Tailwind CSS (Confirmed).
*   Architecture: React Context for state (Confirmed).

### II. Architecture Rules
*   **Atomic Changes**: Visual changes only, safe for backend.
*   **Verification**: Visual inspection required.

## Phase 1: Design & Contracts

### 1. Data Model
*   Updates `ThemeStyle` enum in `data-model.md`.

### 2. API Contracts
*   N/A (Frontend Only).

## Phase 2: Implementation Steps

### Step 1: Type & Context Update
*   **File**: `frontend/lib/theme-style-context.tsx`
*   **Task**:
    *   Update `ThemeStyle` type to include "vibrant".
    *   Update `useEffect` logic to handle "vibrant" class application.
    *   Update mobile meta tag logic for "vibrant" color.

### Step 2: CSS Theme Isolation
*   **File**: `frontend/app/globals.css`
*   **Task**:
    *   **Refactor**: Rewrite `.theme-hacker`, `.theme-playful`, `.theme-forest` to strictly define `--radius` and colors.
    *   **Add**: Define `.theme-vibrant` (Light) and `.dark .theme-vibrant` (Dark).
    *   **Add**: Global transition rule (`* { transition... }`).
    *   **Add**: `@keyframes fade-in-up` and `.animate-enter` utility.

### Step 3: Layout Metadata Fix
*   **File**: `frontend/app/layout.tsx`
*   **Task**:
    *   Remove `themeColor` from `metadata`.
    *   Export `viewport` object.

### Step 4: UI Updates
*   **File**: `frontend/components/theme-selector.tsx`
*   **Task**: Add "Vibrant" to the themes list with correct preview colors.

### Step 5: Animation Application
*   **Files**: `frontend/app/dashboard/page.tsx`, `frontend/components/task-list.tsx` (or similar).
*   **Task**: Apply `animate-enter` to main containers. Apply `hover:scale` to cards/buttons.

## Verification Plan

### Manual Verification
1.  **Visual Regression**:
    *   Switch to Hacker: Verify sharp edges (`radius: 0`).
    *   Switch to Playful: Verify round edges (`radius: 1.5rem`).
2.  **Vibrant Theme**:
    *   Select "Vibrant".
    *   Toggle Light/Dark mode (via System or dev tools) -> Check Blue vs Purple.
3.  **Animations**:
    *   Reload page -> Check fade-in-up.
    *   Switch Theme -> Check smooth color transition.
4.  **Console**: Ensure no `themeColor` warnings.