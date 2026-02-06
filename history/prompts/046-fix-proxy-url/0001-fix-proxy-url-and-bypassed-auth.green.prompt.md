---
id: 0001
title: Fix Proxy URL and Bypassed Auth
stage: green
date: 2026-02-06
surface: agent
model: gemini-2.0-flash
feature: 046-fix-proxy-url
branch: 045-auth-gate-tasks
user: zohair
command: /sp.implement
labels: ["fix", "proxy", "auth", "frontend"]
links:
  spec: specs/046-fix-proxy-url/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/api.ts
 - frontend/next.config.mjs
 - frontend/services/todo-service.ts
 - frontend/context/auth-context.tsx
 - frontend/components/dashboard/chat-widget.tsx
 - frontend/components/dashboard/user-nav.tsx
 - specs/046-fix-proxy-url/tasks.md
tests:
 - Manual Verification (Grep)
---

## Prompt

/sp.implement

**Context:**
Fixing the "Wrong URL" and "Bypassed Proxy" errors. The frontend is currently making direct requests to the wrong Backend URL (`todo-hackathon3...`) instead of using the Vercel Proxy (`/api/...`). We will hardcode the API client to use relative paths, forcing the proxy to handle the routing and authentication headers.

**Directives:**
1.  **Action:** Overwrite `frontend/lib/api.ts` (or create it if missing).
2.  **Action:** Update `next.config.mjs` to ensure the proxy destination is perfect.
3.  **Verification:**
    * Browser requests will go to `/api/auth/get-session` (Relative).
    * Vercel will forward them to `asdadsshu768-todo-hackathon3.hf.space`.
    * Cookies will work.

---

### **Task 1: Force Relative Paths (`frontend/lib/api.ts`)**
**Action:** Overwrite completely.
**Key Change:** `BASE_URL` is now an empty string. This is the critical fix.
```typescript
// frontend/lib/api.ts

// NUCLEAR FIX: Force relative path. 
// This makes the browser send requests to the Frontend Server (Vercel),
// which then proxies them to the Backend. This solves CORS and Cookie issues.
const BASE_URL = ""; 

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Ensure endpoint starts with /
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API request failed");
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
```

## Response snapshot

Implemented the "Nuclear Fix" for proxy and auth issues. Created a new relative-path API client in `frontend/lib/api.ts`, updated `next.config.mjs` proxy rewrites, and refactored `todo-service.ts`, `auth-context.tsx`, `chat-widget.tsx`, and `user-nav.tsx` to use relative paths. This ensures all frontend requests are routed through the Vercel proxy, maintaining cookie synchronization and avoiding CORS errors.

## Outcome

- ✅ Impact: Resolved "Wrong URL" and "Bypassed Proxy" errors across the entire frontend.
- 🧪 Tests: Manual verification via recursive grep confirmed no remaining direct backend URL references in source files.
- 📁 Files: Created `api.ts`, updated `next.config.mjs`, and 4 major component/context files.
- 🔁 Next prompts: Proceed with browser verification of the full authentication and task flow.
- 🧠 Reflection: Forcing relative paths is the most definitive way to ensure proxy utilization in Next.js, eliminating environmental variability in API URL construction.

## Evaluation notes (flywheel)

- Failure modes observed: Initial grep for `api-client` timed out due to `.next` cache size.
- Graders run and results (PASS/FAIL): PASS (Implementation matches directives).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null