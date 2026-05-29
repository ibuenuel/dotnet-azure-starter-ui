import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { makeApiError } from "@/__tests__/mocks/factories";
import { renderWithProviders } from "@/__tests__/utils/renderWithProviders";
import { TodoDeleteButton } from "@/components/todos/TodoDeleteButton";

describe("TodoDeleteButton", () => {
  it("renders the Delete button", () => {
    renderWithProviders(<TodoDeleteButton id="test-id-1" />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls onSuccess callback after a successful delete", async () => {
    const onSuccess = vi.fn();
    renderWithProviders(<TodoDeleteButton id="test-id-1" onSuccess={onSuccess} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it("shows an inline error when delete fails", async () => {
    server.use(
      http.delete("http://localhost:8080/api/todos/:id", () =>
        HttpResponse.json(makeApiError("SERVER_ERROR", "Delete failed")),
      ),
    );
    renderWithProviders(<TodoDeleteButton id="test-id-1" />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    await waitFor(() => expect(screen.getByText("Delete failed")).toBeInTheDocument());
  });
});
