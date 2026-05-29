import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeTodo, makeApiResponse } from "@/__tests__/mocks/factories";
import { createWrapper } from "@/__tests__/utils/renderWithProviders";
import { useTodo } from "@/hooks/useTodo";

describe("useTodo", () => {
  it("returns a single todo on success", async () => {
    server.use(
      http.get("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiResponse(makeTodo({ id: "abc", title: "Single Todo" }))),
      ),
    );
    const { result } = renderHook(() => useTodo("abc"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe("Single Todo");
  });

  it("does not fire the query when id is empty", () => {
    const { result } = renderHook(() => useTodo(""), { wrapper: createWrapper() });
    expect(result.current.status).toBe("pending");
    expect(result.current.fetchStatus).toBe("idle");
  });
});
