"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task, Category, todoService } from "@/services/todo-service";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

interface TasksContextType {
  tasks: Task[];
  categories: Category[];
  isLoading: boolean;
  addTask: (task: Partial<Task>) => Promise<void>;
  addCategory: (category: Partial<Category>) => Promise<void>;
  updateTaskStatus: (id: number, status: string) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>; // FIXED: Exposed
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FIXED: Renamed to refreshTasks and added to interface
  const refreshTasks = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const [fetchedTasks, fetchedCategories] = await Promise.all([
        todoService.getTasks(user.id),
        todoService.getCategories(user.id),
      ]);
      setTasks(fetchedTasks);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      refreshTasks();
    }
  }, [user?.id]);

  const addTask = async (task: Partial<Task>) => {
    if (!user?.id) return;
    try {
      const newTask = await todoService.createTask(user.id, task);
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const addCategory = async (category: Partial<Category>) => {
    if (!user?.id) return;
    try {
      const newCategory = await todoService.createCategory(user.id, {
        name: category.name || "",
        color: category.color || "#000000"
      });
      setCategories((prev) => [...prev, newCategory]);
      toast.success("Category created");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const updateTaskStatus = async (id: number, status: string) => {
    if (!user?.id) return;
    try {
      // Optimistic update
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      
      await todoService.updateTask(user.id, id, { status });
    } catch (error) {
      toast.error("Failed to update status");
      refreshTasks(); // Revert on error
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    if (!user?.id) return;
    try {
      const updated = await todoService.updateTask(user.id, id, updates);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      toast.success("Task updated");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    if (!user?.id) return;
    try {
      await todoService.deleteTask(user.id, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        categories,
        isLoading,
        addTask,
        addCategory,
        updateTaskStatus,
        updateTask,
        deleteTask,
        refreshTasks, // FIXED: Exposed
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};
