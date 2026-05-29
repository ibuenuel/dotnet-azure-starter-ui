"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTodo } from "@/hooks/useTodo";
import { TodoForm } from "@/components/todos/TodoForm";
import { TodoDeleteButton } from "@/components/todos/TodoDeleteButton";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TodoPriority, PRIORITY_LABEL, PRIORITY_CLASS } from "@/types/todo";
import { cn } from "@/lib/utils";

interface TodoDetailProps {
  id: string;
}

export function TodoDetail({ id }: TodoDetailProps) {
  const router = useRouter();
  const { data: todo, isLoading, isError, error } = useTodo(id);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (isError || !todo) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {error?.message ?? "Todo not found."}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Edit Todo</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
        <div className="max-w-lg">
          <TodoForm
            todo={todo}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1
            className={cn(
              "text-2xl font-bold tracking-tight",
              todo.isCompleted && "line-through text-muted-foreground",
            )}
          >
            {todo.title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge className={cn("border-0", PRIORITY_CLASS[todo.priority])}>
              {PRIORITY_LABEL[todo.priority]}
            </Badge>
            {todo.isCompleted && (
              <Badge variant="outline" className="text-muted-foreground">
                Completed
              </Badge>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <TodoDeleteButton
            id={todo.id}
            onSuccess={() => router.push("/todos")}
          />
        </div>
      </div>

      <div className="space-y-4 text-sm">
        {todo.description && (
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Description</p>
            <p className="text-foreground">{todo.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Due Date</p>
            <p className={cn(
              "text-foreground",
              todo.isOverdue && !todo.isCompleted && "text-destructive font-medium",
            )}>
              {todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : "—"}
              {todo.isOverdue && !todo.isCompleted && " (Overdue)"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Created</p>
            <p className="text-foreground">{new Date(todo.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Updated</p>
            <p className="text-foreground">{new Date(todo.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={() => router.push("/todos")}>
          ← Back to todos
        </Button>
      </div>
    </div>
  );
}
