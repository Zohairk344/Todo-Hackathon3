import { TasksProvider } from "@/context/tasks-context";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <TasksProvider>
        {children}
        <ClientChatWrapper />
      </TasksProvider>
    </div>
  );
}