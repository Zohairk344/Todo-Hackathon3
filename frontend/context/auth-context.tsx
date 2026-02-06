"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`/api/auth/get-session`, {
          credentials: "include", // Crucial: Sends cookies from browser
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
