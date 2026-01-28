import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // 👈 allow access via IP
    port: 5173, // change if needed (5173 frontend, 5174 admin)
  },
});
