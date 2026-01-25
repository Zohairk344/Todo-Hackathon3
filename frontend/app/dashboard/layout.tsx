import { Header } from "@/components/dashboard/Header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth-server";
import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  const userId = session?.user?.id;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Fixed Chat Widget */}
      {userId && (
        <div className="fixed bottom-6 left-6 z-50">
          <ClientChatWrapper userId={userId} />
        </div>
      )}
    </div>
  );
}
