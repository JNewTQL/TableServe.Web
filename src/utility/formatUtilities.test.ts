import { describe, it, expect } from "vitest";
import { formatPhoneNumber, getTextBackgroundByStatus } from "./formatUtilities";

describe("getTextBackgroundByStatus", () => {
  it("returns the secondary badge class for PLACED", () => {
    expect(getTextBackgroundByStatus("PLACED")).toBe("text-bg-secondary");
  });

  it("returns the warning badge class for PREPARING", () => {
    expect(getTextBackgroundByStatus("PREPARING")).toBe("text-bg-warning");
  });

  it("returns the info badge class for READY", () => {
    expect(getTextBackgroundByStatus("READY")).toBe("text-bg-info");
  });

  it("returns the success badge class for SERVED", () => {
    expect(getTextBackgroundByStatus("SERVED")).toBe("text-bg-success");
  });

  it("returns the danger badge class for CANCELLED", () => {
    expect(getTextBackgroundByStatus("CANCELLED")).toBe("text-bg-danger");
  });

  it("returns an empty string for an unknown status", () => {
    expect(getTextBackgroundByStatus("BANANA")).toBe("");
  });
});

describe("formatPhoneNumber", () => {
  it("formats a ten-digit number", () => {
    console.log(JSON.stringify(formatPhoneNumber("8005551234")));
    console.log(formatPhoneNumber("8005551234")?.length);
    expect(formatPhoneNumber("8005551234")).toBe("(800) 555-1234");
  });
  it("returns undefined for an empty string", () => {
    expect(formatPhoneNumber("")).toBeUndefined();
  });
  it("returns undefined when the phone is null", () => {
    expect(formatPhoneNumber(null as any)).toBeUndefined();
  });
});
