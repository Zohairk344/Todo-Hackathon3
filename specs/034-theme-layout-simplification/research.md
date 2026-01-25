# Research: Simplification & Layout Fixes

## Decisions

### 1. Theme Reset Strategy
- **Decision**: Implement a "Legacy Cleanup" effect in the updated `ThemeStyleProvider`.
- **Rationale**: We must handle users migrating from the complex "hacker/forest" themes. Detecting these invalid values in `localStorage` and resetting to "system" prevents broken UI states.
- **Mechanism**:
  ```tsx
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const legacyThemes = ["hacker", "forest", "playful", "vibrant", "pro"];
    if (legacyThemes.includes(savedTheme)) {
      setTheme("system");
    }
  }, []);
  ```

### 2. Chat Widget Placement
- **Decision**: Move `ClientChatWrapper` to `app/dashboard/layout.tsx`.
- **Rationale**: The spec requires the widget to be visible across all dashboard routes and positioned relative to the viewport, not the grid content.
- **Implementation Details**:
  - Convert `DashboardLayout` to an `async` Server Component.
  - Fetch session using `auth.api.getSession`.
  - Pass `user.id` to `ClientChatWrapper`.
  - Wrap the widget in a `div` with `fixed bottom-6 left-6 z-50 hidden md:block`.

### 3. Theme Provider Refactoring
- **Decision**: Replace the complex `ThemeStyleContext` with a standard `next-themes` implementation.
- **Rationale**: The current implementation manually manages classes and meta tags, which is brittle and unnecessary with `next-themes`.
- **Plan**:
  - `ThemeStyleProvider` will return `<ThemeProvider attribute="class" defaultTheme="system" enableSystem ...>{children}</ThemeProvider>`.
  - Remove all manual `document.documentElement` manipulation.

## Unknowns Resolution
- **Legacy Theme Handling**: Resolved. We will proactively reset invalid values on mount.
- **Chat Context**: Resolved. `DashboardLayout` can be async and fetch session data to pass to the client wrapper.

## Alternatives Considered
- **Client-Side Layout Fetching**: We could have kept `DashboardLayout` synchronous and used a client component to fetch the user for the chat widget.
  - *Rejected*: Slower TTI for the chat widget and introduces layout shift. Server-side session fetching is already standard in this app.
- **Global Layout Placement**: Moving chat to `app/layout.tsx`.
  - *Rejected*: The spec explicitly restricts chat to the authenticated dashboard area (`FR-010`).
