"use client";
import { useRouter } from "next/navigation";
import { ChatWidget } from "./chat-widget";
import { useAuth } from "@/context/auth-context";

export function ClientChatWrapper() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) return null;

  return <ChatWidget userId={user.id} onTasksChange={() => router.refresh()} />;
}