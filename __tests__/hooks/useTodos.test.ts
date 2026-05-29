import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import {
  makeTodo,
  makePagedResult,
  makeApiResponse,
  makeApiError,
} from "@/__tests__/mocks/factories";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useTodos } from "@/hooks/useTodos";

describe("useTodos", () => {
  it("returns paged todo data on success", async () => {
    const todos = [makeTodo({ title: "Hook Todo" })];
    server.use(
      http.get("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiResponse(makePagedResult(todos))),
      ),
    );
    const { result } = renderHook(() => useTodos(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toHaveLength(1);
    expect(result.current.data?.items[0].title).toBe("Hook Todo");
  });

  it("sets isError and surfaces the errorMessage when the API returns failure", async () => {
    server.use(
      http.get("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Failed to fetch todos")),
      ),
    );
    const { result } = renderHook(() => useTodos(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Failed to fetch todos");
  });
});
