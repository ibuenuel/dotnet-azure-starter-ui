import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useHealth } from "@/hooks/useHealth";

describe("useHealth", () => {
  it("returns isHealthy: true when /health responds with 200", async () => {
    const { result } = renderHook(() => useHealth(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isHealthy).toBe(true));
  });

  it("returns isHealthy: false when /health responds with non-2xx", async () => {
    server.use(
      http.get("http://localhost:8080/health", () => new HttpResponse(null, { status: 503 })),
    );
    const { result } = renderHook(() => useHealth(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isHealthy).toBe(false));
  });
});
