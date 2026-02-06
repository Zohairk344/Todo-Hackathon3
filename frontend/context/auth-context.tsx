"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkSession = async () => {
    try {
      // Just try to fetch user. The apiRequest automatically attaches the token if it exists.
      const data = await apiRequest<{ user: User }>("/api/auth/get-session");
      setUser(data.user);
    } catch (error) {
      setUser(null);
      // Only redirect if trying to access a protected page
      if (pathname.includes("/dashboard")) {
         router.push("/sign-in");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, [pathname]); // Re-check on navigation or initial load

  const signIn = async (email: string, password: string) => {
    try {
      // Backend now returns { access_token, user }
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      
      const response = await fetch("/api/auth/sign-in/email", {
          method: "POST",
          body: formData,
      });

      if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.detail || "Login failed");
      }

      const data = await response.json();
      
      // CRITICAL: Save Token
      if (data.access_token) {
          localStorage.setItem("auth_token", data.access_token);
      }

      setUser(data.user);
      router.push("/dashboard");
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      await apiRequest("/api/auth/sign-up/email", {
        method: "POST",
        body: JSON.stringify({ email, password, full_name: fullName }),
      });
      // Auto login after signup
      await signIn(email, password);
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("auth_token"); // Clear Token
      setUser(null);
      router.push("/sign-in");
      toast.success("Signed out");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading && pathname.includes("/dashboard")) {
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
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};