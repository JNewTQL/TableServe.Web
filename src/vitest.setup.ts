import "@testing-library/jest-dom/vitest";

// jsdom implements most of the browser, but not matchMedia — and react-hot-toast's
// Toaster calls it. Answer "no reduced-motion preference" and move on.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
}
