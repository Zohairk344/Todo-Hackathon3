import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeStyleProvider } from "@/lib/theme-style-context";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600"], 
  variable: "--font-poppins" 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  title: "Frontend Task UI",
  description: "Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeStyleProvider>
          {children}
          <Toaster />
        </ThemeStyleProvider>
      </body>
    </html>
  );
}