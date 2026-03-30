import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://iraniaryan747.github.io/Portfolio_AryanIrani/
const repoBase = "/Portfolio_AryanIrani/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: repoBase,
});
