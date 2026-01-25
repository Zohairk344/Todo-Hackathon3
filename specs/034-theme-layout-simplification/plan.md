# Implementation Plan - Phase 5: Simplification & Layout Fixes

**Feature**: Theme Simplification & Layout Fixes  
**Branch**: `034-theme-layout-simplification`  
**Status**: **Phase 2: Implementation**  

## Technical Context

This phase focuses on simplifying the application's theming system and fixing a critical layout issue with the chat widget. We are moving away from a complex, multi-theme engine (Hacker, Forest, etc.) to a standard, reliable Light/Dark mode using `next-themes` and Shadcn UI defaults. Additionally, the chat widget is being moved out of the grid layout to a fixed position.

### Dependencies

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Shadcn UI (`next-themes`, `lucide-react`).
- **Backend**: No backend changes required (CSS/Layout only).
- **Libraries**: `next-themes` (already installed).

### Unknowns & Risks

- **Risk**: Legacy themes (e.g., "Forest") stored in user's `localStorage` might cause a flash of unstyled content or broken styles if not handled gracefully.
  - *Mitigation*: Implement a check in `ThemeProvider` or `layout.tsx` to detect invalid themes and force-reset to "system" or "light".
- **Risk**: Moving `<ChatWidget />` to `DashboardLayout` might decouple it from context providers if they were strictly inside `page.tsx`.
  - *Check*: Ensure `DashboardLayout` is wrapped in necessary providers (likely `QueryClientProvider` or `SessionProvider`).

## Constitution Check

| Rule ID | Rule Description | Compliance Check |
| :--- | :--- | :--- |
| **I.1** | **Frontend Stack**: Next.js 14+, Tailwind, Lucide React. | **COMPLIANT**: Using standard Next.js layouts and Tailwind utility classes. |
| **I.2-5**| **Backend/DB/Auth/Deploy**: Python, Neon, Better-Auth, HF Spaces. | **N/A**: Frontend-only changes. |
| **IV** | **Atomic Changes**: Do not break existing features. | **COMPLIANT**: Simplifying logic reduces breakage risk. |
| **V** | **Verification**: Syntax integrity & Logic validation. | **COMPLIANT**: Will verify build and theme switching via browser tests (if available) or manual verification steps. |

## Gates

- [x] **Research**: `research.md` created & all unknowns resolved?
- [x] **Design**: `data-model.md` and `contracts/` created? (N/A for this feature)
- [x] **Plan**: `plan.md` updated with technical details?

---

## Phase 0: Research

### Goal
Resolve the legacy theme handling strategy and confirm the optimal `ChatWidget` placement context.

### Tasks
1. **Analyze Theme Storage**: Check how `next-themes` stores the theme key in `localStorage` (usually `theme`).
2. **Determine Reset Logic**: Best place to inject the "if theme not in [light, dark, system] -> reset" logic.
   - *Hypothesis*: A `useEffect` in the root layout or a script blocking render? A simple `useEffect` in `ThemeProvider` is safest for Next.js hydration.
3. **Verify Context Hierarchy**: Check `app/dashboard/layout.tsx` to see where providers are instantiated. Ensure moving `ChatWidget` up one level doesn't break its access to `useAuth` or similar hooks.

---

## Phase 1: Design (Skipped - No Data/API Changes)

*Since this is a purely frontend styling and layout refactor, no new database models or API contracts are needed.*

---

## Phase 2: Implementation Steps

### Step 1: CSS Clean Slate
- **File**: `app/globals.css`
- **Action**: Delete all `[data-theme]` blocks. Ensure `:root` and `.dark` have the standard Shadcn variables.

### Step 2: Component Cleanup
- **File**: `components/theme-provider.tsx`
- **Action**: Simplify to a standard `NextThemesProvider` wrapper. Add the legacy theme reset logic here.
- **File**: `components/dashboard/ThemePicker.tsx`
- **Action**: Delete or deprecate.
- **File**: `components/dashboard/Header.tsx`
- **Action**: Verify `ModeToggle` presence.

### Step 3: Layout Fix
- **File**: `app/dashboard/layout.tsx`
- **Action**: Import `ChatWidget`. Render it outside the main grid container.
- **Style**: Wrapper div with `fixed bottom-6 left-6 z-50 hidden md:block` (or JS-based media query for exact 768px requirement).
  - *Clarification Req*: Spec says "Hide on mobile (< 768px)". Tailwind `hidden md:block` does exactly this (hidden by default, block on medium+ screens).

### Step 4: Verification
- **Action**: Build project (`npm run build`).
- **Action**: Test theme toggle (Light <-> Dark).
- **Action**: Test mobile view (ChatWidget hidden).