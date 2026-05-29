import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeApiError } from "@/__tests__/mocks/factories";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";

describe("useDeleteTodo", () => {
  it("resolves (void) when DELETE returns 204 with no body", async () => {
    const { result } = renderHook(() => useDeleteTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate("test-id-1"));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeUndefined();
  });

  it("sets isError when the API returns failure", async () => {
    server.use(
      http.delete("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Failed to delete todo")),
      ),
    );
    const { result } = renderHook(() => useDeleteTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate("test-id-1"));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Failed to delete todo");
  });
});
