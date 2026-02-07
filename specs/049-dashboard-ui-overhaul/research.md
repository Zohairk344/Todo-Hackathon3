# Research: Dashboard UI Overhaul

## Decision 1: Animation Engine (`framer-motion`)
- **Decision**: Install and use `framer-motion` version 11+ (compatible with React 19).
- **Rationale**: Provides superior control over staggered entry animations and exit animations via `AnimatePresence`. Native CSS animations are difficult to stagger dynamically based on list length.
- **Alternatives considered**: `react-spring` (too complex for this scope), native CSS transitions (limited exit animation support).

## Decision 2: Glassmorphism Implementation
- **Decision**: Use Tailwind 4 utilities: `bg-white/5 backdrop-blur-md border border-white/10`.
- **Rationale**: Standard glassmorphism pattern that provides depth and translucency. `white/5` (5% opacity) is the sweet spot for dark themes.
- **Alternatives considered**: Opaque card backgrounds (rejected as "bland").

## Decision 3: Neon Glows & Priority
- **Decision**: Dynamic shadow classes using arbitrary values or utility composition: `shadow-[0_0_15px_rgba(var(--glow-color),0.2)]`.
- **Rationale**: High-budget aesthetic requires soft glows. Using priority-specific colors (Red for high, Blue for low) enhances functional clarity.
- **Integration**: Map priority strings to tailwind shadow color variables.

## Decision 4: Global Dark Gradient
- **Decision**: Apply `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black` to the dashboard layout.
- **Rationale**: Radial gradients create a "spotlight" effect on the header/content, increasing the "premium" feel compared to linear gradients.
