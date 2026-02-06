"use client";
import { useAuth } from "@/context/auth-context";
import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

export function UserNav() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
        await signOut();
    } catch (e) {
        console.error("Sign out failed", e);
    } finally {
        setLoading(false);
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
            {loading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
        </button>
    </div>
  );
}
