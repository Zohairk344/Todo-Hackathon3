"use client";

import { TaskList } from "@/components/task-list";
import { AddTaskForm } from "@/components/add-task-form";
import { useAuth } from "@/context/auth-context";
import { useTasks } from "@/context/tasks-context";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, isLoading: tasksLoading } = useTasks();

  if (authLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
           <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center py-20">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (!user) return null; // AuthProvider handles redirect

  return (
    <div className="container mx-auto py-10 px-4 animate-enter relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {/* AddTaskForm no longer needs user_id passed down if it uses useTasks */}
        <AddTaskForm user_id={user.id} />
      </div>
      
      {tasksLoading && tasks.length === 0 ? (
        <div className="text-center py-20">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Fetching tasks...</p>
        </div>
      ) : (
        <TaskList initialTasks={tasks} user_id={user.id} />
      )}
    </div>
  );
}
