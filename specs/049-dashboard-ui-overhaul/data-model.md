# Data Model: Dashboard UI Overhaul

## Overview
This feature is purely visual and does not introduce changes to the database schema or entity relationships.

## Entities (No Changes)
- **Task**: Standard fields (title, description, priority, completed).
- **Category**: Standard fields (name, color).

## Visual States (UI-level only)
- **Priority Glow**: Derived property in the UI layer mapping `Task.priority` to specific CSS shadow colors.
- **Glass State**: Component-level state for hover scaling.
