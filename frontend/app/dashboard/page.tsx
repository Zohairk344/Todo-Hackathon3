// Implements: T011, T017
import { redirect } from "next/navigation";
import { TaskList } from "@/components/task-list";
import { AddTaskForm } from "@/components/add-task-form";
import { api, type Task } from "@/lib/api";
import { auth } from "@/lib/auth-server"; 
import { headers } from "next/headers";
import { AuthError } from "@/lib/errors";

export default async function DashboardPage() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user_id = session.user.id;
  let initialTasks: Task[] = [];
  
  try {
      initialTasks = await api.getTasks(user_id);
  } catch (error: unknown) {
      if (error instanceof AuthError || (error instanceof Error && error.message === "Unauthorized")) {
          redirect("/sign-in");
      } else {
          console.error("Failed to fetch initial tasks:", error);
      }
  }

  return (
    <div className="container mx-auto py-10 px-4 animate-enter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <AddTaskForm user_id={user_id} />
      </div>
      <TaskList initialTasks={initialTasks} user_id={user_id} />
    </div>
  );
}
