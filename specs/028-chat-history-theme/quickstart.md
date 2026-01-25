# Quickstart: Chat History & Theming

**Feature**: `028-chat-history-theme`

## Prerequisites
- Backend running on `http://localhost:7860` (or configured port)
- Frontend running on `http://localhost:3000`
- Database initialized with `Conversation` and `Message` tables

## Testing Manual
1. **Send Message**: Open dashboard, type "Hello", send.
2. **Reload**: Refresh the page.
3. **Verify**: The "Hello" message and assistant response should reappear.
4. **Theme**: Toggle Dark Mode. Chat widget should turn dark gray/black.

## Verification Script
Run `python tests/sanity_chat.py` to verify the backend endpoint independently.
