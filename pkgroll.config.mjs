import { defineConfig } from "pkgroll";

export default defineConfig({
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true
  },
  external: ["hono", "mongoose", "dotenv", "zod", "pino"]
});
