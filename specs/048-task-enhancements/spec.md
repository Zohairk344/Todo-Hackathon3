# Feature Specification: Task Dashboard Enhancements and Fixes

**Feature Branch**: `048-task-enhancements`  
**Created**: 2026-02-06  
**Status**: Draft  
**Input**: User description: "**The Mission:** Fix the \"Method Not Allowed\" (405) error when updating tasks, complete the \"Create Task\" form by adding a Due Date picker, wire up the \"Create Category\" shortcut, and enrich the Task Card UI to show full details (Description, Priority, Due Date, Category). **The Context:** * **Critical Bug (405 Error):** The Frontend is sending a `PATCH` request to update task status, but the Backend (FastAPI) is rejecting it. This usually means the Backend route is defined as `@router.put` instead of `@router.patch`. * **Missing Features:** Users cannot set a deadline (`due_date`) when creating a task. * **Broken UX:** The \"+\" button next to the Category dropdown does nothing. It needs to switch the user from the Task Dialog to the Category Dialog. * **Sparse UI:** The Task Dashboard only shows titles. The user wants to see the Description, Priority, Category, and Due Date at a glance. **Key Technical Requirements:** 1. **Backend Fix (`backend/app/api/routes/tasks.py`):** * Locate the `update_task` endpoint. * **Change the decorator** from `@router.put` to `@router.patch` to match the Frontend's expectation and standard REST practices for partial updates. * Ensure the function accepts `TaskUpdate` (partial fields) rather than `TaskCreate` (all fields required). 2. **Frontend: Add Due Date (`frontend/components/dashboard/new-task-dialog.tsx`):** * Add a new state variable: `const [dueDate, setDueDate] = useState(\"\")`. * Add a standard HTML date input `<Input type=\"date\" ... />\" to the form. * Include `due_date\" in the payload sent to `onConfirm`. Note: Backend likely expects ISO string or `YYYY-MM-DD`. 3. **Frontend: Wire \"+\" Button (`frontend/app/dashboard/page.tsx\" & `new-task-dialog.tsx`):** * **In `DashboardPage`:** Pass a new prop `onAddCategoryClick\" to `NewTaskDialog`. * **Logic:** `onAddCategoryClick={() => { setIsTaskModalOpen(false); setIsCategoryModalOpen(true); }}`. This closes the task modal and opens the category modal instantly. * **In `NewTaskDialog`:** Bind the `+\" button's `onClick\" to this new prop. 4. **Frontend: Enrich Task Card (`frontend/components/dashboard/task-view.tsx`):** * Update the card layout to display: * **Description:** A text block below the title (truncate if too long). * **Due Date:** A small calendar icon + date (e.g., \"Oct 24\"). * **Priority:** A colored Badge (High=Red, Medium=Yellow, Low=Green/Gray). * **Category:** A colored text/badge using the Category's hex code. **Testing & Verification Plan (CLI):** * **Backend Route Check:** Verify `backend/app/api/routes/tasks.py\" explicitly uses `PATCH`. * **Build Verification:** Run `npm run build\" to ensure the new props (`onAddCategoryClick\") don't cause type errors. * **Network Prediction:** * *Before:* `PATCH /tasks/3\" -> `405 Method Not Allowed\". * *After:* `PATCH /tasks/3\" -> `200 OK\" (Status updates successfully). **Success Criteria:** * Marking a task as \"Complete\" works instantly without errors. * The \"Create Task\" popup allows selecting a date. * Clicking the \"+\" icon opens the \"Create Category\" dialog. * The Dashboard cards look rich and informative, not empty."

## Clarifications

### Session 2026-02-07
- Q: After the user successfully creates a new category via the shortcut, what should the system do? → A: Reopen "Create Task" dialog with the new category pre-selected (Restores context).
- Q: What is the preferred format for displaying the due date on the task card? → A: "MMM DD" (e.g., "Oct 24") - High readability, compact.
- Q: How should long task descriptions be handled on the dashboard task card? → A: Truncate with ellipsis (e.g., max 2 lines) - Keeps cards uniform and dashboard clean.
- Q: Should the "Due Date" field also be added to the "Edit Task" dialog, or only "Create Task"? → A: Both "Create" and "Edit" - Essential for maintaining tasks when deadlines change.
- Q: What colors should be used for the priority badges? → A: High=Red, Medium=Yellow/Orange, Low=Green/Gray - Standard semantic colors.
- Q: What should happen if the user cancels the category creation dialog (started via shortcut)? → A: Reopen "Create Task" dialog - Restores the user's previous context.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Task Completion/Update (Priority: P1)

The user wants to mark a task as complete or update its status without encountering errors. Currently, a 405 Method Not Allowed error prevents this.

**Why this priority**: Core functionality is broken. Users cannot use the app to manage task states.

**Independent Test**: Marking a task as "Complete" in the UI results in a successful status update and a 200 OK response from the backend.

**Acceptance Scenarios**:

1. **Given** a user is on the dashboard with existing tasks, **When** they click the completion checkbox for a task, **Then** the task status is updated instantly without error messages.

---

### User Story 2 - Enrich Task Cards (Priority: P2)

The user wants to see more information on the dashboard cards (Description, Due Date, Priority, Category) instead of just the title.

**Why this priority**: Improves information density and allows users to prioritize tasks at a glance.

**Independent Test**: Task cards on the dashboard display the task's description (truncated with ellipsis if longer than 2 lines), due date (formatted as "MMM DD", e.g., "Oct 24", with icon), priority badge, and category badge.

**Acceptance Scenarios**:

1. **Given** a task with a description, priority, category, and due date, **When** it is viewed on the dashboard, **Then** all these details are clearly visible on the task card.

---

### User Story 3 - Add Due Date to Tasks (Priority: P3)

The user wants to set or update a deadline when creating or editing a task.

**Why this priority**: Essential for task planning and scheduling.

**Independent Test**: The "Create Task" and "Edit Task" forms include a date picker, and the selected date is saved and displayed on the task.

**Acceptance Scenarios**:

1. **Given** the "Create Task" dialog is open, **When** the user selects a due date and saves the task, **Then** the task is created with the correct due date.
2. **Given** an existing task without a due date, **When** the user edits the task and selects a due date, **Then** the task is updated with the correct due date.

---

### User Story 4 - Category Creation Shortcut (Priority: P4)

The user wants a quick way to create a new category while creating a task.

**Why this priority**: UX improvement that streamlines the workflow when a required category is missing.

**Independent Test**: Clicking the "+" button in the "Create Task" dialog closes it and opens the "Create Category" dialog. Upon successful category creation, the "Create Task" dialog reopens automatically.

**Acceptance Scenarios**:

1. **Given** the "Create Task" dialog is open, **When** the user clicks the "+" button next to the category dropdown, **Then** the "Create Task" dialog closes and the "Create Category" dialog opens immediately.
2. **Given** the user has transitioned to the "Create Category" dialog via the shortcut, **When** they successfully create a category, **Then** the "Create Category" dialog closes and the "Create Task" dialog reopens with the new category pre-selected.
3. **Given** the user has transitioned to the "Create Category" dialog via the shortcut, **When** they cancel the dialog, **Then** the "Create Category" dialog closes and the "Create Task" dialog reopens, preserving previously entered data.

### Edge Cases

- **Invalid Date**: How does the system handle a due date in the past or an invalid date format?
- **Long Description**: How is a very long description handled in the Task Card UI? (Truncation expected).
- **Missing Data**: How does the Task Card look if some optional fields (Description, Due Date) are missing?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support partial updates to tasks (PATCH) to allow status changes.
- **FR-002**: System MUST allow users to select or update a due date when creating or editing a task.
- **FR-003**: System MUST display task description, priority, due date, and category on the dashboard task cards.
- **FR-004**: System MUST provide a shortcut to create a new category from the task creation dialog.
- **FR-005**: System MUST reopen the task creation dialog after the category shortcut workflow completes (on success or cancellation).
- **FR-006**: Priority levels MUST be visually distinct using semantic colors (High: Red, Medium: Yellow/Orange, Low: Green/Gray).
- **FR-007**: Category badges MUST use the color assigned to the category.
- **FR-008**: Due dates on task cards MUST be displayed in "MMM DD" format (e.g., "Oct 24").
- **FR-009**: Task descriptions on dashboard cards MUST be truncated with an ellipsis if they exceed 2 lines.

### Key Entities *(include if feature involves data)*

- **Task**: Represents a to-do item. Key attributes: Title, Description, Status, Priority, Due Date, Category ID.
- **Category**: Represents a grouping for tasks. Key attributes: Name, Color.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Task status updates (marking complete) succeed 100% of the time without 405 errors.
- **SC-002**: Users can set a due date in the "Create Task" form in a single interaction.
- **SC-003**: Dashboard task cards display 100% of the requested metadata (Description, Priority, Due Date, Category) if available.
- **SC-004**: Transitioning from Task creation to Category creation via the shortcut takes less than 500ms.