---
id: 003
title: Generate Tasks for Cascade Delete Fix
stage: tasks
date: 2026-01-13
surface: agent
model: gemini
feature: fix-cascade-delete
branch: 021-fix-cascade-delete
user: zohair
command: /sp.tasks
labels: ["tasks", "bugfix", "database"]
links:
  spec: specs/021-fix-cascade-delete/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/021-fix-cascade-delete/tasks.md
tests:
 - manual task validation
---

## Prompt

Break down Feature: Implement Cascade Deletion & Fix Appearance Sync into atomic coding tasks. # Group 1: Database Integrity (backend/app/models.py) * T-7001: Implement Hard Cascading Deletes * Objective: Ensure deleting a user automatically wipes all associated data at the SQL level. * Action: Update the user_id field in Session, Account, Task, and Category classes. * Constraint: The sa_column definition MUST include ondelete="CASCADE". * Example: user_id: str = Field(sa_column=Column("userId", ForeignKey("user.id", ondelete="CASCADE"))) * Action: Update User class Relationship attributes to include sa_relationship_kwargs={"cascade": "all, delete"}. * T-7002: Add Appearance Fields to User Model * Objective: Allow the database to store user preferences. * Action: Add the following optional fields to the User class: * theme: Optional[str] = Field(default="system") * font_size: Optional[str] = Field(default="medium", sa_column=Column("fontSize", Text)) * Action: Update UserPublic and UserUpdate schemas to include these fields so the frontend can send/receive them. # Group 2: API Route Logic (backend/app/api/users.py) * T-7003: Update User Profile Route (PATCH /me) * Objective: Ensure appearance settings are saved when the user changes them. * Action: Locate the update_user_me endpoint. * Logic: Ensure it checks for theme and font_size in the request body and updates the current_user object. * Logic: Use the Naive UTC standard for updated_at: user.updated_at = datetime.now(timezone.utc).replace(tzinfo=None). * T-7004: Verify Delete Account Route (DELETE /me) * Objective: Confirm the endpoint is calling the correct deletion sequence. * Action: Ensure it uses await session.delete(current_user) followed by await session.commit(). # Group 3: Verification * T-7005: Schema Integrity Check * Action: Verify all new fields in models.py have appropriate Pydantic aliases if they use camelCase in the DB (e.g., fontSize -> font_size). Generate these tasks.

## Response snapshot

Generated actionable tasks in `specs/021-fix-cascade-delete/tasks.md`. The tasks cover updating the database schema for cascading deletes, adding appearance fields to the User model, updating API routes to handle these changes, and verifying integrity.

## Outcome

- ✅ Impact: Provided detailed steps to fix account deletion and appearance sync.
- 🧪 Tests: N/A.
- 📁 Files: `tasks.md`.
- 🔁 Next prompts: `/sp.implement`.
- 🧠 Reflection: Combining database constraint updates with API logic simplification ensures a robust fix.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.