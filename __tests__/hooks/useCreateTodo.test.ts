import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeTodo, makeApiResponse, makeApiError } from "@/__tests__/mocks/factories";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useCreateTodo } from "@/hooks/useCreateTodo";
import { TodoPriority } from "@/types/todo";

const newTodoBody = { title: "Created", priority: TodoPriority.Medium };

describe("useCreateTodo", () => {
  it("resolves with the created TodoItem on success", async () => {
    server.use(
      http.post("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiResponse(makeTodo({ title: "Created" }))),
      ),
    );
    const { result } = renderHook(() => useCreateTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate(newTodoBody));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe("Created");
  });

  it("sets isError when the API returns failure", async () => {
    server.use(
      http.post("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiError("VALIDATION_ERROR", "Title is required")),
      ),
    );
    const { result } = renderHook(() => useCreateTodo(), { wrapper: createWrapper() });
    act(() => result.current.mutate(newTodoBody));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Title is required");
  });
});
