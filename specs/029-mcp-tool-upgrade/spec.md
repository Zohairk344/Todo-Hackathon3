# Feature Specification: MCP Tool Upgrade & Theme Synchronization

**Feature Branch**: `029-mcp-tool-upgrade`
**Created**: 2026-01-22
**Status**: Draft
**Input**: User description provided in prompt.

## User Scenarios & Testing

### User Story 1 - Advanced Task Creation (Priority: P1)

As a user, I want the AI to understand and set task details like priority, due date, and category, so that I don't have to manually edit tasks after asking the AI to create them.

**Why this priority**: Currently, the AI fails to set these fields, leading to incomplete task data and user frustration.

**Independent Test**:
1. Open Chat.
2. Type: "Add a high priority task 'Finish Report' due tomorrow in Work category".
3. Verify the task is created with Priority=HIGH, Category=Work, and correct Due Date.

**Acceptance Scenarios**:

1. **Given** a user prompt with priority "High", **When** the AI calls `add_task`, **Then** the task is saved with `priority="HIGH"`.
2. **Given** a user prompt with a category "Personal", **When** the AI calls `add_task`, **Then** the system looks up "Personal", finds its ID, and links it.
3. **Given** a user prompt with a due date, **When** the AI calls `add_task`, **Then** the date is parsed and saved correctly.

---

### User Story 2 - Context-Aware Category Selection (Priority: P2)

As a user, I want the AI to know which categories I have created, so that it doesn't try to guess or hallucinate category names that don't exist.

**Why this priority**: Improves success rate of category linking.

**Independent Test**:
1. Create a category named "Groceries".
2. Open Chat.
3. Ask "What categories do I have?".
4. (Implicitly) Ask to add a task to "Groceries".
5. Verify the AI finds the category successfully.

**Acceptance Scenarios**:

1. **Given** the user has categories "Work" and "Home", **When** the chat session starts, **Then** the system prompt includes "Available Categories: Work, Home".

---

### User Story 3 - Seamless Theme Integration (Priority: P2)

As a user, I want the Chat Widget to match my selected theme (Light, Dark, or Custom), so that the interface feels cohesive and professional.

**Why this priority**: Visual consistency is key for a polished product; hardcoded colors break the experience in custom themes.

**Independent Test**:
1. Switch theme to "Dark" (or a custom theme).
2. Open Chat Widget.
3. Verify background, text, and input fields match the theme's semantic colors (e.g., `bg-card`, `text-card-foreground`).

**Acceptance Scenarios**:

1. **Given** any active theme, **When** the Chat Widget renders, **Then** it uses CSS variables (e.g., `bg-card`) instead of hardcoded hex/Tailwind colors (e.g., `bg-white`).

---

## Requirements

### Functional Requirements

- **FR-001**: The `add_task` MCP tool MUST accept `priority` (str), `due_date` (str), and `category_name` (str) arguments.
- **FR-002**: The `add_task` tool MUST convert case-insensitive priority strings to the `Priority` Enum.
- **FR-003**: The `add_task` tool MUST parse ISO-format due date strings into `datetime` objects.
- **FR-004**: The `add_task` tool MUST look up `category_name` in the database and resolve it to a `category_id`.
- **FR-005**: The Chat API (`chat.py`) MUST fetch all category names for the user and inject them into the System Prompt context.
- **FR-006**: The Chat Widget (`ChatWidget.tsx`) MUST use semantic Tailwind classes (`bg-card`, `text-foreground`, `border-border`, `bg-muted`) instead of fixed colors.

### Technical Constraints (from User)
- **Backend Path**: `todo-hackathon3/app/mcp_server.py` and `todo-hackathon3/app/api/routes/chat.py`
- **Frontend Path**: `frontend/components/dashboard/ChatWidget.tsx`
- **Date Parsing**: Use `dateutil` or `datetime.fromisoformat`.
- **Theme Strategy**: CSS Variables/Semantic classes only.

### Key Entities

- **Task**: Updated to set `priority`, `due_date`, `category_id` via MCP.
- **Category**: Lookup target for `category_name`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: AI successfully creates a task with all 3 extended fields (Priority, Date, Category) in a single turn.
- **SC-002**: Chat Widget passes visual inspection in at least 2 different themes without code changes.
- **SC-003**: System Prompt contains accurate list of user categories.