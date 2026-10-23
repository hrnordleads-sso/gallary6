import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages serves this repo under /gallary6/ when hosted there.
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  plugins: [react()],
});
