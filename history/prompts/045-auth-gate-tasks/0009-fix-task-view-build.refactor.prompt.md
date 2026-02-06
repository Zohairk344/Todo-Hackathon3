---
id: 0009
title: fix-task-view-build
stage: refactor
date: 2026-02-06
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 045-auth-gate-tasks
branch: main
user: zohair
command: /sp.implement
labels: ["bugfix", "frontend", "build-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/components/dashboard/task-view.tsx
 - frontend/components/features/edit-task-dialog.tsx
tests:
 - npm run build
---

## Prompt

/sp.implement

**Context:**
Fixing a Vercel Build Error. `TaskView` is rejecting the `onUpdate` prop because it is missing from the TypeScript interface. We will add the prop to the interface and the component.

**Directives:**
1.  **Action:** Overwrite `frontend/components/dashboard/task-view.tsx`.
2.  **Verification:** The `npm run build` command will pass.

---

### **Task 1: Update TaskView Interface (`frontend/components/dashboard/task-view.tsx`)**
**Action:** Overwrite completely.
**Key Change:** Added `onUpdate` to `TaskViewProps` and the component arguments.
```tsx
"use client";

import { useState } from "react";
import { Task, Category } from "@/services/todo-service";
import { format } from "date-fns";
import { CheckCircle2, Circle, Trash2, Calendar, Tag, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TaskViewProps {
  tasks: Task[];
  categories: Category[];
  onStatusChange: (id: string, status: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>; // <--- Fixed: Added missing prop
  onDelete: (id: string) => Promise<void>;
}

export function TaskView({ tasks, categories, onStatusChange, onUpdate, onDelete }: TaskViewProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" 
      ? true 
      : filter === "pending" 
        ? task.status !== "completed" 
        : task.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryName = (id?: number | null) => {
    if (!id) return null;
    return categories.find(c => c.id === id)?.name;
  };

  const getCategoryColor = (id?: number | null) => {
    if (!id) return "gray";
    return categories.find(c => c.id === id)?.color || "gray";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search tasks..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                No tasks found.
            </div>
        ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onStatusChange(task.id, task.status === "completed" ? "pending" : "completed")}
                    className={task.status === "completed" ? "text-primary" : "text-muted-foreground hover:text-primary"}
                  >
                    {task.status === "completed" ? <CheckCircle2 /> : <Circle />}
                  </button>
                  
                  <div className="space-y-1">
                    <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {task.priority !== "MEDIUM" && (
                            <Badge variant={task.priority === "HIGH" ? "destructive" : "secondary"} className="h-5 px-1.5">
                                {task.priority}
                            </Badge>
                        )}
                        {task.category_id && (
                            <span className="flex items-center gap-1" style={{ color: getCategoryColor(task.category_id) }}>
                                <Tag size={12} /> {getCategoryName(task.category_id)}
                            </span>
                        )}
                        {task.due_date && (
                            <span className="flex items-center gap-1">
                                <Calendar size={12} /> {format(new Date(task.due_date), "MMM d")}
                            </span>
                        )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Placeholder for future edit functionality */}
                    <Button variant="ghost" size="icon" onClick={() => console.log("Edit clicked", task.id)}>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
```

## Response snapshot

Fixed TaskView missing onUpdate prop and EditTaskDialog type errors. Verified with npm run build.

## Outcome

- ✅ Impact: Fixed build errors blocking deployment.
- 🧪 Tests: Build passed.
- 📁 Files: Modified TaskView and EditTaskDialog.
- 🔁 Next prompts: None.
- 🧠 Reflection: Fixed dependent type error in EditTaskDialog discovered during build.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A