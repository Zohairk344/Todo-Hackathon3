import { apiRequest } from "@/lib/api";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  status: string; // Dynamic field for UI
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId?: number | null;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export const todoService = {
  getTasks: (userId: string) => 
    apiRequest<Task[]>(`/api/${userId}/tasks`).then(tasks => 
      tasks.map(t => ({ ...t, status: t.completed ? "completed" : "pending" }))
    ),

  createTask: (userId: string, data: Partial<Task>) => 
    apiRequest<Task>(`/api/${userId}/tasks`, { method: "POST", body: JSON.stringify(data) }).then(t => 
      ({ ...t, status: t.completed ? "completed" : "pending" })
    ),

  updateTask: (userId: string, taskId: number, data: Partial<Task>) => {
    // If status is provided, map it to completed for the backend
    const payload = { ...data };
    if ('status' in data) {
      payload.completed = data.status === 'completed';
      delete payload.status;
    }
    return apiRequest<Task>(`/api/${userId}/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(payload) }).then(t => 
      ({ ...t, status: t.completed ? "completed" : "pending" })
    );
  },

  deleteTask: (userId: string, taskId: number) => 
    apiRequest<void>(`/api/${userId}/tasks/${taskId}`, { method: "DELETE" }),

  getCategories: (userId: string) => 
    apiRequest<Category[]>(`/api/${userId}/categories`),

  createCategory: (userId: string, data: { name: string; color: string }) => 
    apiRequest<Category>(`/api/${userId}/categories`, { method: "POST", body: JSON.stringify(data) }),
};
