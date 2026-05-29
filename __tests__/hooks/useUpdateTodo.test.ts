import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeTodo, makeApiResponse, makeApiError } from "@/__tests__/mocks/factories";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { TodoPriority } from "@/types/todo";

const updateVars = {
  id: "test-id-1",
  body: {
    title: "Updated",
    description: null,
    isCompleted: false,
    dueDate: null,
    priority: TodoPriority.Medium,
  },
};

describe("useUpdateTodo", () => {
  it("resolves with the updated TodoItem on success", async () => {
    server.use(
      http.put("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiResponse(makeTodo({ title: "Updated" }))),
      ),
    );
    const { result } = renderHook(() => useUpdateTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate(updateVars));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe("Updated");
  });

  it("sets isError when the API returns failure", async () => {
    server.use(
      http.put("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Failed to update todo")),
      ),
    );
    const { result } = renderHook(() => useUpdateTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate(updateVars));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Failed to update todo");
  });
});
