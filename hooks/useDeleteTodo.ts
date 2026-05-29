import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const result = await apiClient.deleteTodo(id);
      if (!result.success) {
        throw new Error(result.errorMessage ?? result.errorCode ?? "Failed to delete todo");
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
