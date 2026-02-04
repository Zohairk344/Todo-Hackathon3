"use client";

import { useState } from "react";
import { Task, Category } from "@/services/todo-service";
import { format } from "date-fns";
import { CheckCircle2, Circle, Trash2, Calendar, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TaskViewProps {
  tasks: Task[];
  categories: Category[];
  onStatusChange: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskView({ tasks, categories, onStatusChange, onDelete }: TaskViewProps) {
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
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
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
                
                <button onClick={() => onDelete(task.id)} className="text-muted-foreground hover:text-destructive p-2">
                    <Trash2 size={18} />
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}