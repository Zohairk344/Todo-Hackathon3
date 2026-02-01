# Quickstart: Dashboard Session Integration

## Development Setup

1. **Start the Backend**:
   Ensure the Python backend is running (typically on port 8000).
   ```bash
   cd todo-hackathon3
   source venv/bin/activate
   python main.py
   ```

2. **Start the Frontend**:
   Ensure the Next.js frontend is running (typically on port 3000).
   ```bash
   cd frontend
   npm run dev
   ```

## Verification Steps

1. **Unauthenticated Access**:
   - Clear your browser cookies for `localhost`.
   - Navigate to `http://localhost:3000/dashboard`.
   - **Expected Result**: You should be immediately redirected to `http://localhost:3000/sign-in?callbackUrl=/dashboard`.

2. **Authenticated Access**:
   - Sign in at `http://localhost:3000/sign-in`.
   - Navigate to the dashboard.
   - **Expected Result**: The navigation bar should show your registered email and name instead of "user@example.com".

3. **Chatbot Task Creation**:
   - Open the chatbot in the dashboard.
   - Ask it to "Add a task to test session".
   - **Expected Result**: The task should be added successfully without any "IntegrityError" in the browser console or backend logs.

4. **Production Build**:
   - Run `npm run build` in the `frontend` directory.
   - **Expected Result**: The build should complete successfully without type errors.
