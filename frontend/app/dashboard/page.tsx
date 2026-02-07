"use client";

import { useState } from "react";
import { useTasks } from "@/context/tasks-context";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Separator } from "@/components/ui/separator";
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
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Tasks <span className="text-gray-600 text-2xl">({tasks.length})</span>
            </h2>
            <p className="text-muted-foreground mt-1">Manage your daily mission.</p>
        </div>
        
        {/* "Add Category" Button Removed */}
        
        <Button 
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white shadow-lg shadow-pink-500/20 border-0 transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      
      {/* Separator replaced with just spacing/glass effect in TaskView */}
      
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
        onAddCategory={() => {
            setIsTaskModalOpen(false);
            setIsCategoryModalOpen(true);
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