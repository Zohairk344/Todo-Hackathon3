---
id: 0001
title: spec-chat-auth-qol
stage: spec
date: 2026-02-01
surface: agent
model: gemini-2.0-flash-exp
feature: 039-chat-auth-qol
branch: 039-chat-auth-qol
user: User
command: /sp.specify
labels: ["spec", "chat", "auth", "qol"]
links:
  spec: specs/039-chat-auth-qol/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/039-chat-auth-qol/spec.md
 - specs/039-chat-auth-qol/checklists/requirements.md
tests:
 - null
---

## Prompt

/sp.specify

**Feature Specification: Chat System & Authentication QOL**
**1. Backend Changes (`backend/app/api/routes/auth.py`)**
* **Goal:** Allow users to securely sign out and ensure the session cookie is removed.
* **New Endpoint:** `POST /api/auth/sign-out`
* **Logic:** Receives the response object and calls `delete_cookie("session_token")`.
* **Security:** Must set `secure=True`, `httponly=True`, and `samesite="none"` to match the creation settings.
* **Schema Consistency:** Ensure all auth endpoints (`sign-in`, `sign-up`, `get-session`) return the unified `{ session, user }` structure (including `image` and `emailVerified` fields) to prevent frontend validation errors.

**2. Frontend Components (`frontend/components/dashboard/`)**
* **`chat-widget.tsx` (New):**
* **UI:** Floating action button (FAB) that expands into a chat window.
* **Logic:**
* Fetches chat history on open (`GET /api/{userId}/chat`).
* Sends new messages (`POST /api/{userId}/chat`).
* **Critical:** Uses `credentials: "include"` in all `fetch` calls to pass the HttpOnly cookie to the backend.
* **State:** Handles loading states, optimistic UI updates, and auto-scrolling.
* **`client-chat-wrapper.tsx` (New):**
* **Goal:** A lightweight wrapper to use `useRouter`.
* **Logic:** Passes a callback `onTasksChange={() => router.refresh()}` to the widget, ensuring the Dashboard updates immediately when the AI adds a task.
* **`user-nav.tsx` (New):**
* **UI:** A simple dropdown or button group for the Header.
* **Logic:** Displays the user's name/email and provides a **Sign Out** button that calls the new backend endpoint and redirects to `/sign-in`.

**3. Integration Plan**
* The `ClientChatWrapper` will be mounted in `frontend/app/dashboard/layout.tsx` (already planned).
* The `UserNav` component is ready to be imported into `frontend/components/dashboard/Header.tsx` manually by the user.

**Verify:**
1. Does the `sign-out` logic handle cross-domain cookies correctly? (Yes, by using `samesite="none"`).
2. Does the chat widget handle connection errors gracefully? (Yes, via local error state).

## Response snapshot

Created feature `039-chat-auth-qol` and generated specification.
- Defined user stories for Secure Sign Out, AI Chat Assistance, and Real-time Updates.
- Established technology-agnostic functional requirements for secure auth handling and chat integration.
- Validated spec against quality checklist (all passed).
- Created branch and directory structure.

## Outcome

- ✅ Impact: Established clear requirements for chat and auth improvements.
- 🧪 Tests: Defined independent test scenarios for each user story.
- 📁 Files: specs/039-chat-auth-qol/spec.md, specs/039-chat-auth-qol/checklists/requirements.md
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Translated highly technical input into business-focused requirements while maintaining scope.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null