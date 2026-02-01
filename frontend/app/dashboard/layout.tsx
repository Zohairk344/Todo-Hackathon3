import { ClientChatWrapper } from "@/components/dashboard/client-chat-wrapper";
import { Header } from "@/components/dashboard/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Helper to fetch user session server-side
async function getUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) return null;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";
    const res = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        Cookie: `session_token=${token.value}`,
      },
      cache: "no-store", 
    });

    if (!res.ok) return null;
    
    // The endpoint returns { user: {...}, token: ... }
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Failed to fetch user session:", error);
    return null;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserSession();

  // Protect the route: Redirect if not logged in
  if (!user) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1 space-y-4 p-8 pt-6">
        {children}
      </main>
      
      {/* Pass Real User ID to Chat so database writes succeed */}
      <div className="fixed bottom-6 left-6 z-50">
        <ClientChatWrapper userId={user.id} />
      </div>
    </div>
  );
}
