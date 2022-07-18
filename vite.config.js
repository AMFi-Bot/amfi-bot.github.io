import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

process.env = { ...process.env, ...loadEnv("", process.cwd()) };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: process.env.VITE_FRONTEND_PORT || 3000,
    host: process.env.VITE_FRONTEND_HOST || "localhost",
  },
});
