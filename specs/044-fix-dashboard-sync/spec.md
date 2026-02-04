# Feature Specification: Fix Dashboard Sync

**Feature**: Fix Dashboard Sync
**Status**: DRAFT
**Owner**: Development Team
**Created**: 2026-02-03

## 1. Feature Overview

**The Mission:** Restore the Dashboard to a fully functional state by ensuring seamless data synchronization between the user interface and the backend system, standardizing the visual design, and improving application stability.

## Clarifications

### Session 2026-02-03
- Q: How should the application behave if the session validation fails or a 401 error persists after the initial "graceful" waiting period? → A: Show a "Session Expired" notification and redirect to login.
- Q: Should the specification explicitly list the camelCase to snake_case property mapping for the Task entity? → A: Yes, list all mandatory property mappings in the Data Consistency section.
- Q: Should there be visual feedback when the Chatbot syncs a new task? → A: Show a brief, non-blocking toast notification.

**Context:**
The current Dashboard experience is degraded due to data format inconsistencies between the server and the client. Users experience crashes, missing data (dates, status), and layout issues in the "New Task" dialog. Additionally, timing issues during login can cause false "Unauthorized" errors.

**Goals:**
1.  Ensure all task data (dates, status, categories) is displayed correctly and consistently.
2.  Restore the "New Task" dialog to match the application's standard design system.
3.  Eliminate application crashes caused by data format mismatches.
4.  Ensure data is only fetched after the user's session is fully established.

## 2. User Scenarios

### 2.1. View Dashboard
**Actor:** Authenticated User
**Preconditions:** User has existing tasks.
**Flow:**
1.  User logs in and navigates to the Dashboard.
2.  The system validates the user's session.
3.  The system retrieves the latest tasks.
4.  **Result:** The Dashboard displays all tasks with correct due dates, statuses, and categories without any error messages.

### 2.2. Chatbot Task Creation
**Actor:** Authenticated User
**Preconditions:** User is on the Dashboard.
**Flow:**
1.  User instructs the Chatbot to create a task.
2.  The system processes the request and creates the task.
3.  **Result:** The new task appears immediately on the Dashboard task list, fully populated, and a brief, non-blocking notification confirms the synchronization.

### 2.3. Manual Task Creation
**Actor:** Authenticated User
**Preconditions:** User is on the Dashboard.
**Flow:**
1.  User opens the "New Task" dialog.
2.  The dialog presents standardized selection options for Category and Priority.
3.  User fills in the task details and submits.
4.  **Result:** The task is created and displayed. The dialog closes. The "Create" button is only enabled when valid data is entered.

## 3. Functional Requirements

### 3.1. Data Consistency
- **REQ-1:** The application must correctly map and display all task properties received from the server using the following standardized mappings:
    - `dueDate` → `due_date`
    - `createdAt` → `created_at`
    - `updatedAt` → `updated_at`
    - `completed` → `status` (converted to "completed" state)
    - `category` → `category_name` / `category_id`
- **REQ-2:** Task status must be accurately reflected as "Pending", "In Progress", or "Completed" in the UI.

### 3.2. User Interface Standards
- **REQ-3:** The "New Task" dialog must utilize the application's standard UI components (Select menus) for consistency.
- **REQ-4:** The "New Task" dialog must prevent submission of incomplete tasks (e.g., missing title).

### 3.3. System Stability & Performance
- **REQ-5:** The application must suspend data fetching operations until the user's authentication session is confirmed to prevent unauthorized access errors.
- **REQ-6:** The application must handle transient authentication states gracefully without displaying error alerts to the user.

### 3.4. Error Handling
- **REQ-7:** If session validation fails or a 401 error persists, the application must display a "Session Expired" notification and redirect the user to the login page.

## 4. Success Criteria

- **SC-1:** Dashboard loads successfully for all authenticated users.
- **SC-2:** Tasks created via Chatbot are immediately visible and interactable.
- **SC-3:** The "New Task" dialog functions correctly and matches the visual style of the rest of the application.
- **SC-4:** No "Unauthorized" or data-access errors are reported during normal navigation.

## 5. Assumptions & Constraints

- **Constraint:** The Frontend must adapt to the Backend's existing data format (which uses `snake_case` conventions) to ensure compatibility.
- **Constraint:** UI components must use the existing design library (Shadcn UI).
- **Assumption:** The Backend API endpoints for creating and retrieving tasks are functional.
