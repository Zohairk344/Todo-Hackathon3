# Quickstart: MCP Tool Upgrade & Theme Synchronization

**Feature**: `029-mcp-tool-upgrade`

## Prerequisites
- Backend running
- Frontend running
- User logged in

## Testing Manual

### 1. Advanced Task Creation
1. Open Chat.
2. Type: "Add a high priority task 'Finish Report' due tomorrow in Work category".
3. Check the "Tasks" list.
4. **Verify**:
   - Title: "Finish Report"
   - Priority: "HIGH" (Red badge usually)
   - Due Date: Tomorrow's date
   - Category: "Work" (if it existed)

### 2. Category Awareness
1. Create a new category "Vacation".
2. Open Chat.
3. Ask: "Add a task 'Book Flight' to Vacation".
4. **Verify**: Task is created and linked to "Vacation" category.

### 3. Theme Sync
1. Go to Settings/Theme.
2. Select a custom theme (e.g., "Midnight" or just "Dark").
3. Open Chat Widget.
4. **Verify**: The widget background is NOT white. It should match the card background color of the theme.

## Verification Script
Run `python tests/sanity_mcp.py` to test the `add_task` logic independently (once script is created).