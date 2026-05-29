"use client";

import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { Button } from "@/components/ui/button";

interface TodoDeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export function TodoDeleteButton({ id, onSuccess }: TodoDeleteButtonProps) {
  const { mutate, isPending } = useDeleteTodo();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => mutate(id, { onSuccess })}
    >
      {isPending ? "Deleting…" : "Delete"}
    </Button>
  );
}
