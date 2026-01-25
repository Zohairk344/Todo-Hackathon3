# Research: Intelligent Chat Frontend

## Decisions

### 1. Component Architecture
* **Decision**: Use a single `ChatWidget.tsx` component that manages its own visibility state (`isOpen`) but relies on the parent for data refresh (`onTasksChange`).
* **Rationale**: Keeps the dashboard page clean. The chat widget is an "accessory" to the main view.

### 2. State Management
* **Decision**: Use local `useState` for messages.
* **Rationale**: Chat history is specific to the widget session (fetched on mount). No global store (Redux/Zustand) is needed for this scoped feature.

### 3. API Integration
* **Decision**: Use `fetch` in `useEffect` to load initial history (last 10 messages) from the same endpoint (or a dedicated GET, but POST is defined).
* **Refinement**: The backend `POST /api/{user_id}/chat` logic (Phase 3.3) loads history internally for the *LLM context*, but does it return history to the frontend? 
    *   *Check*: The `ChatResponse` schema returns `response` (text) and `conversation_id`. It does *not* return the full history.
    *   *Correction*: The frontend needs to fetch history separately or the `POST` endpoint needs to handle a "load history" signal. 
    *   *Alternative*: Since the spec says "Fetch on Mount", we likely need a `GET /api/{user_id}/chat/history` endpoint or similar. However, the current backend spec doesn't explicitly define a GET history endpoint. 
    *   *Workaround*: For this phase, we will assume the widget starts empty or we rely on the `POST` response to "continue" the conversation. But FR-009 says "fetch and display existing conversation history".
    *   *Action*: I will check `backend/app/api/routes/chat.py` content to see if a GET endpoint exists or can be easily added. If not, I'll have to rely on local state or add a task to add the GET endpoint. *Actually, I should check if I can add it to the plan.* 
    *   *Plan Update*: I will add a task to `tasks.md` to implement `GET /api/{user_id}/chat/history` if it's missing, as it's a prerequisite for FR-009.

## Technical Details

* **Icons**: `lucide-react` -> `MessageCircle` (Open), `X` (Close), `Send` (Submit), `Loader2` (Loading).
* **Colors**: `bg-blue-600` (User), `bg-gray-100` (Assistant).
* **Mobile**: Fixed position `inset-0` on mobile, `bottom-4 right-4` on desktop.
