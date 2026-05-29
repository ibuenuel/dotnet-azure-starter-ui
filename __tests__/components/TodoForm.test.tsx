import { screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeTodo, makeApiResponse } from "@/__tests__/mocks/factories";
import { renderWithProviders } from "@/__tests__/utils/renderWithProviders";
import { TodoForm } from "@/components/todos/TodoForm";
import { TodoPriority } from "@/types/todo";

vi.mock("next/navigation");

describe("TodoForm", () => {
  const defaultProps = { onSuccess: vi.fn(), onCancel: vi.fn() };

  it("shows a validation error when title is empty and form is submitted", async () => {
    renderWithProviders(<TodoForm {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: /create todo/i }));
    await waitFor(() => expect(screen.getByText("Title is required")).toBeInTheDocument());
  });

  it("shows a validation error when title exceeds 200 characters", async () => {
    renderWithProviders(<TodoForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "a".repeat(201) } });
    await userEvent.click(screen.getByRole("button", { name: /create todo/i }));
    await waitFor(() =>
      expect(screen.getByText("Title must be 200 characters or less")).toBeInTheDocument(),
    );
  });

  it("submits a POST request and calls onSuccess in create mode", async () => {
    const onSuccess = vi.fn();
    let capturedBody: unknown;
    server.use(
      http.post("http://localhost:8080/api/todos", async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(makeApiResponse(makeTodo({ title: "New Todo" })));
      }),
    );
    renderWithProviders(<TodoForm onSuccess={onSuccess} onCancel={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Title"), "New Todo");
    await userEvent.click(screen.getByRole("button", { name: /create todo/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect((capturedBody as { title: string }).title).toBe("New Todo");
  });

  it("pre-fills form values and submits PUT in edit mode", async () => {
    const onSuccess = vi.fn();
    const todo = makeTodo({ id: "abc", title: "Existing Todo", priority: TodoPriority.High });
    server.use(
      http.put("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiResponse(todo)),
      ),
    );
    renderWithProviders(<TodoForm todo={todo} onSuccess={onSuccess} onCancel={vi.fn()} />);
    expect(screen.getByLabelText("Title")).toHaveValue("Existing Todo");
    await userEvent.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it("calls onCancel when the Cancel button is clicked", async () => {
    const onCancel = vi.fn();
    renderWithProviders(<TodoForm onSuccess={vi.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
