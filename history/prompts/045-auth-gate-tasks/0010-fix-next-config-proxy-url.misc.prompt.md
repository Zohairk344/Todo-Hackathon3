---
id: 0010
title: fix-next-config-proxy-url
stage: misc
date: 2026-02-06
surface: agent
model: gemini-2.0-flash-exp
feature: 045-auth-gate-tasks
branch: 045-auth-gate-tasks
user: zohair
command: /sp.implement
labels: ["fix", "config", "nextjs"]
links:
  spec: specs/045-auth-gate-tasks/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/next.config.ts
tests:
  - Manual verification
---

## Prompt

/sp.implement

**Context:**
Fixing the 404 Error on "Get Session". The `next.config.ts` proxy is pointing to the wrong Backend URL (missing the username prefix). We will update it to the correct Hugging Face URL.

**Directives:**
1.  **Action:** Overwrite `next.config.ts` completely.
2.  **Verification:**
    * The frontend will now successfully connect to `asdadsshu768-todo-hackathon3.hf.space`.
    * The "Get Session" call will return 200 OK.

---

### **Task 1: Correct Proxy URL (`next.config.ts`)**
**Action:** Overwrite with the correct destination.
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // We added the 'asdadsshu768-' prefix here to match your real backend
        destination: 'https://asdadsshu768-todo-hackathon3.hf.space/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
```

## Response snapshot

Updated `frontend/next.config.ts` to point to the correct backend URL (`https://asdadsshu768-todo-hackathon3.hf.space`).

## Outcome

- ✅ Impact: Fixed 404 error on backend proxy.
- 🧪 Tests: Verified file content.
- 📁 Files: Modified next.config.ts.
- 🔁 Next prompts: None.
- 🧠 Reflection: Direct config fix.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): null.
- Next experiment (smallest change to try): null.