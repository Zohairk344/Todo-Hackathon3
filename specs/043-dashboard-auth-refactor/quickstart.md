# Quickstart: Dashboard Auth Refactor

## Verification Steps

1.  **Login**: Access the application and sign in.
2.  **Open Dashboard**: Navigate to `/dashboard`.
3.  **Inspect Network**: Open Developer Tools -> Network tab.
4.  **Verify Requests**:
    *   Reload the page.
    *   Look for requests to `/api/{userId}/tasks` and `/api/{userId}/categories`.
    *   **SUCCESS**: Status `200 OK`. Request headers include `Cookie`.
    *   **FAILURE**: Status `401 Unauthorized`.
5.  **Test Interactions**:
    *   Click "Add Task". Fill form and save.
    *   Verify immediate UI update and `POST` request success.
    *   Click "Add Category". Fill form and save.
    *   Verify immediate UI update.

## Debugging

*   If `401` persists:
    *   Check `api-client.ts` for `credentials: "include"`.
    *   Check browser console for CORS errors.
    *   Verify backend logs for session validation failure.
