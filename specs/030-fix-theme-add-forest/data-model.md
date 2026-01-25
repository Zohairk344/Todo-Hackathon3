# Data Model

## Enums

### ThemeStyle
*   **Description**: Defines the visual theme variant active in the application.
*   **Location**: `frontend/lib/theme-style-context.tsx`
*   **Values**:
    *   `"pro"` (Default): Clean, professional (Light-based).
    *   `"playful"`: Friendly, rounded (Light-based).
    *   `"hacker"`: Terminal aesthetics (High contrast Dark).
    *   `"forest"`: **(New)** Nature-inspired (Dark Green).

## Entities

### ThemeDefinition
*   **Description**: Metadata used in the `ThemeSelector` UI.
*   **Location**: `frontend/components/theme-selector.tsx` (Local array, consideration to move to a config file).
*   **Structure**:
    *   `id`: `ThemeStyle`
    *   `name`: `string`
    *   `description`: `string`
    *   `className`: `string` (Preview classes)
    *   `colors`: `object` (Optional, for detailed preview if needed)
