import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { BASE_URL, translateStatusToErrorMessage, checkStatus, parseJSON } from "./fetchUtilities";

describe("fetchUtilities", () => {
  describe("BASE_URL", () => {
    it("should be set to localhost:5038", () => {
      expect(BASE_URL).toBe("http://localhost:5038/api");
    });
  });

  describe("translateStatusToErrorMessage", () => {
    it("should return 'Please sign in again.' for 401 status", () => {
      const message = translateStatusToErrorMessage(401);
      expect(message).toBe("Please sign in again.");
    });

    it("should return permission error for 403 status", () => {
      const message = translateStatusToErrorMessage(403);
      expect(message).toBe("You do not have permission to view the data requested.");
    });

    it("should return generic error message for 400 status", () => {
      const message = translateStatusToErrorMessage(400);
      expect(message).toBe("There was an error saving or retrieving data.");
    });

    it("should return generic error message for 404 status", () => {
      const message = translateStatusToErrorMessage(404);
      expect(message).toBe("There was an error saving or retrieving data.");
    });

    it("should return generic error message for 500 status", () => {
      const message = translateStatusToErrorMessage(500);
      expect(message).toBe("There was an error saving or retrieving data.");
    });
  });

  describe("checkStatus", () => {
    it("should return response for 200 status", async () => {
      const mockResponse = new Response("OK", { status: 200 });
      const result = await checkStatus(mockResponse);
      expect(result).toBe(mockResponse);
    });

    it("should return response for 201 status", async () => {
      const mockResponse = new Response("Created", { status: 201 });
      const result = await checkStatus(mockResponse);
      expect(result).toBe(mockResponse);
    });

    it("should return response for 299 status", async () => {
      const mockResponse = new Response("OK", { status: 299 });
      const result = await checkStatus(mockResponse);
      expect(result).toBe(mockResponse);
    });

    it("should throw error for 401 status", async () => {
      const mockResponse = new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
        url: "http://localhost:5038/api/test",
      });
      await expect(checkStatus(mockResponse)).rejects.toThrow("Please sign in again.");
    });

    it("should throw error for 403 status", async () => {
      const mockResponse = new Response("Forbidden", {
        status: 403,
        statusText: "Forbidden",
        url: "http://localhost:5038/api/test",
      });
      await expect(checkStatus(mockResponse)).rejects.toThrow("You do not have permission to view the data requested.");
    });

    it("should throw error for 404 status", async () => {
      const mockResponse = new Response("Not Found", {
        status: 404,
        statusText: "Not Found",
        url: "http://localhost:5038/api/test",
      });
      await expect(checkStatus(mockResponse)).rejects.toThrow("There was an error saving or retrieving data.");
    });

    it("should throw error for 500 status", async () => {
      const mockResponse = new Response("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
        url: "http://localhost:5038/api/test",
      });
      await expect(checkStatus(mockResponse)).rejects.toThrow("There was an error saving or retrieving data.");
    });

    it("should log error details to console", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      const mockResponse = new Response("Bad Request", {
        status: 400,
        statusText: "Bad Request",
        url: "http://localhost:5038/api/test",
      });

      try {
        await checkStatus(mockResponse);
      } catch {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalled();
      const callArg = consoleSpy.mock.calls[0][0];
      expect(callArg).toMatch(/http error status:/);

      consoleSpy.mockRestore();
    });
  });

  describe("parseJSON", () => {
    it("should parse valid JSON response", async () => {
      const testData = { name: "test", value: 123 };
      const mockResponse = new Response(JSON.stringify(testData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

      const result = await parseJSON(mockResponse);
      expect(result).toEqual(testData);
    });

    it("should parse JSON array", async () => {
      const testData = [{ id: 1 }, { id: 2 }];
      const mockResponse = new Response(JSON.stringify(testData), {
        status: 200,
      });

      const result = await parseJSON(mockResponse);
      expect(result).toEqual(testData);
    });

    it("should parse JSON null value", async () => {
      const mockResponse = new Response(JSON.stringify(null), {
        status: 200,
      });

      const result = await parseJSON(mockResponse);
      expect(result).toBeNull();
    });

    it("should throw error for invalid JSON", async () => {
      const mockResponse = new Response("invalid json", {
        status: 200,
      });

      await expect(parseJSON(mockResponse)).rejects.toThrow();
    });

    it("should parse JSON with nested objects", async () => {
      const testData = {
        user: {
          name: "John",
          address: {
            city: "New York",
          },
        },
      };
      const mockResponse = new Response(JSON.stringify(testData), {
        status: 200,
      });

      const result = await parseJSON(mockResponse);
      expect(result).toEqual(testData);
    });
  });
});
describe("parseJSON", () => {
  it("parses a JSON body into an object", async () => {
    const response = new Response('{"id": 1, "name": "Fries"}');
    await expect(parseJSON(response)).resolves.toEqual({ id: 1, name: "Fries" });
  });
  it("rejects when the body is not valid JSON", async () => {
    await expect(parseJSON(new Response(""))).rejects.toThrow();
  });
  it("rejects when the body is HTML rather than JSON", async () => {
    await expect(parseJSON(new Response("<!DOCTYPE html><h1>502 Bad Gateway</h1>"))).rejects.toThrow();
  });
});
