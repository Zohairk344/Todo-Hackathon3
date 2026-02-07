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
  onToggleStatus: (id: number) => Promise<void>;
  onUpdate: (id: number, data: Partial<Task>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskView({ tasks, categories, onToggleStatus, onUpdate, onDelete }: TaskViewProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" 
      ? true 
      : filter === "pending" 
        ? !task.completed
        : task.completed;
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

  const priorityColors = {
    HIGH: "bg-red-500 hover:bg-red-600",
    MEDIUM: "bg-yellow-500 hover:bg-yellow-600",
    LOW: "bg-green-500 hover:bg-green-600",
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
                <div className="flex items-center gap-4 grow">
                  <button 
                    onClick={() => onToggleStatus(task.id)}
                    className={task.completed ? "text-primary" : "text-muted-foreground hover:text-primary"}
                  >
                    {task.completed ? <CheckCircle2 /> : <Circle />}
                  </button>
                  
                  <div className="space-y-1 grow">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      <Badge className={`text-[10px] px-1.5 py-0 h-4 border-none text-white ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {task.categoryId && (
                            <span className="flex items-center gap-1.5">
                                <span 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: getCategoryColor(task.categoryId) }} 
                                />
                                {getCategoryName(task.categoryId)}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className="flex items-center gap-1">
                                <Calendar size={12} /> {format(new Date(task.dueDate), "MMM dd")}
                            </span>
                        )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
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
