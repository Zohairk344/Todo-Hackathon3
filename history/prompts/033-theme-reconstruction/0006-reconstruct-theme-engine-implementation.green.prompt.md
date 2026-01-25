---
id: 0006
title: reconstruct-theme-engine-implementation
stage: green
date: 2026-01-24
surface: agent
model: gemini-2.0-flash-exp
feature: 033-theme-reconstruction
branch: 033-theme-reconstruction
user: user
command: /sp.implement
labels: ["theme", "refactor", "implementation"]
links:
  spec: specs/033-theme-reconstruction/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/globals.css
  - frontend/lib/theme-style-context.tsx
  - frontend/components/theme-selector.tsx
  - specs/033-theme-reconstruction/tasks.md
tests:
  - SC-002: Hacker/Forest always render in dark mode
  - SC-004: Adaptive themes switch palettes correctly
---

## Prompt

/sp.implement

**Execution Order:** Implement Tasks **T-9501**, **T-9502**, and **T-9503** in sequential order.

**CRITICAL QUALITY CONTROL INSTRUCTIONS:**

**1. CSS Reconstruction (`app/globals.css`)**
* **Step A:** **DELETE** all existing `.theme-hacker`, `.theme-forest`, `.theme-playful`, `.theme-vibrant` class blocks.
* **Step B:** Append this **EXACT** block to the very bottom of the file:
    ```css
    /* --- DATA ATTRIBUTE THEME ENGINE --- */
    
    /* 1. Forced Dark Themes (Always Dark) */
    [data-theme="hacker"] {
      --background: 0 0% 0%;
      --foreground: 142 70% 50%;
      --card: 0 0% 5%;
      --card-foreground: 142 70% 50%;
      --popover: 0 0% 5%;
      --popover-foreground: 142 70% 50%;
      --primary: 142 70% 50%;
      --primary-foreground: 0 0% 0%;
      --muted: 0 0% 15%;
      --muted-foreground: 142 70% 40%;
      --border: 142 70% 20%;
      --radius: 0rem;
    }

    [data-theme="forest"] {
      --background: 150 30% 8%;
      --foreground: 150 10% 90%;
      --card: 150 25% 10%;
      --card-foreground: 150 10% 90%;
      --popover: 150 25% 10%;
      --popover-foreground: 150 10% 90%;
      --primary: 142 70% 45%;
      --primary-foreground: 0 0% 100%;
      --muted: 150 20% 15%;
      --muted-foreground: 150 10% 60%;
      --border: 150 20% 18%;
      --radius: 0.5rem;
    }

    /* 2. Adaptive Themes (Light Mode Base) */
    [data-theme="playful"] {
      --background: 262 20% 97%;
      --foreground: 262 20% 20%;
      --card: 0 0% 100%;
      --card-foreground: 262 20% 20%;
      --primary: 262 80% 60%;
      --primary-foreground: 0 0% 100%;
      --radius: 1.5rem;
    }
    [data-theme="vibrant"] {
      --background: 0 0% 100%;
      --foreground: 220 20% 10%;
      --card: 0 0% 100%;
      --card-foreground: 220 20% 10%;
      --primary: 330 80% 60%; /* Hot Pink */
      --primary-foreground: 0 0% 100%;
      --secondary: 190 90% 50%; /* Cyan */
      --secondary-foreground: 0 0% 100%;
      --radius: 0.75rem;
    }

    /* 3. Adaptive Themes (Dark Mode Override) */
    [data-theme="playful"].dark {
      --background: 262 20% 10%;
      --foreground: 262 10% 90%;
      --card: 262 20% 13%;
      --card-foreground: 262 10% 90%;
    }
    [data-theme="vibrant"].dark {
      --background: 220 20% 10%; /* Navy */
      --foreground: 220 10% 90%;
      --card: 220 20% 13%;
      --card-foreground: 220 10% 90%;
      --primary: 190 90% 50%; /* Cyan Main */
    }
    ```

**2. Logic Engine (`components/theme-provider.tsx`)**
* **Constraint:** Replace the main `useEffect` for `[theme]` with this logic:
    ```typescript
    useEffect(() => {
      const root = window.document.documentElement;
      
      // 1. Reset: Clean slate
      root.removeAttribute("data-theme");
      root.classList.remove("dark"); 

      // 2. Check Preferences
      // Note: If you have a separate 'mode' toggle, use that. Otherwise, default to system.
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // You might want to read a 'mode' from localStorage if you support manual Light/Dark toggling separate from theme.
      // For now, assuming adaptive themes follow system preference:
      const wantsDark = systemDark; 

      // 3. Apply Theme Logic
      if (theme === "hacker" || theme === "forest") {
        // FORCED DARK
        root.setAttribute("data-theme", theme);
        root.classList.add("dark");
      } 
      else if (theme === "playful" || theme === "vibrant") {
        // ADAPTIVE
        root.setAttribute("data-theme", theme);
        if (wantsDark) root.classList.add("dark");
      } 
      else if (theme === "dark" || (theme === "system" && systemDark)) {
        // PRO / DEFAULT
        root.classList.add("dark");
      }
      
      // 4. Save
      localStorage.setItem("theme", theme);
    }, [theme]);
    ```

**3. UI Update (`components/dashboard/ThemePicker.tsx`)**
* **Action:** Ensure the `themes` array has these IDs: `pro`, `hacker`, `forest`, `playful`, `vibrant`.

**Final Goal:**
A clean, conflict-free theme engine where "Hacker" is always black/green, and "Vibrant" switches colors based on your system mode.

## Response snapshot

Implemented Phase 5 Theme Reconstruction.
1. Cleaned and reconstructed `app/globals.css` with data attribute architecture.
2. Rewrote `ThemeStyleProvider` logic for forced-dark and adaptive themes.
3. Updated `ThemeSelector` to include all required theme IDs.
4. Verified all success criteria and marked tasks as completed.

## Outcome

- ✅ Impact: Replaced legacy theme engine with a robust, conflict-free data attribute system.
- 🧪 Tests: Verified forced dark themes and adaptive mode switching.
- 📁 Files: globals.css, theme-style-context.tsx, theme-selector.tsx, tasks.md
- 🔁 Next prompts: None
- 🧠 Reflection: Sequential implementation from CSS foundation to UI connection ensures no intermediate broken states.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None