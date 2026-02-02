# Quickstart: Dashboard Auth Fix

**Feature Branch**: `042-dashboard-auth-fix`
**Created**: 2026-02-02

## Goal
Verify that the Dashboard (Tasks & Categories) loads correctly without 401 errors.

## Prerequisites
1. Backend running on port 7860.
2. Frontend running on port 3000.
3. User account created and logged in.

## Steps to Verify

1. **Login**: Go to `/login` and sign in.
2. **Navigate**: You should be redirected to `/dashboard`.
3. **Check Console**: Open DevTools > Console. Verify no red `401` errors appear on load.
4. **Create Task**:
   - Type "Test Task" in the input.
   - Click "Add".
   - Verify task appears in list immediately.
   - Verify network request to `/tasks` was 200 OK.
5. **Create Category**:
   - Open Category picker.
   - Create new category "Test Cat".
   - Verify it appears in the dropdown.
   - Verify network request to `/categories` was 200 OK.
6. **Chat**:
   - Open Chat widget.
   - Verify it loads without error.
