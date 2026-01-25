# Implementation Plan - Phase 5: Total Theme Reconstruction

**Feature**: Total Theme Reconstruction
**Status**: Planned
**Branch**: 033-theme-reconstruction

## Technical Context

**Language/Framework**: TypeScript, Next.js (App Router), Tailwind CSS
**Key Libraries**: `next-themes` (implied or custom provider), Tailwind
**Current State**: Patch-work theme implementation with specificity issues.
**Target State**: Clean, `data-theme` driven architecture with strict separation of concerns.

## Constitution Check

- [x] **Simple**: Replacing complex class overrides with a single attribute source of truth.
- [x] **Maintainable**: Centralized theme definitions in CSS variables.
- [x] **Safe**: "Clean Slate" ensures no legacy styles leak.

## Strategy: The Clean Slate Protocol

### Phase 1: CSS Foundation (The Purge & Rebuild)

**Goal**: Establish a clean CSS baseline with `data-theme` architecture.

1.  **Purge**: Remove all `.theme-*` classes from `app/globals.css`.
2.  **Base**: Ensure standard Tailwind directives remain.
3.  **Rebuild**: Implement new theme blocks using `[data-theme="ID"]` selectors at the end of the file.
    *   **Hacker**: Forced Dark variables.
    *   **Forest**: Forced Dark variables.
    *   **Playful**: Adaptive variables.
    *   **Vibrant**: Adaptive variables.

### Phase 2: Logic Core (The "Brain")

**Goal**: Rewrite `components/theme-provider.tsx` to handle forced vs. adaptive logic.

1.  **Sanitize**: Logic to clear attributes on change.
2.  **Force**: If Hacker/Forest, force `.dark` class + attribute.
3.  **Adapt**: If Playful/Vibrant, set attribute + toggle `.dark` based on system.
4.  **Default**: If Pro/System, clear attribute + toggle `.dark`.

### Phase 3: UI Layer

**Goal**: Update the UI to reflect the new architecture.

1.  **Picker**: Update `components/dashboard/ThemePicker.tsx` options to match new IDs.
2.  **Persistence**: Ensure `localStorage` is used (per clarification).

## Gate Checks

- [ ] **Research**: `research.md` complete? (Yes, decisions codified in prompt).
- [ ] **Design**: `data-model.md` and theme definitions ready?
- [ ] **Contract**: UI/Logic interface clear?