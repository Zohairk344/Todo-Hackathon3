---
id: 0006
title: remediate-tasks-chat-auth-qol
stage: misc
date: 2026-02-01
surface: agent
model: gemini-2.0-flash-exp
feature: 039-chat-auth-qol
branch: 039-chat-auth-qol
user: User
command: /sp.analyze (remediation)
labels: ["tasks", "remediation", "consistency"]
links:
  spec: specs/039-chat-auth-qol/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/039-chat-auth-qol/tasks.md
tests:
 - null
---

## Prompt

Applied remediation for tasks.md based on /sp.analyze findings.

## Response snapshot

Updated `tasks.md` to:
- Include Constitution-mandated sanity check scripts (T001.1, T004.1).
- Added explicit state clearing requirement to UserNav (T002).
- Added auto-reconnect logic requirement to ChatWidget (T004).

## Outcome

- ✅ Impact: Aligned task list with Constitution and resolved functional gaps.
- 🧪 Tests: Added tasks for sanity check scripts.
- 📁 Files: specs/039-chat-auth-qol/tasks.md
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Remediation pass ensured that "invisible" requirements (Constitution) were made explicit in the execution plan.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null