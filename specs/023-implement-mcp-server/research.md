# Research: Implement MCP Server & Tools

## Decisions

### 1. Dependency Selection
* **Decision**: Use `mcp` package (Official Model Context Protocol Python SDK).
* **Rationale**: This is the official SDK maintained by the protocol creators, ensuring full compliance and up-to-date features.
* **Alternatives Considered**: 
    * `mcp-server-py`: Deprecated or older implementation.
    * Custom implementation: Too complex and risky given the protocol's depth.

### 2. Integration Strategy
* **Decision**: Define the MCP server instance in a standalone module (`backend/app/mcp_server.py`) but do not mount it as a FastAPI sub-app directly in this phase (unless required for transport). The primary goal is to have the tools definable and callable.
* **Rationale**: Keeps the codebase modular. The specific transport mechanism (Stdio vs SSE) often dictates how it runs. For Hugging Face Spaces/Docker, Stdio is common for agent usage, while SSE works for web. The spec implies "integrated into FastAPI" but "distinct". We will initialize it such that it *can* be mounted or run separately.
* **Refinement**: Given "integrated into FastAPI backend", we might need an SSE endpoint. However, the spec emphasizes "distinct logical component". We will implement the server instance and tools first.

## Technical Details

* **Package Name**: `mcp`
* **Import Pattern**: `from mcp.server.fastmcp import FastMCP`
* **Concurrency**: `async` tool definitions to play nicely with `sqlmodel` async engine.
