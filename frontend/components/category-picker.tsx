"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { cn, getContrastColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/context/tasks-context";
import { toast } from "sonner";

interface CategoryPickerProps {
  user_id: string; // Passed from parent, but could use useAuth
  value: number | null;
  onChange: (value: number | null) => void;
}

const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b"
];

export function CategoryPicker({ user_id, value, onChange }: CategoryPickerProps) {
  const { categories, addCategory } = useTasks();
  const [open, setOpen] = React.useState(false);
  
  // New Category State
  const [isCreating, setIsCreating] = React.useState(false);
  const [newCatName, setNewCatName] = React.useState("");
  const [newCatColor, setNewCatColor] = React.useState(COLORS[0]);

  const handleCreate = async () => {
    if (!newCatName.trim()) return;
    try {
      await addCategory({ name: newCatName, color: newCatColor });
      // The context will refresh categories
      // We'll need to find the new one to select it if we want to be fancy
      // But for now, just closing and letting user select is fine
      setIsCreating(false);
      setNewCatName("");
      // Selected ID will be handled by context refresh + user selecting
    } catch (error) {
      // toast handled in context
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast.info("Category deletion coming to service layer soon");
  };

  const selectedCategory = categories.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setIsCreating(false);
    }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          style={selectedCategory ? {
              backgroundColor: selectedCategory.color,
              color: getContrastColor(selectedCategory.color),
              borderColor: selectedCategory.color
          } : {}}
        >
          {selectedCategory ? selectedCategory.name : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="start">
        <div className="p-2">
            {!isCreating ? (
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => {
                            onChange(null);
                            setOpen(false);
                        }}
                    >
                        No Category
                        {value === null && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    <div className="max-h-50 overflow-y-auto space-y-1">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center gap-1 group">
                                <Button
                                    variant="ghost"
                                    className="flex-1 justify-start font-normal"
                                    onClick={() => {
                                        onChange(category.id);
                                        setOpen(false);
                                    }}
                                >
                                    <span className="w-3 h-3 rounded-full mr-2 shrink-0" style={{ backgroundColor: category.color }} />
                                    <span className="truncate">{category.name}</span>
                                    {value === category.id && <Check className="ml-auto h-4 w-4" />}
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" 
                                    onClick={(e) => handleDelete(e, category.id)}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="border-t my-1 pt-1" />
                    <Button variant="outline" className="w-full justify-center text-xs h-8" onClick={() => setIsCreating(true)}>
                        <Plus className="mr-2 h-3 w-3" /> Create New
                    </Button>
                </div>
            ) : (
                <div className="space-y-3 p-1">
                    <div className="font-medium text-sm">New Category</div>
                    <Input 
                        placeholder="Name" 
                        value={newCatName} 
                        onChange={e => setNewCatName(e.target.value)}
                        className="h-8 text-sm"
                        autoFocus
                    />
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {COLORS.map(c => (
                            <button
                                key={c}
                                className={cn(
                                    "w-5 h-5 rounded-full border transition-all",
                                    newCatColor === c ? "ring-2 ring-offset-1 ring-black dark:ring-white scale-110" : "hover:scale-110"
                                )}
                                style={{ backgroundColor: c }}
                                onClick={() => setNewCatColor(c)}
                                type="button"
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="flex-1 h-7 text-xs" onClick={() => setIsCreating(false)}>Cancel</Button>
                        <Button size="sm" className="flex-1 h-7 text-xs" onClick={handleCreate}>Save</Button>
                    </div>
                </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  )
}