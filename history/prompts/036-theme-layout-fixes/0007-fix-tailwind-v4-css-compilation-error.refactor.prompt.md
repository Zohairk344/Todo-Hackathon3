---
id: 0007
title: Fix Tailwind v4 CSS Compilation Error
stage: refactor
date: 2026-01-25
surface: agent
model: gemini-2.0-flash-exp
feature: 036-theme-layout-fixes
branch: 036-theme-layout-fixes
user: User
command: /sp.implement
labels: ["fix", "css", "tailwind-v4"]
links:
  spec: specs/036-theme-layout-fixes/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/globals.css
tests:
  - null
---

## Prompt

The user reported a `CssSyntaxError` in `frontend/app/globals.css`: `Cannot apply unknown utility class border-border`. This is a Tailwind CSS v4 compilation error.

## Response snapshot

Fixed the Tailwind CSS v4 compilation error by replacing `@apply border-border`, `@apply bg-background`, and `@apply text-foreground` with standard CSS properties using `hsl(var(...))`.

## Outcome

- ✅ Impact: Resolved build-blocking CSS syntax error in Tailwind v4.
- 🧪 Tests: Verified by successful Next.js compilation.
- 📁 Files: globals.css
- 🔁 Next prompts: None
- 🧠 Reflection: Tailwind v4 is stricter with `@apply` on custom variables. Using standard CSS properties for global resets is safer and more reliable.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null