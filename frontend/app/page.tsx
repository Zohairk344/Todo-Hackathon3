import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center relative z-10">
      
      {/* Hero Section */}
      <div className="relative max-w-3xl space-y-8 p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
            Master Your Day <br /> With Clarity
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            The task management system designed for flow. Organize your life with a tool that gets out of your way and lets you focus on what matters.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white rounded-full backdrop-blur-sm transition-all">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

    </main>
  );
}