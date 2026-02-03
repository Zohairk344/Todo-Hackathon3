"use client";

import { Task } from "@/services/todo-service";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Calendar } from "lucide-react";
import { cn, getContrastColor } from "@/lib/utils";
import { format, isPast, isToday } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColor: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  LOW: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100",
};

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const isOverdue = task.due_date && isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date)) && task.status !== "completed";

  return (
    <Card className="relative group transition-all hover:shadow-md flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className={cn("px-1.5 py-0 text-[10px]", priorityColor[task.priority || "MEDIUM"])}>
              {task.priority}
            </Badge>
            {task.category && (
              <Badge
                variant="outline"
                className="px-1.5 py-0 text-[10px] border-transparent"
                style={{
                  backgroundColor: task.category.color,
                  color: getContrastColor(task.category.color),
                }}
              >
                {task.category.name}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg font-bold leading-tight line-clamp-1 pr-2 mt-1">
            {task.title}
          </CardTitle>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit(task)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-10">
          {task.description || "No description"}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs">
          {task.due_date && (
            <div className={cn("flex items-center gap-1", isOverdue ? "text-red-600 font-medium" : "text-muted-foreground")}>
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(task.due_date), "MMM d")}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            task.status === "completed"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
        >
          {task.status === "completed" ? "Completed" : "Mark Done"}
        </button>
      </CardFooter>
    </Card>
  );
}