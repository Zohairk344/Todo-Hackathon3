# Data Model: Total Theme Reconstruction

## Overview
This feature does not introduce new database tables. It redefines the client-side state and CSS variable structure.

## Entities (Client-Side Only)

### ThemeState
Represents the active configuration of the application's appearance.

| Field | Type | Description |
|-------|------|-------------|
| activeTheme | String | One of: `pro`, `hacker`, `forest`, `playful`, `vibrant`, `system` |
| systemPreference | 'light' \| 'dark' | The OS-level color preference |
| effectiveMode | 'light' \| 'dark' | The mode actually applied to the DOM (`.dark` class presence) |

## State Transitions

### Theme Change Logic
When a user selects a theme, the following logic determines the final DOM state:

1. **Clear**: Remove `data-theme` attribute.
2. **Evaluate**:
   - IF theme in (`hacker`, `forest`):
     - `data-theme` = theme
     - `classList.add('dark')`
   - IF theme in (`playful`, `vibrant`):
     - `data-theme` = theme
     - IF `systemPreference` == 'dark': `add('dark')` ELSE `remove('dark')`
   - IF theme == `pro`:
     - NO `data-theme` attribute
     - IF `systemPreference` == 'dark': `add('dark')` ELSE `remove('dark')`
   - IF theme == `system`:
     - NO `data-theme` attribute
     - IF `systemPreference` == 'dark': `add('dark')` ELSE `remove('dark')`
