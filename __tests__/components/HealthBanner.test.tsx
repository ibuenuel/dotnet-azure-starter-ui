import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@/__tests__/mocks/server";
import { HealthBanner } from "@/components/shared/HealthBanner";
import { renderWithProviders } from "@/__tests__/utils/renderWithProviders";

describe("HealthBanner", () => {
  it("is hidden on initial render before the first health check resolves", () => {
    renderWithProviders(<HealthBanner />);
    expect(screen.queryByText(/cannot reach the api/i)).not.toBeInTheDocument();
  });

  it("shows the banner when the health check returns non-2xx", async () => {
    server.use(
      http.get("http://localhost:8080/health", () => new HttpResponse(null, { status: 503 })),
    );
    renderWithProviders(<HealthBanner />);
    await waitFor(() => expect(screen.getByText(/cannot reach the api/i)).toBeInTheDocument());
  });

  it("hides the banner when Dismiss is clicked", async () => {
    const user = userEvent.setup();
    server.use(
      http.get("http://localhost:8080/health", () => new HttpResponse(null, { status: 503 })),
    );
    renderWithProviders(<HealthBanner />);
    await waitFor(() => expect(screen.getByText(/cannot reach the api/i)).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(screen.queryByText(/cannot reach the api/i)).not.toBeInTheDocument();
  });
});
