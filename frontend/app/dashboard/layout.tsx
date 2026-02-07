import { TasksProvider } from "@/context/tasks-context";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-gray-100 selection:bg-pink-500/30">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Restore the Provider so useTasks works */}
        <TasksProvider>
          {children}
          {/* Restore the Chat so it appears on the dashboard */}
          <ClientChatWrapper />
        </TasksProvider>
      </div>
    </div>
  );
}
