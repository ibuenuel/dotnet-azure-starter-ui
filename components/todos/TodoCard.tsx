"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoDeleteButton } from "@/components/todos/TodoDeleteButton";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { type TodoItem, PRIORITY_LABEL, PRIORITY_CLASS } from "@/types/todo";
import { cn } from "@/lib/utils";

interface TodoCardProps {
  todo: TodoItem;
}

export function TodoCard({ todo }: TodoCardProps) {
  const { mutate, isPending } = useUpdateTodo();
  const [updateError, setUpdateError] = useState<string | null>(null);

  function handleToggleComplete(checked: boolean) {
    setUpdateError(null);
    mutate(
      {
        id: todo.id,
        body: {
          title: todo.title,
          description: todo.description ?? null,
          isCompleted: checked,
          dueDate: todo.dueDate ?? null,
          priority: todo.priority,
        },
      },
      { onError: (err) => setUpdateError(err.message) },
    );
  }

  return (
    <Card className="flex h-full flex-col gap-0">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={cn("text-base leading-snug", todo.isCompleted && "line-through text-muted-foreground")}
          >
            {todo.title}
          </CardTitle>
          <Badge className={cn("shrink-0 border-0", PRIORITY_CLASS[todo.priority])}>
            {PRIORITY_LABEL[todo.priority]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3 space-y-2">
        {todo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{todo.description}</p>
        )}
        {todo.dueDate && (
          <p
            className={cn(
              "text-xs",
              todo.isOverdue && !todo.isCompleted ? "text-destructive font-medium" : "text-muted-foreground",
            )}
          >
            Due {new Date(todo.dueDate).toLocaleDateString()}
            {todo.isOverdue && !todo.isCompleted && " — Overdue"}
          </p>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`complete-${todo.id}`}
            checked={todo.isCompleted}
            onChange={(e) => handleToggleComplete(e.target.checked)}
            disabled={isPending}
            className="size-4 rounded border-input accent-primary"
          />
          <label htmlFor={`complete-${todo.id}`} className="text-xs text-muted-foreground cursor-pointer">
            {todo.isCompleted ? "Completed" : "Mark as complete"}
          </label>
        </div>
        {updateError && (
          <p className="text-xs text-destructive">{updateError}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-2 pt-0">
        <Link
          href={`/todos/${todo.id}`}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Details
        </Link>
        <TodoDeleteButton id={todo.id} />
      </CardFooter>
    </Card>
  );
}
