/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import StaffCard from "../staff/StaffCard";
import { IStaff } from "../staff/IStaff";

afterEach(cleanup);

function makeStaff(overrides: Partial<IStaff> = {}): IStaff {
  return {
    id: 1,
    username: "ada.lovelace",
    password: "",
    firstName: "Ada",
    lastName: "Lovelace",
    phone: "8005551234",
    email: "ada@tableserve.test",
    isManager: false,
    isAdmin: false,
    ...overrides,
  };
}

describe("StaffCard", () => {
  it("shows the staff member's username and email", () => {
    const staff = makeStaff();
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("@ada.lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@tableserve.test")).toBeInTheDocument();
  });

  it("shows the phone number the way a user reads it", () => {
    const staff = makeStaff();
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("(800) 555-1234")).toBeInTheDocument();
  });

  it("shows the Manager badge but not the Admin badge for a manager", () => {
    const staff = makeStaff({ isManager: true });
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Manager")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  it("shows the Admin badge but not the Manager badge for an admin", () => {
    const staff = makeStaff({ isAdmin: true });
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.queryByText("Manager")).not.toBeInTheDocument();
  });

  it("shows neither badge for staff who are not managers or admins", () => {
    const staff = makeStaff();
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Manager")).not.toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  it("reveals Edit and Delete when the menu is opened", async () => {
    const user = userEvent.setup();
    const staff = makeStaff();
    render(
      <MemoryRouter>
        <StaffCard staff={staff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
