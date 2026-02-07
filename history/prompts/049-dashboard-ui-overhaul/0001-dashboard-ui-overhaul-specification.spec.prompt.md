---
id: 0001
title: Dashboard UI Overhaul Specification
stage: spec
date: 2026-02-07
surface: agent
model: gemini-2.0-flash
feature: 049-dashboard-ui-overhaul
branch: 049-dashboard-ui-overhaul
user: user
command: /sp.specify
labels: ["ui", "overhaul", "specification"]
links:
  spec: specs/049-dashboard-ui-overhaul/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/049-dashboard-ui-overhaul/spec.md
  - specs/049-dashboard-ui-overhaul/checklists/requirements.md
tests:
  - N/A
---

## Prompt

**The Mission:** Overhaul the Dashboard UI to match a "High-Budget, Dark Mode" aesthetic. We will implement Glassmorphism effects, Neon gradients, and smooth animations to make the site feel "lively" and premium. We will also remove the redundant "Add Category" button. **The Context:** * **Current State:** Functional but "bland" and "basic." * **Target State:** * **Background:** Deep dark blue/black gradient. * **Cards:** Glassmorphic (translucent dark with subtle borders). * **Buttons:** Gradient backgrounds (Pink/Orange/Blue). * **Animations:** Tasks should slide in, and cards should scale slightly on hover. * **Cleanup:** The "Add Category" button next to "Add Task" must be removed (since we moved it to the modal). **Key Technical Requirements:** 1. **New Dependency:** Install `framer-motion` for complex animations. * `npm install framer-motion` 2. **Layout Cleanup (`frontend/app/dashboard/page.tsx`):** * **Remove:** The "Add Category" button from the header area. * **Styling:** Apply a global background gradient to the page container (e.g., `bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800`). 3. **UI Redesign (`frontend/components/dashboard/task-view.tsx`):** * **Animation:** Wrap the task list in `<AnimatePresence>` and use `<motion.div>` for individual task cards. * *Effect:* Staggered fade-in on load. * *Hover:* Slight scale up (`scale: 1.02`) and border glow increase. * **Card Styling:** * Background: `bg-white/5` (5% opacity white) with `backdrop-blur-md`. * Border: `border-white/10`. * Shadow: Soft colored shadows based on priority (e.g., Red glow for High priority). * **Badges:** Switch from solid standard colors to "Neon" styles (e.g., `bg-red-500/20 text-red-400 border-red-500/50`). 4. **Search Bar Styling (`frontend/components/dashboard/task-view.tsx`):** * Make the input field "Glassy" (`bg-white/5`) with a glowing border when focused. **Success Criteria:** * The "Add Category" button is gone from the main dashboard. * The site feels "Dark & Glowing" rather than "White & Gray." * Tasks animate in smoothly when the page loads or a new task is added. * Hovering over a task feels responsive and tactile.

## Response snapshot

I have created the feature branch `049-dashboard-ui-overhaul` and drafted the functional specification. The specification translates the technical requests (animations, glassmorphism, removal of redundant buttons) into user-facing value and measurable success criteria. I also validated the specification against a quality checklist.

## Outcome

- ✅ Impact: High - Defines the visual direction and premium feel for the dashboard.
- 🧪 Tests: Validated spec against quality checklist.
- 📁 Files: Created `spec.md` and `checklists/requirements.md` in `specs/049-dashboard-ui-overhaul/`.
- 🔁 Next prompts: `/sp.plan` to build the technical implementation plan.
- 🧠 Reflection: Separated technical implementation details (framer-motion, specific tailwind classes) from the functional requirements while preserving the user's intent.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.