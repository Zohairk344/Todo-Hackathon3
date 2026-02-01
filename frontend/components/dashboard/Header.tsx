"use client"

import { UserNav } from "./user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  // Mock user for hackathon
  const mockUser = { id: "current-user", name: "User", email: "user@example.com" };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">Todo App</div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserNav email={mockUser.email} name={mockUser.name} />
        </div>
      </div>
    </header>
  );
}