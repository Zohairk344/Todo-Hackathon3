# Quickstart: Using the New Theme System

## Overview

The new theme system separates **Theme** (Color Palette) from **Mode** (Light/Dark). It uses `data-theme` attributes on the HTML root element for high-specificity styling.

## Key Components

- **`ThemeContext`**: Provides `theme`, `mode`, `setTheme`, `setMode`.
- **`ThemeSelector`**: Component to pick the visual theme (Hacker, Vibrant, etc.).
- **`ModeToggle`**: Component to switch between Light, Dark, and System modes.

## Adding a New Theme

1.  **Update Types**: Add the new theme name to the `Theme` type in `lib/theme-context.tsx`.
2.  **Add Configuration**: Add the theme metadata (name, description, forcedMode) to the `THEMES` constant in `lib/theme-context.tsx`.
3.  **Define CSS**: Add the `[data-theme="new-theme"]` block in `app/globals.css`.
    *   **Must** define all core variables (background, foreground, primary, radius, etc.).
    *   **Optional**: Add `[data-theme="new-theme"].dark` block for dark mode specific overrides if adaptive.

## Usage Example

```tsx
import { useTheme } from "@/lib/theme-context";

export function MyComponent() {
  const { theme, setTheme, mode, setMode, isModeForced } = useTheme();

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme("vibrant")}>Set Vibrant</button>
      
      <button 
        onClick={() => setMode("dark")} 
        disabled={isModeForced}
      >
        Set Dark Mode
      </button>
    </div>
  );
}
```
