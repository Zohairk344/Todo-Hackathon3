# Quickstart: Fix Dashboard Sync

## Development Setup
1. Ensure the Backend is running on port 8000 (or as configured).
2. Start the Frontend development server: `npm run dev` in `frontend/`.

## Verification Steps
### 1. Type Synchronization
- Open the Dashboard.
- Verify that "Due Date" and "Status" are correctly displayed for all tasks.
- Create a task via the Chatbot and verify it appears instantly with correct data.

### 2. UI Restoration
- Click "New Task".
- Verify that the Category and Priority selection use the styled Shadcn Select component (or consistent custom replacement).
- Verify the "Create" button is disabled when the title is empty.

### 3. Data Fetching
- Clear browser cookies/storage to reset session.
- Log in and watch the network tab.
- Verify NO `401 Unauthorized` requests are sent to `/api/.../tasks` before the user session is loaded.

## Troubleshooting
- If tasks don't appear, check the console for "Failed to map task properties" errors.
- If 401s persist, verify `TasksContext.tsx` has the `user.id` guard in `useEffect`.
