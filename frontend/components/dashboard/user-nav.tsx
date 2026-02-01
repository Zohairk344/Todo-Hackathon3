"use client";
import { useAuth } from "@/context/auth-context";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function UserNav() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";
    try {
        await fetch(`${API_URL}/api/auth/sign-out`, { method: "POST", credentials: "include" });
        window.location.href = "/sign-in";
    } catch (e) {
        window.location.href = "/sign-in";
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 border-l pl-4 ml-4">
        <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <button 
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
        >
            <LogOut size={20} />
        </button>
    </div>
  );
}