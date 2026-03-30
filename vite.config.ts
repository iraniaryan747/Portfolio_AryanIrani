import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages `base` for production builds.
 * CI sets `GITHUB_PAGES_BASE` (see workflow). For a local production build, run e.g.:
 *   `set GITHUB_PAGES_BASE=/your-repo/& npm run build` (Windows)
 *   `GITHUB_PAGES_BASE=/your-repo/ npm run build` (macOS/Linux)
 */
function githubPagesBase(): string {
  const raw = process.env.GITHUB_PAGES_BASE?.trim();
  if (process.env.NODE_ENV !== "production") return "/";
  if (!raw || raw === "/") return "/";
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: githubPagesBase(),
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
