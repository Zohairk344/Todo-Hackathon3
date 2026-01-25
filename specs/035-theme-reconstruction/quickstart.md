# Quickstart: Total Theme Reconstruction

## Development Setup

1. **CSS Initialization**:
   - Open `frontend/app/globals.css`.
   - Scroll to the bottom.
   - Add the new `[data-theme]` blocks.

2. **Logic Integration**:
   - Open `frontend/components/theme-provider.tsx`.
   - Update the `ThemeProvider` logic to handle the conditional `dark` class logic.

3. **UI Verification**:
   - Open `frontend/components/dashboard/ThemePicker.tsx`.
   - Ensure the IDs match the new CSS selectors.

## Verification Checklist

- [ ] Select **Hacker**: Background is true black, primary is neon green, radius is 0.
- [ ] Select **Forest**: Background is deep green, primary is emerald.
- [ ] Select **Playful**: Background is lavender (light mode) or deep purple (dark mode), radius is 1.5rem.
- [ ] Select **System**: UI follows OS preference with neutral colors.
- [ ] Verify **No Flash**: Page load does not show a white flash before applying a dark theme.
