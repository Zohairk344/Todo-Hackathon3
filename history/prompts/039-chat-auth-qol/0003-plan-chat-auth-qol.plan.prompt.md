---
id: 0003
title: plan-chat-auth-qol
stage: plan
date: 2026-02-01
surface: agent
model: gemini-2.0-flash-exp
feature: 039-chat-auth-qol
branch: 039-chat-auth-qol
user: User
command: /sp.plan
labels: ["plan", "chat", "auth", "frontend", "backend"]
links:
  spec: specs/039-chat-auth-qol/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/039-chat-auth-qol/plan.md
 - specs/039-chat-auth-qol/research.md
 - specs/039-chat-auth-qol/data-model.md
 - specs/039-chat-auth-qol/contracts/api.yaml
tests:
 - null
---

## Prompt

/sp.plan

**Goal:** Implement a secure Chat System and Authentication Quality-of-Life features (Sign Out, User Menu) that work across Vercel (Frontend) and Hugging Face (Backend).

**Phase 1: Backend Auth Hardening (The Foundation)**
* **Target File:** `backend/app/api/routes/auth.py`
* **Objective:** Prevent schema validation errors and allow session clearing.
* **Step 1:** Update the `format_auth_response` helper function.
    * *Constraint:* It MUST return a JSON object with `session` and `user` keys.
    * *Constraint:* The `user` object MUST include `image: null` and `emailVerified: true` (fixes Frontend crash).
* **Step 2:** Implement the `POST /sign-out` endpoint.
    * *Logic:* Accept a `Response` object.
    * *Critical Security:* Call `response.delete_cookie("session_token")` with `secure=True`, `httponly=True`, and `samesite="none"`. (If `samesite` is missing, the cookie won't delete on cross-domain requests).

**Phase 2: Frontend Chat Components (The Feature)**
* **Target File:** `frontend/components/dashboard/chat-widget.tsx`
* **Objective:** A robust, floating chat interface.
* **Step 1:** Implement the UI (Floating Button -> Expandable Window).
* **Step 2:** Implement the Networking logic.
    * *Constraint:* Use `fetch` for all API calls.
    * *Constraint:* ALL `fetch` calls MUST include `credentials: "include"` (to pass the HttpOnly cookie).
    * *Constraint:* Use `process.env.NEXT_PUBLIC_API_URL` with a fallback to `"https://todo-hackathon3.hf.space"`.
    * *Constraint:* On load, fetch chat history. If 404/Error, fail silently (empty list) rather than crashing the widget.
* **Target File:** `frontend/components/dashboard/client-chat-wrapper.tsx`
* **Objective:** Connect the Chat Widget to Next.js Data Fetching.
* **Step 1:** Wrap `ChatWidget`.
* **Step 2:** Pass a callback `onTasksChange` that triggers `router.refresh()`. (This ensures the Task List updates instantly when the AI creates a task).

**Phase 3: Frontend User Navigation (The QOL)**
* **Target File:** `frontend/components/dashboard/user-nav.tsx`
* **Objective:** Allow users to view their profile info and log out.
* **Step 1:** Create a UI displaying the user's `name` and `email`.
* **Step 2:** Add a "Sign Out" button.
* **Step 3:** Implement `handleSignOut`.
    * *Logic:* Call `POST /api/auth/sign-out` (with credentials!).
    * *Logic:* On success (or error), redirect to `/sign-in` and force a refresh.

**Phase 4: Integration (The Final Link)**
* **Instruction:** The `ClientChatWrapper` will be manually added to `frontend/app/dashboard/layout.tsx` by the developer (or if the file exists, append it).
* **Instruction:** The `UserNav` component is ready for the developer to import into `Header.tsx`.

## Response snapshot

Generated Implementation Plan for Chat System & Auth QOL.
- **Backend**: Update `auth.py` for schema compliance and `sign-out` endpoint.
- **Frontend**: Create `ChatWidget`, `ClientChatWrapper`, and `UserNav` components.
- **Integration**: Manual steps for layout and header integration.
- **Artifacts**: Plan, Research, Data Model, API Contracts created.
- **Verification**: Defined specific checks for auth headers and chat connectivity.

## Outcome

- ✅ Impact: Clear roadmap for secure auth and chat integration.
- 🧪 Tests: Sanity checks defined in plan.
- 📁 Files: plan.md, research.md, data-model.md, contracts/api.yaml
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: User input provided high-fidelity plan details, minimizing invention risk.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null