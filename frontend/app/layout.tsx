import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Master your day with flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen w-full bg-[#050505] text-gray-100 selection:bg-pink-500/30`}>
        <AuthProvider>
          {/* GLOBAL BACKGROUND MESH - Applies to ALL pages */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/10 blur-[120px]" />
            <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[100px]" />
          </div>

          {/* Page Content */}
          <div className="relative z-10">
            {children}
          </div>
          <Toaster position="bottom-right" theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}