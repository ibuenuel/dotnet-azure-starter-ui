import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import {
  makeTodo,
  makePagedResult,
  makeApiResponse,
  makeApiError,
} from "@/__tests__/mocks/factories";
import { renderWithProviders } from "@/__tests__/utils/renderWithProviders";
import { TodoList } from "@/components/todos/TodoList";

vi.mock("next/link");
vi.mock("next/navigation");

describe("TodoList", () => {
  it("shows an ErrorState when the fetch returns a failure response", async () => {
    server.use(
      http.get("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Failed to fetch todos")),
      ),
    );
    renderWithProviders(<TodoList />);
    await waitFor(() => expect(screen.getByText("Failed to fetch todos")).toBeInTheDocument());
  });

  it("shows the empty state when the items array is empty", async () => {
    server.use(
      http.get("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiResponse(makePagedResult([]))),
      ),
    );
    renderWithProviders(<TodoList />);
    await waitFor(() => expect(screen.getByText(/no todos yet/i)).toBeInTheDocument());
  });

  it("renders todo cards and the count label when data arrives", async () => {
    const todos = [
      makeTodo({ title: "First Todo" }),
      makeTodo({ id: "id-2", title: "Second Todo" }),
    ];
    server.use(
      http.get("http://localhost:8080/api/todos", () =>
        HttpResponse.json(makeApiResponse(makePagedResult(todos))),
      ),
    );
    renderWithProviders(<TodoList />);
    await waitFor(() => expect(screen.getByText("First Todo")).toBeInTheDocument());
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
    expect(screen.getByText(/2 todos/i)).toBeInTheDocument();
  });

  it("opens the create dialog when New Todo is clicked", async () => {
    renderWithProviders(<TodoList />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /new todo/i })).toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole("button", { name: /new todo/i }));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
  });
});
