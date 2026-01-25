# Tasks: Implement MCP Server & Tools

**Feature**: Implement MCP Server & Tools
**Status**: Pending
**Spec**: [specs/023-implement-mcp-server/spec.md](/specs/023-implement-mcp-server/spec.md)

## Phase 1: Setup
**Goal**: Initialize dependencies and project structure for MCP.

- [X] T001 Add `mcp` to project dependencies in `todo-hackathon3/pyproject.toml`
- [X] T002 Create `todo-hackathon3/app/mcp_server.py` with `FastMCP` initialization

## Phase 2: Foundational
**Goal**: Ensure core connectivity (None for this phase as it relies on existing DB).

*(No foundational tasks required)*

## Phase 3: AI Agent Interaction & Tools
**Goal**: [US1] Enable AI agents to perform task management operations via MCP tools.
**Test**: `tests/test_mcp_standalone.py` validates all tools.

- [X] T003 [US1] Implement `add_task` tool in `todo-hackathon3/app/mcp_server.py`
- [X] T004 [US1] Implement `list_tasks` tool in `todo-hackathon3/app/mcp_server.py`
- [X] T005 [US1] Implement `update_task` tool in `todo-hackathon3/app/mcp_server.py`
- [X] T006 [US1] Implement `complete_task` tool in `todo-hackathon3/app/mcp_server.py`
- [X] T007 [US1] Implement `delete_task` tool in `todo-hackathon3/app/mcp_server.py`

## Phase 4: Verification & Integration
**Goal**: [US2] Verify stateless operation and correct database integration.
**Test**: Standalone script runs successfully.

- [X] T008 [US2] Create standalone verification script `todo-hackathon3/tests/test_mcp_standalone.py`

## Phase 5: Polish & Cross-Cutting
**Goal**: Final code quality checks.

- [ ] T009 Run linters on `todo-hackathon3/app/mcp_server.py` and `todo-hackathon3/tests/test_mcp_standalone.py`

## Dependencies
1. T001, T002 (Setup) -> T003-T007 (Implementation)
2. T003-T007 -> T008 (Verification) -> T009 (Polish)

## Parallel Execution
- T003, T004, T005, T006, T007 can technically be implemented in parallel as they are distinct functions, but likely sequential for a single developer.

## Implementation Strategy
- **MVP**: Implement all 5 tools as they form the core requirement.
- **Verification**: Use the standalone script to simulate an MCP client interaction.
