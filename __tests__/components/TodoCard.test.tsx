import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeTodo, makeApiError } from "@/__tests__/mocks/factories";
import { renderWithProviders } from "@/__tests__/utils/renderWithProviders";
import { TodoCard } from "@/components/todos/TodoCard";
import { TodoPriority, PRIORITY_LABEL } from "@/types/todo";

vi.mock("next/link");
vi.mock("next/navigation");

describe("TodoCard", () => {
  it("renders the todo title and priority badge", () => {
    const todo = makeTodo({ title: "My Todo", priority: TodoPriority.High });
    renderWithProviders(<TodoCard todo={todo} />);
    expect(screen.getByText("My Todo")).toBeInTheDocument();
    expect(screen.getByText(PRIORITY_LABEL[TodoPriority.High])).toBeInTheDocument();
  });

  it("renders a checked checkbox for completed todos", () => {
    const todo = makeTodo({ isCompleted: true });
    renderWithProviders(<TodoCard todo={todo} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("shows an inline error when the completion toggle PUT fails", async () => {
    server.use(
      http.put("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Update failed")),
      ),
    );
    const todo = makeTodo({ isCompleted: false });
    renderWithProviders(<TodoCard todo={todo} />);
    await userEvent.click(screen.getByRole("checkbox"));
    await waitFor(() => expect(screen.getByText("Update failed")).toBeInTheDocument());
  });

  it("renders a Details link pointing to the todo's id", () => {
    const todo = makeTodo({ id: "abc-123" });
    renderWithProviders(<TodoCard todo={todo} />);
    const link = screen.getByRole("link", { name: /details/i });
    expect(link).toHaveAttribute("href", "/todos/abc-123");
  });
});
