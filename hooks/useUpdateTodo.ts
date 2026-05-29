import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { TodoItem, UpdateTodoRequest } from "@/types/todo";

interface UpdateTodoVariables {
  id: string;
  body: UpdateTodoRequest;
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation<TodoItem, Error, UpdateTodoVariables>({
    mutationFn: async ({ id, body }) => {
      const result = await apiClient.updateTodo(id, body);
      if (!result.success || !result.data) {
        throw new Error(result.errorMessage ?? result.errorCode ?? "Failed to update todo");
      }
      return result.data;
    },
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
      void queryClient.invalidateQueries({ queryKey: ["todos", id] });
    },
  });
}
