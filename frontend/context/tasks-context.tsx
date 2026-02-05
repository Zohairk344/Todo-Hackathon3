"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./auth-context";
import { todoService, Task, Category } from "@/services/todo-service";
import { toast } from "sonner"; 
import { Loader2 } from "lucide-react";

interface TasksContextType {
  tasks: Task[];
  categories: Category[];
  isLoading: boolean;
  refreshTasks: () => Promise<void>;
  addTask: (data: Partial<Task>) => Promise<void>;
  addCategory: (data: { name: string; color: string }) => Promise<void>;
  updateTaskStatus: (taskId: string, status: string) => Promise<void>;
  updateTask: (taskId: string, data: Partial<Task>) => Promise<void>; // <--- This fixes the error
  deleteTask: (taskId: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshTasks = useCallback(async () => {
    // STRICT GUARD: Do not attempt fetch if user/id is missing or auth is loading. Prevents 401s.
    if (authLoading || !user?.id) return;
    
    setIsLoading(true);
    try {
      const [fetchedTasks, fetchedCategories] = await Promise.all([
        todoService.getTasks(user.id),
        todoService.getCategories(user.id)
      ]);
      setTasks(fetchedTasks);
      setCategories(fetchedCategories);
    } catch (error: unknown) {
      console.error("Failed to load data", error);
      if (error instanceof Error && error.message === "Unauthorized") {
        toast.error("Session Expired. Please login again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  // Initial Fetch only when USER exists and Auth is done
  useEffect(() => {
    if (!authLoading && user?.id) {
        refreshTasks();
    }
  }, [authLoading, user, refreshTasks]);

  const addTask = async (data: Partial<Task>) => {
    if (authLoading || !user?.id) return;
    try {
        await todoService.createTask(user.id, data);
        await refreshTasks();
        toast.success("Task created and synced"); 
    } catch (e) {
        toast.error("Failed to create task");
        throw e;
    }
  };

  const addCategory = async (data: { name: string; color: string }) => {
    if (authLoading || !user?.id) return;
    try {
        await todoService.createCategory(user.id, data);
        await refreshTasks();
        toast.success("Category created");
    } catch (e) {
        toast.error("Failed to create category");
        throw e;
    }
  };
  
  const updateTaskStatus = async (taskId: string, status: string) => {
     if (authLoading || !user?.id) return;
     // Optimistic update
     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: status as Task["status"] } : t));
     try {
        await todoService.updateTask(user.id, taskId, { status: status as Task["status"] });
     } catch (e) {
        toast.error("Failed to update status");
        refreshTasks(); 
     }
  };

  const updateTask = async (taskId: string, data: Partial<Task>) => {
     if (authLoading || !user?.id) return;
     // Optimistic update
     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...data } : t));
     try {
        await todoService.updateTask(user.id, taskId, data);
        toast.success("Task updated");
     } catch (e) {
        toast.error("Failed to update task");
        refreshTasks(); 
     }
  };

  const deleteTask = async (taskId: string) => {
      if (authLoading || !user?.id) return;
      try {
        await todoService.deleteTask(user.id, taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        toast.success("Task deleted");
      } catch (e) {
        toast.error("Failed to delete task");
      }
  };

  // THE GATE: Block rendering until Auth is ready.
  if (authLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Strict null check: if authLoading is false but user is null, return null (rendering nothing).
  if (!user) {
    return null;
  }

  return (
    <TasksContext.Provider value={{ tasks, categories, isLoading, refreshTasks, addTask, addCategory, updateTaskStatus, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};