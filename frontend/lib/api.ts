// Implements: T005, T008, T010
import { authClient } from "@/lib/auth-client";
import { AuthError } from "@/lib/errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Category {
  id: number;
  name: string;
  color: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuthResponse {
  token: string;
  session: Session;
  user: User;
}

export interface Task {
  id: number;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  categoryId: number | null;
  category: Category | null;
  dueDate: string | null;
}

export type CreateTaskData = {
  title: string;
  description?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  categoryId?: number | null;
  dueDate?: string | null;
};

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  let token: string | undefined | null = null;

  if (typeof window === "undefined") {
    // Server-side logic
    try {
      const { headers } = await import("next/headers");
      const { auth } = await import("@/lib/auth-server");
      const h = await headers();
      const session = await auth.api.getSession({ headers: h });
      token = session?.session?.token;
      if (token) {
          console.log(`[Server] Fetching ${endpoint} with token: ${token.substring(0, 10)}...`);
      } else {
          console.log(`[Server] Fetching ${endpoint} (No Token Found)`);
      }
    } catch (error) {
      console.error("[Server] Error retrieving session:", error);
    }
  } else {
    // Client-side logic
    try {
      const session = await authClient.getSession();
      token = session.data?.session?.token;
    } catch (error) {
       console.error("[Client] Error retrieving session:", error);
    }
  }

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add any additional headers from options
  if (options.headers && typeof options.headers === 'object') {
    for (const [key, value] of Object.entries(options.headers)) {
      if (typeof value === 'string') {
        reqHeaders[key] = value;
      }
    }
  }

  if (token) {
    reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: reqHeaders,
  });

  if (res.status === 401) {
    throw new AuthError();
  }

  return res;
}

export const api = {
  getTasks: async (user_id: string): Promise<Task[]> => {
    const res = await fetchAPI(`/api/${user_id}/tasks`);
    if (!res.ok) {
        const text = await res.text().catch(() => "Unknown error");
        console.error(`[API] getTasks failed: ${res.status} ${res.statusText}`, text);
        throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  createTask: async (user_id: string, data: CreateTaskData): Promise<Task> => {
    const res = await fetchAPI(`/api/${user_id}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "Unknown error");
        console.error(`[API] createTask failed: ${res.status} ${res.statusText}`, text);
        throw new Error(`Failed to create task: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  updateTask: async (user_id: string, taskId: number, data: CreateTaskData): Promise<Task> => {
    const res = await fetchAPI(`/api/${user_id}/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  toggleTask: async (user_id: string, taskId: number): Promise<Task> => {
    const res = await fetchAPI(`/api/${user_id}/tasks/${taskId}/complete`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle task");
    return res.json();
  },

  deleteTask: async (user_id: string, taskId: number): Promise<void> => {
    const res = await fetchAPI(`/api/${user_id}/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
  },

  cleanupTasks: async (user_id: string): Promise<{ count: number }> => {
    const res = await fetchAPI(`/api/${user_id}/tasks/cleanup`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to cleanup tasks");
    return res.json();
  },

  updateProfile: async (data: { name: string }): Promise<User> => {
    const res = await fetchAPI(`/api/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  },

  deleteAccount: async (): Promise<void> => {
    const res = await fetchAPI(`/api/users/me`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete account");
  },

  categories: {
    list: async (user_id: string): Promise<Category[]> => {
      const res = await fetchAPI(`/api/${user_id}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    create: async (user_id: string, data: { name: string; color: string }): Promise<Category> => {
      const res = await fetchAPI(`/api/${user_id}/categories`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create category");
      return res.json();
    },
    delete: async (user_id: string, id: number): Promise<void> => {
      const res = await fetchAPI(`/api/${user_id}/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
    },
  },
};
