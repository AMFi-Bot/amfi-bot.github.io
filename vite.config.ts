import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { toInteger } from "lodash";

process.env = { ...process.env, ...loadEnv("", process.cwd()) };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: toInteger(process.env.VITE_FRONTEND_PORT) || 3000,
    host: "0.0.0.0",
  },
});
