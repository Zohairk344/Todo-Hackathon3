# Phase 0: Research & Decisions

**Feature**: MCP Tool Upgrade & Theme Synchronization (`029-mcp-tool-upgrade`)
**Date**: 2026-01-22

## Key Decisions

### 1. Theme Synchronization Strategy
- **Decision**: Use semantic CSS variables (e.g., `bg-card`, `text-foreground`) provided by `shadcn/ui` / `globals.css` instead of hardcoded hex values.
- **Rationale**: This allows the Chat Widget to automatically adapt to any theme (Light, Dark, Midnight) defined in the global CSS without requiring specific conditional logic in the component. It aligns with the existing design system.
- **Alternatives Considered**: Passing theme prop to widget. Rejected because it adds unnecessary coupling and prop drilling.

### 2. Date Parsing
- **Decision**: Use `dateutil.parser` if available, or `datetime.fromisoformat` as a fallback.
- **Rationale**: The AI may produce ISO strings or slightly varying formats. Robust parsing is essential to prevent task creation failures.
- **Constraints**: Standard library preferred if `python-dateutil` is not already a dependency (will verify).

### 3. Category Lookup Logic
- **Decision**: Perform a case-insensitive lookup for category names.
- **Rationale**: User input "work" should match category "Work" or "WORK".
- **Implementation**: `select(Category).where(col(Category.name).ilike(name))` or Python-side filtering if `ilike` issues arise (though `ilike` is standard in SQLModel/SQLAlchemy).

## Unknowns Resolved

- **MCP Tool Signature**: Can be updated directly in `mcp_server.py`. The `@mcp.tool()` decorator handles argument parsing.
- **System Prompt Injection**: `chat.py` already constructs the system prompt. We can inject the category list there dynamically.