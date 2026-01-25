---
description: "Actionable tasks for Implementing Cascade Deletion & Fix Appearance Sync"
---

# Tasks: Implement Cascade Deletion & Fix Appearance Sync

**Input**: Design documents from `/specs/021-fix-cascade-delete/`
**Prerequisites**: plan.md, spec.md, research.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable
- **[Story]**: US1 (Account Deletion), US2 (Schema Integrity)

## Phase 1: Setup

**Purpose**: Initial verification

- [ ] T001 Verify `todo-hackathon3/app/models.py` structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database Integrity Updates

- [ ] T7001 [US2] **Implement Hard Cascading Deletes**: Update `todo-hackathon3/app/models.py`. 
    - Add `ondelete="CASCADE"` to `ForeignKey` definitions for `Session.user_id`, `Account.user_id`, `Task.user_id`, and `Category.user_id`. 
    - Ensure `User` relationships include `cascade="all, delete"`.
- [ ] T7002 [US1] **Add Appearance Fields**: Add `theme` and `font_size` to `User` model in `todo-hackathon3/app/models.py` (if missing) and ensure they are in `UserUpdate`.

---

## Phase 3: User Story 1 - Graceful Account Deletion [US1]

**Goal**: Fix API Logic

- [ ] T7003 [P] [US1] **Update User Profile Route**: In `todo-hackathon3/app/api/users.py`, update `update_user_me` to handle `theme` and `font_size`, and use naive UTC for `updated_at`.
- [ ] T7004 [P] [US1] **Verify Delete Account Route**: In `todo-hackathon3/app/api/users.py`, simplify `delete_user_me` to just delete the user and commit, relying on DB cascade.

---

## Phase 4: User Story 2 - Database Schema Integrity [US2]

**Goal**: Verification

- [ ] T7005 [US2] **Verification Protocol**: Perform syntax check on modified files (`models.py`, `users.py`).
- [ ] T7006 [US2] **Schema Integrity Check**: Verify new fields use proper Pydantic aliases if mapped to camelCase DB columns.

---

## Final Phase: Polish

- [ ] T7007 Remove any unused imports in `users.py` resulting from the simplification.