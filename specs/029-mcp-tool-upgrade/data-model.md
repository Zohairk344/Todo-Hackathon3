# Phase 1: Data Model

**Feature**: MCP Tool Upgrade & Theme Synchronization (`029-mcp-tool-upgrade`)
**Date**: 2026-01-22

## Entities

### Task
*Existing entity in `backend/app/models.py` - No schema changes, just usage update*
- **id**: `int` (Primary Key)
- **title**: `str`
- **description**: `str` (Optional)
- **priority**: `Priority` Enum ("LOW", "MEDIUM", "HIGH")
- **due_date**: `datetime` (Optional)
- **category_id**: `int` (Foreign Key)
- **user_id**: `str` (Foreign Key)

### Category
*Existing entity in `backend/app/models.py`*
- **id**: `int` (Primary Key)
- **name**: `str`
- **user_id**: `str` (Foreign Key)

## Schema Validation (Ironclad)

- **Column Mapping**:
  - `priority` -> `priority` (Enum)
  - `due_date` -> `dueDate` (Mapped in `Task` model)
  - `category_id` -> `categoryId`

## Tool Signatures (MCP)

### add_task
- **Arguments**:
  - `title`: `str`
  - `description`: `str` (default: None)
  - `priority`: `str` (default: "MEDIUM")
  - `due_date`: `str` (default: None)
  - `category_name`: `str` (default: None)