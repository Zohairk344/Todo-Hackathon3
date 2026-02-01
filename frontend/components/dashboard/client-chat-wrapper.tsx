"use client";

import { useRouter } from "next/navigation";
import { ChatWidget } from "./chat-widget";

export function ClientChatWrapper({ userId }: { userId: string }) {
  const router = useRouter();
  // When the Chat Widget says "I changed something" (like added a task), we refresh the page data
  return <ChatWidget userId={userId} onTasksChange={() => router.refresh()} />;
}