# Data Model: Theme System

**Feature**: Total Theme Reconstruction

## Entities

### Theme Configuration

A purely client-side configuration definition (not stored in DB, but hardcoded in logic/CSS).

| ID | Name | Type | Colors (Light/Dark) | Radius |
| :--- | :--- | :--- | :--- | :--- |
| `pro` | Pro (Default) | Standard (Adaptive) | Zinc/Slate | `0.5rem` |
| `hacker` | Hacker | Forced Dark | Black / Neon Green | `0rem` |
| `forest` | Forest | Forced Dark | Deep Green / Emerald | `0.5rem` |
| `playful` | Playful | Adaptive | Lavender/Purple / Deep Purple | `1.5rem` |
| `vibrant` | Vibrant | Adaptive | White/Pink / Navy/Cyan | `0.75rem` |
| `system` | System | Standard (Adaptive) | Zinc/Slate | `0.5rem` |

### User Preference

Stored in Browser `localStorage`.

- **Key**: `theme`
- **Value**: String (one of the IDs above)
- **Default**: `system` (or `pro` if system is undefined)

## Interfaces

### ThemeProvider Logic

The logic acts as a state machine:

```typescript
type ThemeID = 'pro' | 'hacker' | 'forest' | 'playful' | 'vibrant' | 'system';

interface ThemeState {
  theme: ThemeID;
  setTheme: (theme: ThemeID) => void;
}
```

**State Transition Logic**:

| Selected Theme | System Pref | `data-theme` Value | `.dark` Class |
| :--- | :--- | :--- | :--- |
| `pro` | Light | *(removed)* | Removed |
| `pro` | Dark | *(removed)* | Added |
| `hacker` | *Any* | `hacker` | **Added** (Forced) |
| `forest` | *Any* | `forest` | **Added** (Forced) |
| `playful` | Light | `playful` | Removed |
| `playful` | Dark | `playful` | Added |
| `vibrant` | Light | `vibrant` | Removed |
| `vibrant` | Dark | `vibrant` | Added |
