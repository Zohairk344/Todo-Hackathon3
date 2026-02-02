"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./auth-context";
import { todoService, Task, Category } from "@/services/todo-service";
import { toast } from "sonner"; 

interface TasksContextType {
  tasks: Task[];
  categories: Category[];
  isLoading: boolean;
  refreshTasks: () => Promise<void>;
  addTask: (data: Partial<Task>) => Promise<void>;
  addCategory: (data: { name: string; color: string }) => Promise<void>;
  updateTaskStatus: (taskId: string, status: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [fetchedTasks, fetchedCategories] = await Promise.all([
        todoService.getTasks(user.id),
        todoService.getCategories(user.id)
      ]);
      setTasks(fetchedTasks);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to load data", error);
      // Don't toast on initial load error to avoid spam, or make it subtle
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
        refreshTasks();
    } else {
        setTasks([]);
        setCategories([]);
    }
  }, [user, refreshTasks]);

  const addTask = async (data: Partial<Task>) => {
    if (!user) return;
    try {
        await todoService.createTask(user.id, data);
        await refreshTasks();
        toast.success("Task created");
    } catch (e) {
        toast.error("Failed to create task");
        throw e;
    }
  };

  const addCategory = async (data: { name: string; color: string }) => {
    if (!user) return;
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
     if (!user) return;
     
     // Optimistic update
     const originalTasks = [...tasks];
     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: status as any } : t));
     
     try {
        await todoService.updateTask(user.id, taskId, { status: status as any });
     } catch (e) {
        toast.error("Failed to update status");
        setTasks(originalTasks); // Revert on failure
     }
  };

  const deleteTask = async (taskId: string) => {
      if (!user) return;
      
      // Optimistic update
      const originalTasks = [...tasks];
      setTasks(prev => prev.filter(t => t.id !== taskId));

      try {
        await todoService.deleteTask(user.id, taskId);
        toast.success("Task deleted");
      } catch (e) {
        toast.error("Failed to delete task");
        setTasks(originalTasks); // Revert
      }
  };

  return (
    <TasksContext.Provider value={{ tasks, categories, isLoading, refreshTasks, addTask, addCategory, updateTaskStatus, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};
