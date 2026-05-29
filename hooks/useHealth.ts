import { useQuery } from "@tanstack/react-query";
import { checkHealth } from "@/lib/apiClient";

export function useHealth() {
  const { data } = useQuery<boolean>({
    queryKey: ["health"],
    queryFn: checkHealth,
    refetchInterval: 30_000,
    retry: false,
    staleTime: 0,
  });

  return { isHealthy: data !== false };
}
