import { Header } from "@/components/dashboard/Header";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hackathon Shortcut: Using a mock user ID for layout display.
  const mockUser = { id: "current-user", name: "User", email: "user@example.com" }; 
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Floating Chat Widget */}
       <div className="fixed bottom-6 left-6 z-50">
          <ClientChatWrapper userId={mockUser.id} /> 
       </div>
    </div>
  );
}
