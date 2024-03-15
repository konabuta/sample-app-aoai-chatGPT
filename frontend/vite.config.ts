import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../static",
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    proxy: {
      "/history": "http://localhost:50505",
      "/assets": "http://localhost:50505",
      "/frontend_settings": "http://localhost:50505",
      "/conversation": "http://localhost:50505",
      "/auth_setup": "http://localhost:50505",
      "/.auth/me": "http://localhost:50505"
    },
  },
});
