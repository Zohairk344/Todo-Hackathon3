# Implementation Plan - Stateless Authentication Repair

Repair core authentication logic by removing broken session code and implementing standard JWT-based stateless authentication.

## Proposed Changes

### Backend (todo-hackathon3)

#### 1. Dependencies
- Update `requirements.txt` to include `python-jose`, `passlib`, `bcrypt==4.0.1` (downgraded for compatibility), and `email-validator`.

#### 2. Authentication Core
- Overwrite `app/core/auth.py` with a clean JWT token generator using `jose`.
- Handle fallback for `BETTER_AUTH_SECRET` to prevent crashes.

#### 3. Security Utilities
- Overwrite `app/core/security.py` with `passlib` context for password hashing and verification.

### Backend (todo-hackathon3) - Connection Stability

#### 4. Database Connection
- Update `app/db.py` to enable `pool_pre_ping` and `pool_recycle` to handle idle connection drops by Neon/Supabase.

## Verification Plan

### Automated Tests
- Restart backend server and verify it doesn't crash.
- (Optional) Use `check_tz.py` if relevant or create a small test script to verify JWT generation.

### Manual Verification
- Check Hugging Face build logs after push.
