import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorState } from "@/components/shared/ErrorState";

describe("ErrorState", () => {
  it("renders the default message when none provided", () => {
    render(<ErrorState />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders a custom message", () => {
    render(<ErrorState message="Network error" />);
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows retry button only when onRetry is provided and calls it on click", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    const { rerender } = render(<ErrorState />);
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();

    rerender(<ErrorState onRetry={onRetry} />);
    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
