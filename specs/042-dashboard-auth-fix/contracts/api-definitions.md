# API Contracts: Todo Service

**Feature Branch**: `042-dashboard-auth-fix`
**Created**: 2026-02-02
**Status**: Draft

## Overview
These contracts define the expected backend behavior that the `todo-service.ts` will rely on.

## Endpoints

### 1. Get Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Headers**:
    - `Authorization`: `Bearer <token>` (optional if cookie used)
    - `Cookie`: `better-auth.session_token=<token>` (Required for browser)
- **Response (200 OK)**:
    ```json
    [
      {
        "id": "uuid",
        "title": "Task 1",
        "is_completed": false,
        "category_id": "uuid",
        "user_id": "uuid",
        "created_at": "ISO-8601"
      }
    ]
    ```
- **Response (401 Unauthorized)**:
    ```json
    { "detail": "Unauthorized" }
    ```

### 2. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`, `Cookie: ...`
- **Body**:
    ```json
    {
      "title": "New Task",
      "category_id": "uuid" // Optional
    }
    ```
- **Response (200 OK)**: Returns created Task object.

### 3. Get Categories
- **URL**: `/categories`
- **Method**: `GET`
- **Headers**: `Cookie: ...`
- **Response (200 OK)**:
    ```json
    [
      {
        "id": "uuid",
        "name": "Work",
        "color": "#FF0000",
        "user_id": "uuid"
      }
    ]
    ```

### 4. Create Category
- **URL**: `/categories`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`, `Cookie: ...`
- **Body**:
    ```json
    {
      "name": "Work",
      "color": "#FF0000"
    }
    ```
- **Response (200 OK)**: Returns created Category object.
