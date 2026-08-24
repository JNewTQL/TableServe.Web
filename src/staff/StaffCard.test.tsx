/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StaffCard from "./StaffCard";
import { IStaff } from "./IStaff";
import { describe, expect, it } from "vitest";

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
  it("renders the username, email, and avatar initials", () => {
    const mockStaff = makeStaff();

    render(
      <MemoryRouter>
        <StaffCard staff={mockStaff} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("ada.lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@tableserve.test")).toBeInTheDocument();
  });
});
