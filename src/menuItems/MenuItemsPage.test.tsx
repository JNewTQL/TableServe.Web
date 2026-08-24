/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { Toaster } from "react-hot-toast";
import { server } from "../mocks/server";
import MenuItemsPage from "./MenuItemsPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MenuItemsPage", () => {
  it("renders a card for each menu item the API returns", async () => {
    render(
      <MemoryRouter>
        <MenuItemsPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Loaded Fries")).toBeInTheDocument();
    expect(await screen.findByText("House Burger")).toBeInTheDocument();
  });
  it("shows skeletons while the menu items are loading", async () => {
    const { container } = render(
      <MemoryRouter>
        <MenuItemsPage />
      </MemoryRouter>,
    );

    expect(container.querySelectorAll(".skeleton").length).toBeGreaterThan(0);

    await screen.findByText("Loaded Fries");
    expect(container.querySelectorAll(".skeleton")).toHaveLength(0);
  });
  it("shows an error toast when the API fails", async () => {
    server.use(
      http.get("http://localhost:5038/api/menuitems", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(
      <MemoryRouter>
        <MenuItemsPage />
        <Toaster />
      </MemoryRouter>,
    );

    expect(await screen.findByText("There was an error saving or retrieving data.")).toBeInTheDocument();
  });
});
