# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Transform the Dashboard UI into a premium "Dark Mode" aesthetic using Glassmorphism, Neon gradients, and smooth animations powered by `framer-motion`. The overhaul focuses on visual polish (translucency, glows, staggered transitions) and UI cleanup (removing redundant navigation buttons).

## Technical Context

**Language/Version**: TypeScript 5+, React 19 (Next.js 16 App Router)
**Primary Dependencies**: Next.js, Tailwind CSS 4, Lucide React, `framer-motion` (New)
**Storage**: N/A (UI-only change)
**Testing**: ESLint, Manual Visual Verification, `framer-motion` lifecycle checks
**Target Platform**: Web (Desktop-first, Responsive)
**Project Type**: Web application
**Performance Goals**: 60fps animations, <200ms interaction latency for hover effects
**Constraints**: Support for "Reduced Motion" preferences, graceful degradation for `backdrop-blur`
**Scale/Scope**: Dashboard view and Task components overhaul

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (Next.js 14+, Tailwind, Lucide).
- [x] **Schema Rules**: N/A (No DB changes).
- [x] **Verification Protocol**: Visual sanity checks and syntax validation planned.

## Project Structure

### Documentation (this feature)

```text
specs/049-dashboard-ui-overhaul/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
├── checklists/
│   └── requirements.md  # Spec validation
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # UI Cleanup (Header)
│   │   └── layout.tsx        # Global Gradient Background
│   └── globals.css           # Global CSS variables & Dark Mode
└── components/
    └── dashboard/
        └── task-view.tsx     # Framer-motion & Glassmorphism Overhaul
```

**Structure Decision**: Web application structure (`frontend/`) as per existing repository layout.

## Implementation Steps

### Step 1: Dependency Installation
- Install `framer-motion` in the `frontend` directory.

### Step 2: Global Layout & Styles
- Update `frontend/app/dashboard/layout.tsx` to include the radial gradient background.
- Update `frontend/app/globals.css` with glassmorphism utility variables if needed.

### Step 3: Header Cleanup
- Modify `frontend/app/dashboard/page.tsx` to remove the "Add Category" button from the top-right action area.

### Step 4: Task View Overhaul
- Integrate `framer-motion` into `frontend/components/dashboard/task-view.tsx`.
- Wrap the task list in `AnimatePresence`.
- Convert task cards to `motion.div` with staggered entry variants.
- Apply glassmorphism and neon priority glows to cards and badges.

## Verification Strategy

- **Visual Fidelity**: Verify the radial gradient background and glassmorphic card transparency.
- **Animation Performance**: Ensure staggered animations run at 60fps and re-trigger on list updates.
- **Hover Responsiveness**: Confirm smooth 200ms scale/glow transition on task card hover.
- **Header Cleanliness**: Confirm the "Add Category" button is no longer present in the dashboard header.
- **Accessibility**: Verify contrast ratios for neon elements against the dark background.
