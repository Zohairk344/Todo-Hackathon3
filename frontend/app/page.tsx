import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background bg-grid-pattern relative overflow-hidden">
      {/* Gradient overlay to soften the grid edges */}
      <div className="absolute inset-0 bg-background/40 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 font-mono">

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Master Your Day <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
            With Clarity
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          The task management system designed for flow. Organize your life with a tool that gets out of your way and lets you focus on what matters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link href="/sign-up">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12 gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-12 hover:bg-muted/50">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
