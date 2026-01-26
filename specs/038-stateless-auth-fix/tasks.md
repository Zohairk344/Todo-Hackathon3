# Tasks: Stateless Authentication Repair

## Phase 10: Repair Core Authentication Logic

- [X] **Task 1: Update Dependencies**
  - File: `todo-hackathon3/requirements.txt`
  - Action: Add `python-jose[cryptography]`, `passlib[bcrypt]`, and `bcrypt`.
- [X] **Task 2: Overwrite auth.py**
  - File: `todo-hackathon3/app/core/auth.py`
  - Action: Replace with clean token generation logic.
- [X] **Task 3: Overwrite security.py**
  - File: `todo-hackathon3/app/core/security.py`
  - Action: Replace with password hashing utilities.
- [X] **Task 4: Deploy Fix**
  - Action: Git add, commit, and push.

## Phase 11: Install Email Validator

- [X] **Task 5: Add email-validator to requirements**
  - File: `todo-hackathon3/requirements.txt`
  - Action: Add `email-validator` to the end.
- [X] **Task 6: Deploy Phase 11 Fix**
  - Action: Git add, commit, and push.

## Phase 12: Fix Library Compatibility (The Bcrypt Downgrade)

- [X] **Task 7: Downgrade bcrypt in requirements**
  - File: `todo-hackathon3/requirements.txt`
  - Action: Change `bcrypt` to `bcrypt==4.0.1`.
- [X] **Task 8: Deploy Phase 12 Fix**
  - Action: Git add, commit, and push.

## Phase 13: Stabilize Database Connection

- [X] **Task 9: Update app/db.py**
  - File: `todo-hackathon3/app/db.py`
  - Action: Overwrite with robust connection settings (`pool_pre_ping`, `pool_recycle`).
- [X] **Task 10: Deploy Phase 13 Fix**
  - Action: Git add, commit, and push.

## Phase 14: Fix Configuration Mapping

- [X] **Task 11: Update app/core/config.py**
  - File: `todo-hackathon3/app/core/config.py`
  - Action: Add `SQLALCHEMY_DATABASE_URI` property and `extra = "ignore"` to Config.
- [X] **Task 12: Deploy Phase 14 Fix**
  - Action: Git add, commit, and push.

## Phase 15: Switch to Async Database Engine

- [X] **Task 13: Update app/core/config.py**
  - File: `todo-hackathon3/app/core/config.py`
  - Action: Update `SQLALCHEMY_DATABASE_URI` to use `postgresql+asyncpg://`.
- [X] **Task 14: Update app/db.py**
  - File: `todo-hackathon3/app/db.py`
  - Action: Refactor to use `create_async_engine` and proper async session factory.
- [X] **Task 15: Deploy Phase 15 Fix**
  - Action: Git add, commit, and push.

## Phase 16: Force Async Driver in Config

- [X] **Task 16: Update config.py logic**
  - File: `todo-hackathon3/app/core/config.py`
  - Action: Update `SQLALCHEMY_DATABASE_URI` to catch both `postgres://` and `postgresql://` and force `postgresql+asyncpg://`.
- [X] **Task 17: Deploy Phase 16 Fix**
  - Action: Git add, commit, and push.

## Phase 17: Clean Database URL for AsyncPG

- [X] **Task 18: Update app/core/config.py to strip sslmode**
  - File: `todo-hackathon3/app/core/config.py`
  - Action: Update `SQLALCHEMY_DATABASE_URI` to remove `sslmode` query parameter.
- [X] **Task 19: Deploy Phase 17 Fix**
  - Action: Git add, commit, and push.

## Phase 18: Aggressive Database URL Cleaning

- [X] **Task 20: Update config.py to strip multiple unsupported params**
  - File: `todo-hackathon3/app/core/config.py`
  - Action: Update `SQLALCHEMY_DATABASE_URI` to remove `sslmode`, `channel_binding`, and `gssencmode`.
- [X] **Task 21: Deploy Phase 18 Fix**
  - Action: Git add, commit, and push.