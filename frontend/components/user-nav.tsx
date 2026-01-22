"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserNav() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
        <span className="text-sm font-medium hidden sm:inline-block mr-2">
            {session?.user?.name}
        </span>
        <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">Settings</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={async () => {
            await authClient.signOut();
            router.push("/");
        }}>
            Sign Out
        </Button>
    </div>
  )
}
