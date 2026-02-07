---
id: 0013
title: Fix Task Timezone 500 Error
stage: green
date: 2026-02-07
surface: agent
model: gemini-2.0-pro-exp
feature: 048-task-enhancements
branch: 048-task-enhancements
user: zohair
command: /sp.implement
labels: ["backend", "fastapi", "bug-fix", "timezone"]
links:
  spec: specs/048-task-enhancements/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/app/api/routes/tasks.py
 - specs/048-task-enhancements/tasks.md
tests:
 - todo-hackathon3/tests/verify_tz_fix.py
---

## Prompt

Fixing a 500 Internal Server Error during Task Creation. The database rejects the due_date because it contains timezone information (Aware), but the column expects a Naive timestamp. We will strip the timezone info in the route handler before saving.

---

### **Task 1: Fix Timezone Handling (`backend/app/api/routes/tasks.py`)**
**Action:** Overwrite with the timezone stripping logic.
```python
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from app.api.deps import SessionDep, get_current_user
from app.models import Task, TaskCreate, TaskPublic, TaskUpdate, User

router = APIRouter()

@router.post("/", response_model=TaskPublic)
def create_task(
    *, session: SessionDep, task_in: TaskCreate, current_user: User = Depends(get_current_user)
) -> Any:
    # TIMEZONE FIX: Strip timezone info to make it naive for Postgres
    if task_in.due_date and task_in.due_date.tzinfo:
        task_in.due_date = task_in.due_date.replace(tzinfo=None)

    task = Task.model_validate(task_in, update={"owner_id": current_user.id})
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.get("/", response_model=List[TaskPublic])
def read_tasks(
    session: SessionDep, current_user: User = Depends(get_current_user), skip: int = 0, limit: int = 100
) -> Any:
    statement = select(Task).where(Task.owner_id == current_user.id).offset(skip).limit(limit)
    tasks = session.exec(statement).all()
    return tasks

@router.patch("/{task_id}", response_model=TaskPublic)
def update_task(
    *,
    session: SessionDep,
    task_id: int,
    task_in: TaskUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    # TIMEZONE FIX: Strip timezone info here too
    if task_in.due_date and task_in.due_date.tzinfo:
        task_in.due_date = task_in.due_date.replace(tzinfo=None)
    
    update_data = task_in.model_dump(exclude_unset=True)
    task.sqlmodel_update(update_data)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(
    session: SessionDep, task_id: int, current_user: User = Depends(get_current_user)
) -> Any:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(task)
    session.commit()
    return {"ok": True}
```

## Response snapshot

Implemented timezone stripping for `due_date` in `todo-hackathon3/app/api/routes/tasks.py`. The logic ensures that `due_date.tzinfo` is set to `None` before the task is saved or updated, preventing 500 errors in Postgres which expects naive timestamps. Verified implementation with a static analysis test script.

## Outcome

- ✅ Impact: Resolved 500 Internal Server Error for task creation/updates with timezone-aware dates.
- 🧪 Tests: Static analysis verification script passed.
- 📁 Files: Modified `todo-hackathon3/app/api/routes/tasks.py` and `specs/048-task-enhancements/tasks.md`.
- 🔁 Next prompts: None.
- 🧠 Reflection: User provided code that matched a different boilerplate structure; adapted logic to the actual project's route structure (using user_id in path and specific dependency patterns).

## Evaluation notes (flywheel)

- Failure modes observed: Potential mismatch if model field names were different (already verified in models.py).
- Graders run and results (PASS/FAIL): Static Analysis: PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.