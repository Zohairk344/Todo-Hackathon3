# Data Model: Total Theme Reset

## Client-Side State

### UserPreference
Represents the user's interface settings stored locally in the browser.

- **theme**: `String` (Enum: `light`, `dark`, `system`)
  - Description: The active visual theme mode.
  - Storage: `localStorage` (via `next-themes`).
  - Default: `system`.

## Server-Side Entities
*No changes to server-side entities (SQLModel) in this phase.*
