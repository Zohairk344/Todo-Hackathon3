---
id: 0006
title: Phase 5.1 Style Restoration and Cleanup
stage: refactor
date: 2026-01-25
surface: agent
model: gemini-2.0-flash-exp
feature: 036-theme-layout-fixes
branch: 036-theme-layout-fixes
user: User
command: /sp.implement
labels: ["refactor", "css", "theme", "layout"]
links:
  spec: specs/036-theme-layout-fixes/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/globals.css
  - frontend/components/dashboard/ThemePicker.tsx
  - frontend/app/dashboard/settings/page.tsx
  - frontend/components/dashboard/ChatWidget.tsx
  - frontend/app/dashboard/layout.tsx
tests:
  - null
---

## Prompt

**Phase 5.1: Emergency Style Restoration & Cleanup**

**1. Fix `app/globals.css` (CRITICAL)**
* **Problem:** The site looks unstyled because the Tailwind directives are missing.
* **Action:** Replace the ENTIRE content of `app/globals.css` with this code. Note the top 3 lines:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    @layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 222.2 84% 4.9%;
        --radius: 0.5rem;
      }
    
      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;
        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;
        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 11.2%;
        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;
        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;
        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 212.7 26.8% 83.9%;
      }
    }
    
    @layer base {
      * {
        @apply border-border;
      }
      body {
        @apply bg-background text-foreground;
      }
    }
    ```

**2. Clean Up Settings UI (`components/dashboard/ThemePicker.tsx`)**
* **Problem:** The UI still shows "Hacker", "Forest", etc., but they are broken.
* **Action:** Update the `themes` array to ONLY include valid options.
    ```typescript
    const themes = [
      { id: "light", name: "Light Mode", color: "bg-white" },
      { id: "dark", name: "Dark Mode", color: "bg-slate-950" },
      { id: "system", name: "System", color: "bg-gray-200" },
    ];
    // Update the click handler to simply call `setTheme(theme.id)` using the standard next-themes hook.
    ```

**3. Verify Chat Layout (`app/dashboard/layout.tsx`)**
* **Action:** Ensure the chat widget is correctly positioned outside the main flow.
    ```typescript
    // Ensure this class is applied to the ChatWidget wrapper:
    // className="fixed bottom-6 left-6 z-50"
    ```

## Response snapshot

Restored Tailwind styling, simplified theme picker, and fixed chat widget positioning.
- **globals.css**: Re-added `@tailwind` directives and unified `@layer base` blocks.
- **ThemePicker.tsx**: Recreated with only Light, Dark, and System options.
- **Settings Page**: Restored the simplified `ThemePicker`.
- **ChatWidget.tsx**: Removed internal `fixed` positioning to avoid conflicts with layout wrapper.
- **Dashboard Layout**: Verified `fixed bottom-6 left-6 z-50` wrapper.

## Outcome

- ✅ Impact: Resolved critical "Times New Roman" unstyled state and fixed layout regressions.
- 🧪 Tests: Visual verification of layout and theme switching.
- 📁 Files: globals.css, ThemePicker.tsx, settings/page.tsx, ChatWidget.tsx, layout.tsx
- 🔁 Next prompts: None
- 🧠 Reflection: The unstyled state was due to missing `@tailwind` directives in the previous CSS replacement. Simplified positioning logic for the chat widget ensures it follows the layout wrapper.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null