---
id: "0001"
title: "create-stateless-auth-spec"
stage: "spec"
date: "2026-01-25"
surface: "agent"
model: "gemini-2.0-flash"
feature: "038-stateless-auth-fix"
branch: "038-stateless-auth-fix"
user: "zohair"
command: "/sp.specify Refactor Backend Auth to Stateless Pattern"
labels: ["auth", "stateless", "fastapi", "refactor"]
links:
  spec: "specs/038-stateless-auth-fix/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - specs/038-stateless-auth-fix/spec.md
  - specs/038-stateless-auth-fix/checklists/requirements.md
tests:
  - "null"
---

## Prompt

# CRITICAL BUG FIX: Refactor Backend Auth to Stateless Pattern ## Context The application is currently crashing on startup with `NameError: name 'AuthConfig' is not defined` in `backend/app/core/auth.py` and import errors in `backend/app/api/routes/auth.py`. This is caused by legacy code trying to manage authentication state/cookies, which violates our Phase 2/3 architecture. ## Architecture Constraints (Hackathon Phase II & III) According to the Hackathon specs: 1. **Frontend (Next.js + Better Auth)** is the sole authority for user signup/login and token issuance. 2. **Backend (FastAPI)** must be STATELESS. It must NOT handle user signup, login routes, or cookie management. 3. **Verification**: The backend must only verify the `Authorization: Bearer <token>` header using the shared `BETTER_AUTH_SECRET`. ## Requirements 1. **Refactor `backend/app/core/auth.py`**: - Remove all `AuthConfig` and `CookieAttributes` classes. - Implement a simple `verify_token(token)` function that decodes the JWT using `BETTER_AUTH_SECRET` and `HS256` algorithm. - Implement a `get_current_user` dependency that extracts the user ID from the token payload. - Ensure `pyjwt` is installed and used for decoding. 2. **Clean up `backend/app/api/routes/auth.py`**: - Remove this file or comment out all code inside it. The backend should not have `/auth/login` or `/auth/signup` endpoints; these exist only on the Next.js frontend. - Remove the inclusion of this router in `backend/app/main.py`. 3. **Verification & Testing**: - Create a standalone test script `backend/tests/repro_auth.py`. - The script must simulate a valid JWT signing (using the secret) and then call the `verify_token` function to prove it returns the correct payload. - The script must also verify that `verify_token` raises an HTTPException for expired/invalid tokens. ## Acceptance Criteria - [ ] Application starts successfully with `uvicorn main:app --reload`. - [ ] `backend/app/core/auth.py` contains NO references to `AuthConfig`. - [ ] `backend/tests/repro_auth.py` passes successfully when run with `python -m tests.repro_auth`.

## Response snapshot

I have created the feature specification for the Stateless Backend Authentication Refactor. 
The specification defines the user scenarios, functional requirements, and success criteria for removing stateful authentication logic from the backend and implementing a stateless JWT verification pattern aligned with the project's Phase 2/3 architecture. 
I also created a quality checklist and validated the specification against it.

## Outcome

- ✅ Impact: Established clear requirements for refactoring backend auth to a stateless pattern, fixing startup crashes and aligning with architectural constraints.
- 🧪 Tests: N/A (Specification phase)
- 📁 Files: Created `specs/038-stateless-auth-fix/spec.md` and `specs/038-stateless-auth-fix/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The spec was successfully refined to be technology-agnostic in its core descriptions while ensuring that the critical "stateless" requirement and "trusted authority" model were clearly captured.

## Evaluation notes (flywheel)

- Failure modes observed: Shell escaping issues during branch creation script execution.
- Graders run and results (PASS/FAIL): PASS (Manual review)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Improve shell escaping for long multiline descriptions in scripts.