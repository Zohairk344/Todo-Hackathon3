# Data Model: The Definitive Theme Fix

## Client-Side State

### Types

```typescript
export type Theme = "pro" | "hacker" | "forest" | "playful" | "vibrant";
export type Mode = "light" | "dark" | "system";

export interface ThemeConfig {
  name: string;
  description: string;
  cssClass: string; // Tailwind classes for the selector button
  forcedMode?: "dark" | "light"; // If present, locks the mode
}
```

### Context Interface

```typescript
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  effectiveMode: "light" | "dark"; // The actual rendered mode (resolved from system/forced)
  isModeForced: boolean; // True if current theme has a forcedMode
}
```

### Persistence

- **Key**: `theme-preference`
- **Value**: JSON object `{ theme: Theme, mode: Mode }`
- **Default**: `{ theme: "pro", mode: "system" }`

## CSS Variables (Global)

Defined in `app/globals.css` under `[data-theme="..."]` selectors.

| Variable | Description |
|---|---|
| `--background` | Main page background |
| `--foreground` | Main text color |
| `--card` | Card background |
| `--card-foreground` | Card text color |
| `--popover` | Popover background |
| `--popover-foreground` | Popover text color |
| `--primary` | Primary brand color |
| `--primary-foreground` | Text on primary color |
| `--secondary` | Secondary brand color |
| `--secondary-foreground` | Text on secondary color |
| `--muted` | Muted background |
| `--muted-foreground` | Muted text color |
| `--accent` | Accent background |
| `--accent-foreground` | Accent text color |
| `--destructive` | Error/Delete color |
| `--destructive-foreground` | Text on destructive color |
| `--border` | Border color |
| `--input` | Input field border |
| `--ring` | Focus ring color |
| `--radius` | Global border radius |
