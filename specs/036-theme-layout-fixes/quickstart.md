# Quickstart: Testing Theme & Layout

## 1. Prerequisites
*   Frontend running: `npm run dev` in `frontend/`

## 2. Verification Steps

### Theme Toggle
1.  Navigate to `http://localhost:3000/dashboard`.
2.  Locate the Sun/Moon icon in the top header.
3.  Click it to toggle between Light and Dark modes.
4.  **Verify**: Background changes from White to Black (zinc-950) immediately. Text contrast remains readable.

### Chat Widget
1.  Navigate to `http://localhost:3000/dashboard`.
2.  Look at the **Bottom Left** corner.
3.  **Verify**: The Chat bubble icon is visible and not cut off.
4.  Click the icon to open the chat.
5.  **Verify**: The chat window opens in the bottom-left area and stays fixed when scrolling.

### Code Cleanup Check
1.  Search codebase for `data-theme` usage. Should be 0 results (except maybe in comments).
2.  Verify `ThemePicker` component is removed or unused.
