---
id: 004
title: Generate Tasks for User Defaults Fix
stage: tasks
date: 2026-01-18
model: gemini-2.0-flash-exp
feature: 022-fix-user-defaults
user: user
labels: [tasks, user-defaults, bugfix]
files:
  - specs/022-fix-user-defaults/tasks.md
tests: []
links:
  spec: specs/022-fix-user-defaults/spec.md
  plan: specs/022-fix-user-defaults/plan.md
---

# User Request

Context for task generation: Break down **Feature: Fix User Creation Null Constraints** into atomic coding tasks for `backend/app/models.py`. # Group 1: Model Schema Correction * **T-8001: Make Appearance Fields Nullable in User Model** * **Objective:** Allow User creation via Better-Auth by permitting NULL values for theme and font settings in the database. * **Target File:** `backend/app/models.py` * **Action (Theme):** * **FROM:** `theme: Optional[str] = Field(default="system")` (or any existing definition) * **TO:** `theme: Optional[str] = Field(default="system", sa_column=Column("theme", Text, nullable=True))` * **Action (Font Size):** * **FROM:** `font_size: Optional[str] = Field(default="medium", sa_column=Column("fontSize", Text))` * **TO:** `font_size: Optional[str] = Field(default="medium", sa_column=Column("fontSize", Text, nullable=True))` * **Constraint:** Ensure `Text` and `Column` are correctly imported from `sqlalchemy`. * **Logic Check:** By explicitly adding `nullable=True`, the SQL generated for table creation will no longer include the `NOT NULL` constraint that is currently causing the crash. Generate this task.

# Assistant Response

Generated `specs/022-fix-user-defaults/tasks.md` with:
- **Phase 1: Setup**: Check existing model.
- **Phase 3: Implementation**:
    - T002: Update `theme` field to be nullable.
    - T003: Update `font_size` field to be nullable.
- **Phase 4: Verification**: Verify backward compatibility.
- **Phase 5: Polish**: Linting.

Action items correspond to the user's requested T-8001 but split for clarity and tracking.
