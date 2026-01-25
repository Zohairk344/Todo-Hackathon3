"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border h-10 w-[116px]" />
    );
  }

  const modes = [
    { id: "light", icon: <Sun className="h-4 w-4" />, label: "Light" },
    { id: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
    { id: "system", icon: <Monitor className="h-4 w-4" />, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border h-10 w-[116px]">
      {modes.map((m) => (
        <Button
          key={m.id}
          variant={theme === m.id ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setTheme(m.id)}
          className={cn(
            "h-8 w-8 p-0",
            theme === m.id && "shadow-sm bg-background"
          )}
          title={m.label}
        >
          {m.icon}
          <span className="sr-only">{m.label}</span>
        </Button>
      ))}
    </div>
  );
}
