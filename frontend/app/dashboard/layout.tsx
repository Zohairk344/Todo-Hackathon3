import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";
import { UserNav } from "@/components/dashboard/user-nav";
import { TasksProvider } from "@/context/tasks-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
    <TasksProvider>
      <div className="flex min-h-screen flex-col bg-background">
          {/* Header with Centering Container */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
              <div className="flex gap-6 md:gap-10">
                <h1 className="text-xl font-bold tracking-tight">Todo App</h1>
              </div>
              <UserNav />
            </div>
          </header>
          
          {/* Main Content with Matching Container */}
          <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          <ClientChatWrapper />
        </div>
      </TasksProvider>
    </div>
  );
}