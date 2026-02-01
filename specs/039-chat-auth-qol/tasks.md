# Tasks: Chat System & Authentication QOL

## Phase 1: Foundational Auth Hardening

- [X] T001 Update Backend Authentication in `todo-hackathon3/app/api/routes/auth.py`
- [X] T001.1 [US1] Create `tests/sanity_auth.py` to verify cookie deletion headers per Constitution V

## Phase 2: [US1] Secure Sign Out (Priority: P1)

**Story Goal**: Allow users to securely sign out and display their profile in the header.
**Independent Test**: Log in, click "Sign Out" in the new UserNav, verify redirection to `/sign-in` and deletion of `session_token` cookie.

- [X] T002 [P] [US1] Create User Navigation component in `frontend/components/dashboard/user-nav.tsx` (Ensure explicit state clearing on logout)
- [X] T003 [US1] Integrate `UserNav` into the Dashboard Header in `frontend/components/dashboard/header.tsx`

## Phase 3: [US2] AI Chat Assistance (Priority: P2)

**Story Goal**: Provide a floating AI chat assistant on the dashboard.
**Independent Test**: Open the chat widget, send a message, and receive an AI response. Verify history loads on re-open.

- [X] T004 [P] [US2] Create Chat Widget component in `frontend/components/dashboard/chat-widget.tsx` (Include FR-013 auto-reconnect logic)
- [X] T004.1 [US2] Create temporary sanity check script to verify chat endpoint reachability per Constitution V
- [X] T005 [P] [US2] Create Chat Wrapper component in `frontend/components/dashboard/client-chat-wrapper.tsx`
- [X] T006 [US2] Integrate `ClientChatWrapper` into the Dashboard Layout in `frontend/app/dashboard/layout.tsx`

## Phase 4: [US3] Real-time Task Updates (Priority: P3)

**Story Goal**: Ensure the dashboard reflects changes made by the AI immediately.
**Independent Test**: Ask the AI to "add a task", verify the task appears in the `TaskList` without a manual page refresh.

- [X] T007 [US3] Verify `router.refresh()` integration in `frontend/components/dashboard/client-chat-wrapper.tsx`

## Phase 5: Polish & Verification

- [X] T008 Perform final build and cross-domain authentication verification

## Implementation Strategy
- **MVP First**: Complete Phase 1 and 2 to stabilize authentication and provide sign-out.
- **Incremental Delivery**: Phase 3 and 4 deliver the chat experience and its integration with the task list.

## Dependencies
- US2 depends on T001 (Backend hardening).
- US3 depends on US2 implementation.

## Parallel Execution Examples
- T002 (UserNav) and T004 (ChatWidget) can be developed in parallel as they touch different frontend files.
- T001 (Backend) and T002 (Frontend) can be started in parallel, though T002 requires T001 for end-to-end testing.
