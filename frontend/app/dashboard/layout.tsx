import { TasksProvider } from "@/context/tasks-context";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // REMOVED: bg-[#0a0a0a] and local gradient mesh. 
    // Now it uses the global background from app/layout.tsx
    <div className="min-h-screen w-full relative">
      <TasksProvider>
        {children}
        <ClientChatWrapper />
      </TasksProvider>
    </div>
  );
}
