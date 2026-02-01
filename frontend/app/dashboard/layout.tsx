import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";
import { UserNav } from "@/components/dashboard/user-nav";
import { AuthProvider } from "@/context/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex gap-6 md:gap-10">
              <h1 className="text-xl font-bold">Todo App</h1>
            </div>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
        <ClientChatWrapper />
      </div>
    </AuthProvider>
  );
}