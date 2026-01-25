# Quickstart: Task Schema Verification

## Verification Steps

1.  **Start Server**: Run the backend server using `uvicorn`.
2.  **API Call**: Attempt to create a task with a due date using `curl` or a REST client.
    ```bash
    curl -X POST http://localhost:7860/api/{user_id}/tasks \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer {token}" \
      -d '{"title": "Verify Schema", "due_date": "2026-01-13T12:00:00"}'
    ```
3.  **Expected Result**: The server should return `201 Created` and the task should be successfully saved in the database.