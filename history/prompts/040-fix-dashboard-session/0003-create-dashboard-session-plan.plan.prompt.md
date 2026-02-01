---
id: "0003"
title: "create dashboard session plan"
stage: "plan"
date: "2026-02-01"
surface: "agent"
model: "gemini-2.0-flash"
feature: "040-fix-dashboard-session"
branch: "040-fix-dashboard-session"
user: "zohair"
command: "/sp.plan"
labels: ["planning", "dashboard", "auth", "ssr"]
links:
  spec: "specs/040-fix-dashboard-session/spec.md"
  plan: "specs/040-fix-dashboard-session/plan.md"
  ticket: null
  adr: null
  pr: null
files:
  - specs/040-fix-dashboard-session/plan.md
  - specs/040-fix-dashboard-session/research.md
  - specs/040-fix-dashboard-session/data-model.md
  - specs/040-fix-dashboard-session/quickstart.md
  - specs/040-fix-dashboard-session/contracts/get-session.json
tests:
  - Constitution Check
---

## Prompt

/sp.plan

**Goal:**
Refactor the Dashboard Layout to replace hardcoded mock data with active server-side session authentication. This is critical to resolving the `ForeignKeyViolationError` in the chatbot and securing the dashboard route.

**Architecture & Logic Flow:**
1.  **Server-Side Fetching (Next.js App Router):**
    * We will leverage the `async/await` capabilities of Next.js Server Components in `layout.tsx`.
    * We cannot use client-side hooks (like `useEffect`) for the initial session check because we need the data *before* rendering to prevent layout thrashing and to handle redirects securely.

2.  **The `getUserSession` Helper:**
    * We need a dedicated helper function within the file that:
        * Extracts the `session_token` from `next/headers` cookies.
        * Calls the backend `/api/auth/get-session` endpoint (internally passing the cookie header).
        * Returns the `User` object if valid, or `null` if invalid/error.

3.  **Route Protection:**
    * If `getUserSession` returns `null`, we must immediately trigger a `redirect("/sign-in")`. This acts as a route guard.

4.  **Component Wiring:**
    * The fetched `user` object will serve as the source of truth.
    * **UserNav:** Receives `user.email` and `user.name` (Display fix).
    * **ClientChatWrapper:** Receives `user.id` (Database Integrity fix).

**Proposed File Changes:**

* **Update:** `frontend/app/dashboard/layout.tsx`
    * **Change:** Convert default export to `async function`.
    * **Add:** Import `cookies` from `next/headers` and `redirect` from `next/navigation`.
    * **Add:** `getUserSession` implementation.
    * **Modify:** Replace `const mockUser = ...` with real session logic.

## Response snapshot

Generated a comprehensive implementation plan for the Dashboard Session Integration. The plan includes a technical summary, detailed research findings on the backend `/api/auth/get-session` endpoint, a refined data model, and API contracts. The architecture leverages Next.js Server Components for secure session validation and data propagation. Updated the agent context with relevant technologies.

## Outcome

- ✅ Impact: High - Provides a solid technical foundation for fixing authentication and database integrity issues.
- 🧪 Tests: Constitution checks passed.
- 📁 Files: Created `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and `contracts/get-session.json`.
- 🔁 Next prompts: `/sp.tasks`
- 🧠 Reflection: Researching the backend route was crucial as it revealed the specific response structure required for correct data extraction in the frontend.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Break down the plan into granular tasks.