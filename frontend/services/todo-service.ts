import { apiRequest } from "@/lib/api";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: "pending" | "in-progress" | "completed";
  priority: "LOW" | "MEDIUM" | "HIGH";
  due_date?: string | null;
  created_at: string;
  updated_at: string;
  category_id?: number | null;
  category_name?: string | null; 
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export const todoService = {
  getTasks: (userId: string) => 
    apiRequest<Task[]>(`/api/${userId}/tasks`),

  createTask: (userId: string, data: Partial<Task>) => 
    apiRequest<Task>(`/api/${userId}/tasks`, { method: "POST", body: JSON.stringify(data) }),

  updateTask: (userId: string, taskId: string, data: Partial<Task>) => 
    apiRequest<Task>(`/api/${userId}/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(data) }),

  deleteTask: (userId: string, taskId: string) => 
    apiRequest<void>(`/api/${userId}/tasks/${taskId}`, { method: "DELETE" }),

  getCategories: (userId: string) => 
    apiRequest<Category[]>(`/api/${userId}/categories`),

  createCategory: (userId: string, data: { name: string; color: string }) => 
    apiRequest<Category>(`/api/${userId}/categories`, { method: "POST", body: JSON.stringify(data) }),
};