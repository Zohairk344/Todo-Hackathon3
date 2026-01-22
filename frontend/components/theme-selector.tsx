"use client";

import { useThemeStyle, ThemeStyle } from "@/lib/theme-style-context";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ThemeSelector() {
  const { style, setStyle } = useThemeStyle();

  const themes: { id: ThemeStyle; name: string; description: string; className: string }[] = [
    { 
      id: "pro", 
      name: "Pro", 
      description: "Clean, professional, and balanced.",
      className: "rounded-lg border-muted hover:border-primary/50 bg-background text-foreground" 
    },
    { 
      id: "playful", 
      name: "Playful", 
      description: "Rounded, friendly, and vibrant.",
      className: "rounded-[1.25rem] border-purple-200 bg-white text-slate-900 hover:border-purple-400 font-[family-name:var(--font-poppins)]" 
    },
    { 
      id: "hacker", 
      name: "Hacker", 
      description: "Terminal aesthetics. High contrast.",
      className: "rounded-none border-green-600 bg-black text-green-500 hover:bg-zinc-950 font-mono" 
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setStyle(theme.id)}
          className={cn(
            "relative flex flex-col items-start p-6 text-left border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            theme.className,
            style === theme.id ? "border-primary ring-2 ring-primary ring-offset-2" : "opacity-80 hover:opacity-100"
          )}
        >
          <div className="mb-2 font-bold text-lg">{theme.name}</div>
          <div className="text-xs opacity-80 leading-relaxed">{theme.description}</div>
          {style === theme.id && (
            <div className="absolute top-2 right-2 p-1 rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}