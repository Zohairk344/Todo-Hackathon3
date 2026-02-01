"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskList } from "@/components/task-list";
import { AddTaskForm } from "@/components/add-task-form";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";
import { type Task } from "@/lib/api";

// We define a simple User interface here since we can't import the backend model directly
interface User {
  id: string;
  email: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get the Backend URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";

    // 2. Fetch Session from Browser (where the cookie lives!)
    fetch(`${API_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // <--- CRITICAL: Sends the hf.space cookie
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          return data.user.id;
        } else {
          throw new Error("Unauthorized");
        }
      })
      .then((userId) => {
        // 3. If session valid, fetch tasks
        return fetch(`${API_URL}/api/${userId}/tasks`, {
            headers: { "Content-Type": "application/json" }
        });
      })
      .then(async (res) => {
        if (res.ok) {
            const taskData = await res.json();
            setTasks(taskData);
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        router.push("/sign-in");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
           <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center py-20">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) return null; // Will redirect shortly

  return (
    <div className="container mx-auto py-10 px-4 animate-enter relative min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {/* Pass the verified user ID to the form */}
        <AddTaskForm user_id={user.id} />
      </div>
      {/* Pass tasks loaded from client-side */}
      <TaskList initialTasks={tasks} user_id={user.id} />
      
      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <ClientChatWrapper userId={user.id} />
      </div>
    </div>
  );
}