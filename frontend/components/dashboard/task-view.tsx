"use client";

import { useState } from "react";
import { TaskCard } from "../task-card";
import { TaskToolbar, FilterStatus } from "../features/task-toolbar";
import { EditTaskDialog } from "../features/edit-task-dialog";
import { DashboardStats } from "../dashboard-stats";
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
import { Task, Category } from "@/services/todo-service";

interface TaskViewProps {
  tasks: Task[];
  categories: Category[];
  onStatusChange: (taskId: string, status: string) => Promise<void>;
  onUpdate: (taskId: string, data: Partial<Task>) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const priorityOrder: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };

export function TaskView({ tasks, categories, onStatusChange, onUpdate, onDelete }: TaskViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleToggle = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    await onStatusChange(taskId, task.status === "completed" ? "pending" : "completed");
  };

  const handleDeleteClick = (taskId: string) => {
    setDeleteId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    setIsDeleteDialogOpen(false); 
    await onDelete(deleteId);
    setDeleteId(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: Partial<Task>) => {
    if (!editingTask) return;
    await onUpdate(editingTask.id, data);
    setIsEditDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <DashboardStats tasks={tasks} />
      <TaskToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onCleanup={() => {}} // Placeholder
        canCleanup={completedCount > 0}
      />

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/10 min-h-[300px]">
          <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
            <ClipboardList className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-2 text-lg font-semibold">No tasks yet</h3>
          <p className="mb-6 text-sm text-muted-foreground max-w-sm">
            You&apos;re all caught up! Create your first task to get started and track your progress.
          </p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-background min-h-[200px]">
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
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDeleteClick(task.id)}
              onEdit={() => handleEdit(task)}
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
