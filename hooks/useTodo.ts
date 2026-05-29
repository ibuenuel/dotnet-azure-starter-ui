import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { TodoItem } from "@/types/todo";

export function useTodo(id: string) {
  return useQuery<TodoItem>({
    queryKey: ["todos", id],
    queryFn: async () => {
      const result = await apiClient.getTodo(id);
      if (!result.success || !result.data) {
        throw new Error(result.errorMessage ?? result.errorCode ?? "Failed to fetch todo");
      }
      return result.data;
    },
    enabled: !!id,
  });
}
