# Implementation Plan: MCP Tool Upgrade & Theme Synchronization

**Branch**: `029-mcp-tool-upgrade` | **Date**: 2026-01-22 | **Spec**: [specs/029-mcp-tool-upgrade/spec.md](spec.md)
**Input**: Feature specification from `/specs/029-mcp-tool-upgrade/spec.md`

## Summary

This feature enhances the `add_task` MCP tool to support task prioritization, due dates, and category linking, enabling the AI to create fully detailed tasks. It also injects available categories into the system prompt for better context awareness and refactors the Chat Widget frontend to use semantic CSS variables, ensuring consistent theming across all modes.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), TypeScript 5+ (Frontend)
**Primary Dependencies**: FastAPI, SQLModel, OpenAI (Backend); Next.js 14+, Tailwind CSS, next-themes (Frontend)
**Storage**: PostgreSQL (Neon) via `app.db` engine
**Testing**: Manual verification via Chat Interface
**Target Platform**: Hugging Face Spaces (Docker) / Localhost for dev
**Project Type**: Full-stack Web Application
**Performance Goals**: Instant theme switching, minimal latency for task creation
**Constraints**: Ironclad Database Schema (strictly camelCase columns), 0.0.0.0 host for deployment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Tech Stack**: Matches Constitution (FastAPI, Next.js, Tailwind, Neon).
- [x] **Schema Rules**: Ironclad mapping followed (existing `Task`/`Category` models).
- [x] **Verification Protocol**: Tasks will include `tests/sanity_mcp.py` and syntax checks.

## Project Structure

### Documentation (this feature)

```text
specs/029-mcp-tool-upgrade/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code

```text
todo-hackathon3/
├── app/
│   ├── mcp_server.py        # Update: add_task signature & logic
│   ├── api/routes/
│   │   └── chat.py          # Update: System prompt context injection
│   └── models.py            # Reference: Task, Category, Priority
└── tests/
    └── sanity_mcp.py        # New: Verification script

frontend/
└── components/
    └── dashboard/
        └── ChatWidget.tsx   # Update: Semantic colors
```

**Structure Decision**: Standard full-stack structure with `todo-hackathon3` as backend and `frontend` as frontend.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |