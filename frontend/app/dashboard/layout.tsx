import { UserNav } from "@/components/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight">Todo App</div>
          <UserNav />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
