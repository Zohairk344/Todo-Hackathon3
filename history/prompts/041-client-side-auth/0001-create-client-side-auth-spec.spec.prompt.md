---
id: 0001
title: Create Client-Side Auth Spec
stage: spec
date: 2026-02-01
surface: agent
model: gemini-2.0-flash-exp
feature: 041-client-side-auth
branch: 041-client-side-auth
user: zohair
command: /sp.specify
labels: ["auth", "redirect-loop", "spec"]
links:
  spec: specs/041-client-side-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/041-client-side-auth/spec.md
 - specs/041-client-side-auth/checklists/requirements.md
tests:
 - none
---

## Prompt

**The Mission:** Resolve the critical "Redirect Loop" where authenticated users are repeatedly sent back to the Sign-In page despite successful login. We must refactor the application to support **Cross-Domain Client-Side Authentication**. **The Context:** * **The Architecture:** The frontend is deployed on Vercel, while the backend is hosted on Hugging Face (`hf.space`). * **The Problem:** Currently, `DashboardLayout` attempts to validate the session **server-side** (using Next.js `cookies()`). This fails because the Vercel server cannot access the HttpOnly cookies set for the Hugging Face domain. * **The Result:** The server sees no session, assumes the user is unauthenticated, and triggers a `redirect('/sign-in')`, creating an infinite loop. * **The Solution:** We must move the session validation to the **Client (Browser)**. The browser *does* hold the correct cookies for the backend domain and can successfully validate the session via a fetch request with `credentials: "include"`. **Key Technical Requirements:** 1. **Implement `AuthProvider` (Context API):** * Create a global React Context (`AuthContext`) that manages authentication state (`user` object and `loading` boolean). * On component mount (`useEffect`), it must fetch `/api/auth/get-session` with `credentials: "include"`. * **Loading State:** Render a full-screen loading spinner while validating to prevent content flashing. * **Redirect Logic:** If the API returns 401/403 or fails, automatically redirect the user to `/sign-in`. 2. **Refactor `DashboardLayout`:** * Remove all server-side logic (`async/await`, `cookies()`, `getUserSession`). * Wrap the dashboard content in the new `AuthProvider` to ensure all child components have access to the session. 3. **Update Dependent Components:** * **`UserNav`:** Must consume `useAuth()` to display the user's name and email, removing any internal fetch logic. * **`ClientChatWrapper`:** Must consume `useAuth()` to get the `userId` for the chatbot, ensuring tasks are saved to the correct user account. **Success Criteria:** * Users can access `/dashboard` immediately after sign-in without being redirected. * The Dashboard UI displays the correct user email (replacing placeholders). * The Chatbot functions correctly (no `IntegrityError`) because it receives a valid `userId` from the context.

## Response snapshot

Created feature branch 041-client-side-auth, drafted comprehensive specification for client-side authentication fix, and validated with quality checklist.

## Outcome

- ✅ Impact: Established a clear path to resolve the redirect loop through client-side session validation.
- 🧪 Tests: None (Spec phase)
- 📁 Files: Created spec.md and requirements.md checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Moving session validation to the client is the only viable path given the cross-domain HttpOnly cookie constraints between Vercel and Hugging Face.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Implementation of AuthProvider