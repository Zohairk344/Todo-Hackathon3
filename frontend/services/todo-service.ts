import { apiRequest } from "@/lib/api-client";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  due_date?: string;
  categoryId?: number;
  category?: Category;
  // Adding userId and createdAt to match typical backend response if needed
  userId?: string;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  userId?: string;
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
