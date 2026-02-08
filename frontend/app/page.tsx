import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center relative z-10">
      
      {/* Hero Section */}
      <div className="relative max-w-3xl space-y-8 p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        <div className="space-y-4">
          {/* Neon Gradient Text */}
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm pb-2">
            Master Your Day <br /> With Clarity
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            The task management system designed for flow. Organize your life with a tool that gets out of your way and lets you focus on what matters.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link href="/sign-up">
            {/* Gradient Button */}
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-full shadow-lg shadow-pink-500/20 transition-all hover:scale-105 border-0">
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
