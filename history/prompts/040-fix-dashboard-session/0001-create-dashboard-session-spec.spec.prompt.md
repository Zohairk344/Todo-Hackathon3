---
id: "0001"
title: "create dashboard session spec"
stage: "spec"
date: "2026-02-01"
surface: "agent"
model: "gemini-2.0-flash"
feature: "040-fix-dashboard-session"
branch: "040-fix-dashboard-session"
user: "zohair"
command: "/sp.specify"
labels: ["specification", "dashboard", "auth"]
links:
  spec: "specs/040-fix-dashboard-session/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - specs/040-fix-dashboard-session/spec.md
  - specs/040-fix-dashboard-session/checklists/requirements.md
tests:
  - Specification Quality Checklist
---

## Prompt

**The Mission:** Fix the `IntegrityError` in the Chatbot and the incorrect user information in the Dashboard UI by connecting the Dashboard Layout to the actual backend session. **The Context:** * **Current State:** The `DashboardLayout` (`frontend/app/dashboard/layout.tsx`) is currently using a hardcoded mock user object (`id: "current-user"`, `email: "user@example.com"`). * **The Problem:** 1. **Chatbot Crash:** When the chatbot tool tries to add a task, it uses the hardcoded ID `"current-user"`. The PostgreSQL database rejects this with a `ForeignKeyViolationError` because that ID does not exist in the `User` table. 2. **UI Data:** The user navigation bar displays placeholder data instead of the logged-in user's actual name and email. 3. **Security:** The dashboard route currently renders even if the user is not authenticated (though API calls might fail later). **Key Technical Requirements:** 1. **Server-Side Session Fetching:** * The `DashboardLayout` must use `next/headers` to retrieve the `session_token` cookie. * It must make a server-side `fetch` request to the backend endpoint `/api/auth/get-session` using that cookie. 2. **Data Propagation:** * **Success:** If the session is valid, extract the real `user` object from the response. Pass `user.id` to `<ClientChatWrapper />` (fixing the database error) and `user.name`/`user.email` to `<UserNav />` (fixing the UI). * **Failure:** If the session is missing or invalid, immediately redirect the user to `/sign-in`. 3. **Environment Handling:** * Ensure the fetch call uses the correct `NEXT_PUBLIC_API_URL`. **Success Criteria:** * The Dashboard UI displays the logged-in user's real email and name. * The Chatbot successfully adds tasks to the database without throwing an `IntegrityError` (because it is now using a valid UUID). * Unauthenticated users are redirected away from `/dashboard`. also run npm run build to make sure the frontend is ready to be pushed to github

## Response snapshot

Created a comprehensive feature specification for integrating the dashboard with the backend session. The spec includes user stories for authenticated access, chatbot task creation, and unauthenticated redirects. It also defines functional requirements for session retrieval, validation, and data propagation. The specification was validated against a quality checklist and is ready for the planning phase.

## Outcome

- ✅ Impact: High - Fixes a critical database error and implements proper session-based authentication for the dashboard.
- 🧪 Tests: Validated against Specification Quality Checklist.
- 📁 Files: Created `specs/040-fix-dashboard-session/spec.md` and `specs/040-fix-dashboard-session/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The provided technical requirements were exceptionally clear, allowing for a highly specific and actionable specification.

## Evaluation notes (flywheel)

- Failure modes observed: Initial PHR creation failed due to incorrect feature name format (missing number prefix).
- Graders run and results (PASS/FAIL): PASS (Manual validation)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Proceed to technical planning.