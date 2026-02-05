"use client";
import { ChatWidget } from "./chat-widget";
import { useAuth } from "@/context/auth-context";
import { useTasks } from "@/context/tasks-context";

export function ClientChatWrapper() {
  const { user } = useAuth();
  const { refreshTasks } = useTasks(); // <--- Connects Chat to Tasks Context

  if (!user) return null;

  return (
    <ChatWidget 
        userId={user.id} 
        onTasksChange={async () => {
            console.log("Chatbot triggered refresh...");
            await refreshTasks(); // <--- Instant Update
        }} 
    />
  );
}