# Theme Logic Contract

## Input
- `theme`: String (enum: pro, hacker, forest, playful, vibrant, system)
- `systemPreference`: 'light' | 'dark'

## Expected DOM State

| Theme | data-theme | .dark class |
|-------|------------|-------------|
| pro | (removed) | matches systemPreference |
| hacker | hacker | ALWAYS present |
| forest | forest | ALWAYS present |
| playful | playful | matches systemPreference |
| vibrant | vibrant | matches systemPreference |
| system | (removed) | matches systemPreference |

## Event Handling
- The engine MUST listen for `change` events on the `(prefers-color-scheme: dark)` media query.
