/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { Toaster } from "react-hot-toast";
import { server } from "../mocks/server";
import StaffPage from "./StaffPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("StaffPage", () => {
  it("renders a card for each staff the API returns", async () => {
    render(
      <MemoryRouter>
        <StaffPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(await screen.findByText("Grace Hopper")).toBeInTheDocument();
  });

  it("shows skeletons while the staffs are loading", async () => {
    const { container } = render(
      <MemoryRouter>
        <StaffPage />
      </MemoryRouter>,
    );

    expect(container.querySelectorAll(".skeleton").length).toBeGreaterThan(0);

    await screen.findByText("Ada Lovelace");
    expect(container.querySelectorAll(".skeleton")).toHaveLength(0);
  });

  it("shows an error toast when the API fails", async () => {
    server.use(
      http.get("http://localhost:5038/api/staff", () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    render(
      <MemoryRouter>
        <StaffPage />
        <Toaster />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Please sign in again.")).toBeInTheDocument();
  });

  it("removes a staff member when Delete is confirmed", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <MemoryRouter>
        <StaffPage />
        <Toaster />
      </MemoryRouter>,
    );

    await screen.findByText("ada.lovelace");
    const card = screen.getByText("ada.lovelace").closest("div") as HTMLElement;

    await user.click(within(card).getByRole("button"));
    await user.click(within(card).getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("ada.lovelace")).not.toBeInTheDocument();
    });

    expect(screen.getByText("grace.hopper")).toBeInTheDocument();
  });
});
