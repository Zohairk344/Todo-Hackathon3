---
id: "0001"
title: "create-task-dashboard-enhancements-spec"
stage: "spec"
date: "2026-02-06"
surface: "agent"
model: "gemini-2.0-flash"
feature: "048-task-enhancements"
branch: "048-task-enhancements"
user: "zohair"
command: "/sp.specify **The Mission:** Fix the \"Method Not Allowed\" (405) error when updating tasks, complete the \"Create Task\" form by adding a Due Date picker, wire up the \"Create Category\" shortcut, and enrich the Task Card UI to show full details (Description, Priority, Due Date, Category)."
labels: ["spec", "tasks", "ui", "bug-fix"]
links:
  spec: "specs/048-task-enhancements/spec.md"
  ticket: null
  adr: null
  pr: null
files:
 - specs/048-task-enhancements/spec.md
 - specs/048-task-enhancements/checklists/requirements.md
tests:
 - none
---

## Prompt

**The Mission:** Fix the "Method Not Allowed" (405) error when updating tasks, complete the "Create Task" form by adding a Due Date picker, wire up the "Create Category" shortcut, and enrich the Task Card UI to show full details (Description, Priority, Due Date, Category). **The Context:** * **Critical Bug (405 Error):** The Frontend is sending a `PATCH` request to update task status, but the Backend (FastAPI) is rejecting it. This usually means the Backend route is defined as `@router.put` instead of `@router.patch`. * **Missing Features:** Users cannot set a deadline (`due_date`) when creating a task. * **Broken UX:** The "+" button next to the Category dropdown does nothing. It needs to switch the user from the Task Dialog to the Category Dialog. * **Sparse UI:** The Task Dashboard only shows titles. The user wants to see the Description, Priority, Category, and Due Date at a glance. **Key Technical Requirements:** 1. **Backend Fix (`backend/app/api/routes/tasks.py`):** * Locate the `update_task` endpoint. * **Change the decorator** from `@router.put` to `@router.patch` to match the Frontend's expectation and standard REST practices for partial updates. * Ensure the function accepts `TaskUpdate` (partial fields) rather than `TaskCreate` (all fields required). 2. **Frontend: Add Due Date (`frontend/components/dashboard/new-task-dialog.tsx`):** * Add a new state variable: `const [dueDate, setDueDate] = useState("")`. * Add a standard HTML date input `<Input type="date" ... />` to the form. * Include `due_date` in the payload sent to `onConfirm`. Note: Backend likely expects ISO string or `YYYY-MM-DD`. 3. **Frontend: Wire "+" Button (`frontend/app/dashboard/page.tsx` & `new-task-dialog.tsx`):** * **In `DashboardPage`:** Pass a new prop `onAddCategoryClick` to `NewTaskDialog`. * **Logic:** `onAddCategoryClick={() => { setIsTaskModalOpen(false); setIsCategoryModalOpen(true); }}`. This closes the task modal and opens the category modal instantly. * **In `NewTaskDialog`:** Bind the `+` button's `onClick` to this new prop. 4. **Frontend: Enrich Task Card (`frontend/components/dashboard/task-view.tsx`):** * Update the card layout to display: * **Description:** A text block below the title (truncate if too long). * **Due Date:** A small calendar icon + date (e.g., "Oct 24"). * **Priority:** A colored Badge (High=Red, Medium=Yellow, Low=Green/Gray). * **Category:** A colored text/badge using the Category's hex code. **Testing & Verification Plan (CLI):** * **Backend Route Check:** Verify `backend/app/api/routes/tasks.py` explicitly uses `PATCH`. * **Build Verification:** Run `npm run build` to ensure the new props (`onAddCategoryClick`) don't cause type errors. * **Network Prediction:** * *Before:* `PATCH /tasks/3` -> `405 Method Not Allowed`. * *After:* `PATCH /tasks/3` -> `200 OK` (Status updates successfully). **Success Criteria:** * Marking a task as "Complete" works instantly without errors. * The "Create Task" popup allows selecting a date. * Clicking the "+" icon opens the "Create Category" dialog. * The Dashboard cards look rich and informative, not empty.

## Response snapshot

Created feature branch 048-task-enhancements, generated specification at specs/048-task-enhancements/spec.md, and validated quality with checklist at specs/048-task-enhancements/checklists/requirements.md.

## Outcome

- ✅ Impact: High - Defines the requirements for fixing a critical bug and enhancing core dashboard UX.
- 🧪 Tests: n/a (Specification phase)
- 📁 Files: Created spec.md and requirements checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: The user provided a very technical description. I translated this into a business-focused specification while ensuring all technical constraints were captured in the functional requirements.

## Evaluation notes (flywheel)

- Failure modes observed: Shell escaping issues when passing the full mission text to the create-new-feature script.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Use a file to pass large text blocks to shell scripts if possible, or use simplified titles for script execution and fill details manually.