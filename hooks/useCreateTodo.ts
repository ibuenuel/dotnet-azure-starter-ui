import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { TodoItem, CreateTodoRequest } from "@/types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<TodoItem, Error, CreateTodoRequest>({
    mutationFn: async (body) => {
      const result = await apiClient.createTodo(body);
      if (!result.success || !result.data) {
        throw new Error(result.errorMessage ?? result.errorCode ?? "Failed to create todo");
      }
      return result.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
