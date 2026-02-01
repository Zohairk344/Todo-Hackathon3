"use client";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";

export function UserNav({ email, name }: { email: string; name: string }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";
    try {
        await fetch(`${API_URL}/api/auth/sign-out`, {
            method: "POST",
            credentials: "include"
        });
        // Force full reload to clear any client state
        window.location.href = "/sign-in";
    } catch (e) {
        console.error("Sign out failed", e);
        window.location.href = "/sign-in";
    }
  };

  return (
    <div className="flex items-center gap-4 border-l pl-4 ml-4">
        <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <button 
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
            title="Sign Out"
        >
            <LogOut size={20} />
            <span className="sr-only sm:not-sr-only sm:inline">{loading ? "..." : "Sign Out"}</span>
        </button>
    </div>
  );
}
