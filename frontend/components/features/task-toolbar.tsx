"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterStatus = "all" | "pending" | "completed";

interface TaskToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  className?: string;
  onCleanup?: () => void;
  canCleanup?: boolean;
}

export function TaskToolbar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  className,
  onCleanup,
  canCleanup,
}: TaskToolbarProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6", className)}>
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </Button>
        </div>
        
        {canCleanup && onCleanup && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCleanup}
            className="text-muted-foreground hover:text-destructive"
            title="Clear all completed tasks"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Cleanup</span>
          </Button>
        )}
      </div>
    </div>
  );
}