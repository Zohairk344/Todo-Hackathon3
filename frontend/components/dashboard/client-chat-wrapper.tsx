"use client";
import { useRouter } from "next/navigation";
import { ChatWidget } from "./chat-widget";

export function ClientChatWrapper({ userId }: { userId: string }) {
  const router = useRouter();
  return <ChatWidget userId={userId} onTasksChange={() => router.refresh()} />;
}
