# Research: Total Theme Reset (Phase 6)

## Decision 1: Standard Palette Choice
- **Decision**: Use the **Zinc** palette from Shadcn UI as the default baseline.
- **Rationale**: Zinc provides a neutral, modern, and high-contrast baseline that works well for both Light and Dark modes. It aligns with the user's request for a "bulletproof" and "standard" implementation.
- **Values**:
  - Light Mode (`:root`): Background `0 0% 100%`, Foreground `240 10% 3.9%`.
  - Dark Mode (`.dark`): Background `240 10% 3.9%`, Foreground `0 0% 98%`.

## Decision 2: CSS Engine Restoration
- **Decision**: Overwrite `app/globals.css` with standard `@tailwind` directives and layer base overrides.
- **Rationale**: Current `globals.css` may contain remnants of custom themes (Forest, Vibrant) that interfere with standard colors. A total overwrite ensures a clean slate.
- **Directives**:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`

## Decision 3: Dependency Stabilization
- **Decision**: Explicitly verify and install `tailwindcss-animate`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`.
- **Rationale**: Missing or mismatched versions of these core Shadcn dependencies are a common cause of build errors and runtime theme issues.

## Decision 4: UI Cleanup Strategy
- **Decision**: Extract Header to a separate component `components/dashboard/Header.tsx` and remove `ThemePicker` references.
- **Rationale**: Improves modularity and strictly enforces the requirement that the `ModeToggle` is the only theme control.
