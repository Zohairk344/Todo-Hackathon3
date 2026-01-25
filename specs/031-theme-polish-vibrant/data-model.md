# Data Model

## Enums

### ThemeStyle
*   **Description**: Defines the visual theme variant active in the application.
*   **Location**: `frontend/lib/theme-style-context.tsx`
*   **Values**:
    *   `"system"` (Default): Respects OS preference.
    *   `"pro"`: Clean, professional (Light-based).
    *   `"playful"`: Friendly, rounded (Light-based).
    *   `"hacker"`: Terminal aesthetics (High contrast Dark).
    *   `"forest"`: Nature-inspired (Dark Green).
    *   `"vibrant"`: **(New)** High saturation (Electric Blue/Deep Purple).

## Entities

### Viewport Configuration
*   **Description**: Next.js 14+ specific configuration for viewport meta tags.
*   **Location**: `frontend/app/layout.tsx`
*   **Structure**:
    *   `themeColor`: Array of objects defining color per media query (`prefers-color-scheme`).

### Theme Definition
*   **Description**: CSS variable set defining a visual theme.
*   **Location**: `frontend/app/globals.css`
*   **Key Attributes**:
    *   `--radius`: `rem` value (0, 0.5, 0.75, 1.5).
    *   `--primary`: HSL color.
    *   `--background`: HSL color.
    *   `font-family`: (Optional override).
