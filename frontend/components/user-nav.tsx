"use client";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserNav() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
        <span className="text-sm font-medium hidden sm:inline-block mr-2">
            {user?.name}
        </span>
        <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">Settings</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={async () => {
            await signOut();
        }}>
            Sign Out
        </Button>
    </div>
  )
}