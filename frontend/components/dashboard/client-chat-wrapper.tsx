"use client";
import { ChatWidget } from "./chat-widget";
import { useAuth } from "@/context/auth-context";
import { useTasks } from "@/context/tasks-context";

export function ClientChatWrapper() {
  const { user } = useAuth();
  const { refreshTasks } = useTasks();

  if (!user) return null;

  return <ChatWidget userId={user.id} onTasksChange={refreshTasks} />;
}
