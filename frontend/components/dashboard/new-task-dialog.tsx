"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, Task } from "@/services/todo-service";

interface NewTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onConfirm: (data: Partial<Task>) => Promise<void>;
}

export function NewTaskDialog({ isOpen, onClose, categories, onConfirm }: NewTaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("none");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const payload: Partial<Task> = { 
        title, 
        description, 
        priority: priority as Task["priority"] 
      };
      if (categoryId && categoryId !== "none") {
          payload.categoryId = parseInt(categoryId);
      }
      await onConfirm(payload);
      // Reset
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setCategoryId("none");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">Desc</Label>
            <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category</Label>
            <select 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                <option value="none">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Priority</Label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading || !title}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
