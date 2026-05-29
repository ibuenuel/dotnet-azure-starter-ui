"use client";

import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTodo } from "@/hooks/useCreateTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { TodoPriority, type TodoItem } from "@/types/todo";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  description: z.string().optional(),
  priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  dueDate: z.string().nullable().optional(),
  isCompleted: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

interface TodoFormProps {
  todo?: TodoItem;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TodoForm({ todo, onSuccess, onCancel }: TodoFormProps) {
  const isEditing = !!todo;
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const isPending = createTodo.isPending || updateTodo.isPending;
  const mutationError = createTodo.error ?? updateTodo.error;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(schema),
    defaultValues: {
      title: todo?.title ?? "",
      description: todo?.description ?? "",
      priority: todo?.priority ?? TodoPriority.Medium,
      dueDate: todo?.dueDate?.slice(0, 10) ?? "",
      isCompleted: todo?.isCompleted ?? false,
    },
  });

  function handleFormSubmit(values: FormValues) {
    const dueDate = values.dueDate || null;
    const priority = values.priority;

    if (isEditing) {
      updateTodo.mutate(
        {
          id: todo.id,
          body: {
            title: values.title,
            description: values.description || null,
            isCompleted: values.isCompleted ?? todo.isCompleted,
            dueDate,
            priority,
          },
        },
        { onSuccess },
      );
    } else {
      createTodo.mutate(
        {
          title: values.title,
          description: values.description || null,
          dueDate,
          priority,
        },
        { onSuccess },
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          )}
          placeholder="Optional description"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="priority">Priority</Label>
        <select
          id="priority"
          {...register("priority", { valueAsNumber: true })}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value={TodoPriority.High}>High</option>
          <option value={TodoPriority.Medium}>Medium</option>
          <option value={TodoPriority.Low}>Low</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" {...register("dueDate")} />
      </div>

      {isEditing && (
        <div className="flex items-center gap-2">
          <input
            id="isCompleted"
            type="checkbox"
            {...register("isCompleted")}
            className="size-4 rounded border-input accent-primary"
          />
          <Label htmlFor="isCompleted">Completed</Label>
        </div>
      )}

      {mutationError && <p className="text-sm text-destructive">{mutationError.message}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : isEditing ? "Save Changes" : "Create Todo"}
        </Button>
      </div>
    </form>
  );
}
