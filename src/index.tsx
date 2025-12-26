import envPatch from "@/env-patch";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import app from "./app";

if (!envPatch || !envPatch.PORT) {
  throw new Error("Missing PORT in environment configuration");
}

const port = Number(envPatch.PORT);

cors();
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port
});