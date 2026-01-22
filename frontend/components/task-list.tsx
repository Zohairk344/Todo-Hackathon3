"use client";

import { useState, useEffect } from "react";
import { Task, CreateTaskData } from "@/lib/api";
import { TaskCard } from "./task-card";
import { api } from "@/lib/api";
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
import { ClipboardList } from "lucide-react";

interface TaskListProps {
  initialTasks: Task[];
  user_id: string; // Passed from server component
}

const priorityOrder: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };

export function TaskList({ initialTasks, user_id }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Sync state with server-side updates (e.g. after adding a task)
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleToggle = async (taskId: number) => {
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));

    try {
      await api.toggleTask(user_id, taskId);
      toast.success("Task updated");
    } catch (error) {
      setTasks(originalTasks);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteClick = (taskId: number) => {
    setDeleteId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;

    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== deleteId));
    setIsDeleteDialogOpen(false); // Close immediately for responsiveness

    try {
      await api.deleteTask(user_id, deleteId);
      toast.success("Task deleted");
    } catch (error) {
      setTasks(originalTasks);
      toast.error("Failed to delete task");
    } finally {
      setDeleteId(null);
    }
  };

  const handleCleanup = async () => {
    try {
      const res = await api.cleanupTasks(user_id);
      toast.success(`Cleaned up ${res.count} tasks`);
      // Update local state: remove completed tasks
      setTasks(tasks.filter(t => !t.completed));
    } catch (error) {
      toast.error("Failed to cleanup tasks");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: CreateTaskData) => {
    if (!editingTask) return;

    // Optimistic update
    const originalTasks = [...tasks];
    const updatedTask = { ...editingTask, ...data };
    // @ts-ignore - Ignoring dueDate type mismatch for optimistic update
    setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));

    try {
      const updatedTaskFromServer = await api.updateTask(user_id, editingTask.id, data);
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTaskFromServer : t));
      toast.success("Task updated");
    } catch (error) {
      setTasks(originalTasks);
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    
    if (filterStatus === "pending") return matchesSearch && !task.completed;
    if (filterStatus === "completed") return matchesSearch && task.completed;
    return matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // 1. Completed status (False first)
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    // 2. Priority (High > Medium > Low)
    if (a.priority !== b.priority) {
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    }

    // 3. Due Date (Ascending, Null last)
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <DashboardStats tasks={tasks} />
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
            You're all caught up! Create your first task to get started and track your progress.
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
              task={task}
              onToggle={handleToggle}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <EditTaskDialog 
        task={editingTask}
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