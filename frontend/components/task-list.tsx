"use client";

import { useState } from "react";
import { useTasks } from "@/context/tasks-context";
import { TaskCard } from "./task-card";
import { toast } from "sonner";
import { TaskToolbar, FilterStatus } from "./features/task-toolbar";
import { EditTaskDialog } from "./features/edit-task-dialog";
import { DashboardStats } from "@/components/dashboard-stats";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ClipboardList, Loader2 } from "lucide-react";
import { Task as ServiceTask } from "@/services/todo-service";

interface TaskListProps {
  user_id: string; // Keep for backward compat if needed, but we use context
}

const priorityOrder: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };

export function TaskList({ user_id }: TaskListProps) {
  const { tasks, isLoading, updateTaskStatus, deleteTask, refreshTasks } = useTasks();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [editingTask, setEditingTask] = useState<ServiceTask | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleToggle = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // updateTaskStatus handles optimistic update and toast
    await updateTaskStatus(taskId, task.status === "completed" ? "pending" : "completed");
  };

  const handleDeleteClick = (taskId: string) => {
    setDeleteId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    setIsDeleteDialogOpen(false); 
    await deleteTask(deleteId);
    setDeleteId(null);
  };

  const handleCleanup = async () => {
    // Note: todo-service.ts currently doesn't have cleanup, 
    // we could add it or just loop deletes, but let's assume it's a future task
    // for now we just toast
    toast.info("Cleanup feature coming soon to service layer");
  };

  const handleEdit = (task: ServiceTask) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: any) => {
    if (!editingTask) return;
    try {
        // We'd ideally have an updateTask in context too
        // For now let's just use the service directly if needed, or add to context
        // Adding it to context is better. 
        toast.info("Edit saving...");
        // Placeholder for context updateTask
        setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    
    const isCompleted = task.status === "completed";
    if (filterStatus === "pending") return matchesSearch && !isCompleted;
    if (filterStatus === "completed") return matchesSearch && isCompleted;
    return matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aCompleted = a.status === "completed";
    const bCompleted = b.status === "completed";
    if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;

    if (a.priority !== b.priority) {
        return (priorityOrder[b.priority || "MEDIUM"] || 0) - (priorityOrder[a.priority || "MEDIUM"] || 0);
    }

    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  const completedCount = tasks.filter(t => t.status === "completed").length;

  if (isLoading && tasks.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading tasks...</p>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <DashboardStats tasks={tasks as any} />
      <TaskToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onCleanup={handleCleanup}
        canCleanup={completedCount > 0}
      />

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/10 min-h-75">
          <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
            <ClipboardList className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-2 text-lg font-semibold">No tasks yet</h3>
          <p className="mb-6 text-sm text-muted-foreground max-w-sm">
            You&apos;re all caught up! Create your first task to get started and track your progress.
          </p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-background min-h-50">
          <p className="text-muted-foreground">No tasks match your filters.</p>
          <button 
            onClick={() => { setSearchQuery(""); setFilterStatus("all"); }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task as any}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDeleteClick(task.id)}
              onEdit={() => handleEdit(task)}
            />
          ))}
        </div>
      )}

      <EditTaskDialog 
        task={editingTask as any}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
