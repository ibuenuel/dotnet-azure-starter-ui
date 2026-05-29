import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { PagedResult } from "@/types/api";
import type { TodoItem } from "@/types/todo";

export function useTodos(page = 1, pageSize = 20) {
  return useQuery<PagedResult<TodoItem>>({
    queryKey: ["todos", page, pageSize],
    queryFn: async () => {
      const result = await apiClient.getTodos(page, pageSize);
      if (!result.success || !result.data) {
        throw new Error(result.errorMessage ?? result.errorCode ?? "Failed to fetch todos");
      }
      return result.data;
    },
  });
}
