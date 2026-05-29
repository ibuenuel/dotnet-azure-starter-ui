"use client";

import { useState } from "react";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { Button } from "@/components/ui/button";

interface TodoDeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export function TodoDeleteButton({ id, onSuccess }: TodoDeleteButtonProps) {
  const { mutate, isPending } = useDeleteTodo();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="destructive"
        size="sm"
        disabled={isPending}
        onClick={() => {
          setDeleteError(null);
          mutate(id, {
            onSuccess,
            onError: (err) => setDeleteError(err.message),
          });
        }}
      >
        {isPending ? "Deleting…" : "Delete"}
      </Button>
      {deleteError && (
        <p className="text-xs text-destructive">{deleteError}</p>
      )}
    </div>
  );
}
