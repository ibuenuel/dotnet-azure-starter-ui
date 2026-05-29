"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { useTodos } from "@/hooks/useTodos";
import { TodoCard } from "@/components/todos/TodoCard";
import { TodoForm } from "@/components/todos/TodoForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

export function TodoList() {
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data, isLoading, isError, error } = useTodos(page, PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {error?.message ?? "Failed to load todos."}
      </div>
    );
  }

  const todos = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data?.totalCount ?? 0} {data?.totalCount === 1 ? "todo" : "todos"}
        </p>

        <Dialog.Root open={isCreateOpen} onOpenChange={(open) => setIsCreateOpen(open)}>
          <Dialog.Trigger render={<Button size="sm">New Todo</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50" />
            <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl">
              <Dialog.Title className="mb-4 text-lg font-semibold">New Todo</Dialog.Title>
              <TodoForm
                onSuccess={() => setIsCreateOpen(false)}
                onCancel={() => setIsCreateOpen(false)}
              />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {todos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground">No todos yet.</p>
          <Button size="sm" onClick={() => setIsCreateOpen(true)}>
            Create your first todo
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
