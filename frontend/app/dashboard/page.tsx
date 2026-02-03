"use client";

import { useState } from "react";
import { useTasks } from "@/context/tasks-context";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading"; 
import { TaskView } from "@/components/dashboard/task-view"; 
import { NewTaskDialog } from "@/components/dashboard/new-task-dialog"; 
import { NewCategoryDialog } from "@/components/dashboard/new-category-dialog"; 

export default function DashboardPage() {
  const { 
    tasks, 
    categories, 
    isLoading, 
    addTask, 
    addCategory, 
    deleteTask, 
    updateTaskStatus,
    updateTask 
  } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Show loader only on initial load if no data exists
  if (isLoading && tasks.length === 0 && categories.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading title={`Tasks (${tasks.length})`} description="Manage your daily tasks" />
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCategoryModalOpen(true)} variant="outline">
             Add Category
          </Button>
          <Button onClick={() => setIsTaskModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>
      <Separator />
      
      {/* Task Board / List View */}
      <TaskView 
        tasks={tasks} 
        categories={categories}
        onStatusChange={updateTaskStatus}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />

      {/* Dialogs wired to Context Handlers */}
      <NewTaskDialog 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)}
        categories={categories}
        onConfirm={async (data) => {
            await addTask(data);
            setIsTaskModalOpen(false);
        }}
      />

      <NewCategoryDialog
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onConfirm={async (data) => {
            await addCategory(data);
            setIsCategoryModalOpen(false);
        }}
      />
    </div>
  );
}