---
id: 0001
title: fix-dashboard-auth-spec
stage: spec
date: 2026-02-02
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 042-dashboard-auth-fix
branch: 042-dashboard-auth-fix
user: zohair
command: sp.specify
labels: ["auth", "spec", "dashboard"]
links:
  spec: specs/042-dashboard-auth-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/042-dashboard-auth-fix/spec.md
 - specs/042-dashboard-auth-fix/checklists/requirements.md
tests: []
---

## Prompt

**The Mission:** Fix the `401 Unauthorized` errors when creating tasks and categories by enforcing `credentials: "include"` on all API requests. **The Context:** * **Current State:** The `AuthContext` successfully logs in, but the Dashboard components (Task List, Category Creator) are making independent `fetch` requests that fail to send the session cookie. * **The Problem:** The backend logs show `No authentication token provided` for `/tasks` and `/categories` endpoints, confirming the cookie is missing from these specific requests. * **Secondary Issue:** The logs also show some requests still going to `/api/current-user/chat`, which implies we need to double-check the Chat Widget's integration to ensure it's using the live User ID. **Key Technical Requirements:** 1. **Create `frontend/lib/api-client.ts`:** * A reusable `fetchWithAuth` function. * Automatically adds `credentials: "include"` to every request. * Automatically handles `Content-Type: application/json`. 2. **Refactor Dashboard Data Fetching:** * Update the component responsible for fetching tasks (likely `frontend/components/dashboard/task-view.tsx` or `page.tsx`) to use this new helper. * Update the Category creation logic to use the helper. 3. **Verify Chat Integration:** * Ensure `ClientChatWrapper` is correctly passing the user ID. **Success Criteria:** * Creating a category works (200 OK). * Creating a task works (200 OK). * No more `401` errors in the browser console.

## Response snapshot

Created feature branch `042-dashboard-auth-fix`.
Generated `specs/042-dashboard-auth-fix/spec.md` translating technical requirements into functional specs.
Validated spec using `specs/042-dashboard-auth-fix/checklists/requirements.md`.
Spec is complete and ready for planning.

## Outcome

- ✅ Impact: Defined requirements for fixing 401 errors in dashboard.
- 🧪 Tests: N/A
- 📁 Files: Created spec.md and checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Straightforward spec creation based on detailed user requirements.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None