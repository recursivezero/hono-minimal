import { serveStatic } from "@hono/node-server/serve-static";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { trimTrailingSlash } from "hono/trailing-slash";

// Importing custom defined files
import type { AppBindings } from "@/middlewares";
import { notFound, onError, pinoLoggerConfig } from "@/middlewares";
import defaultHook from "@/utils/open-api-default-hook";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });//.basePath("/stage/api");
}

function createApp() {
  const app = createRouter();

  // Basic Middlewares
  app.use("*", pinoLoggerConfig());
  app.use("*", prettyJSON());
  app.use("/*", cors());
  app.use(trimTrailingSlash());
  app.use("/images/*", serveStatic({ root: "./static", onNotFound: path => console.warn(`${path} not found`) }));

  // Add X-Response-Time header
  app.use("*", async (c, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    c.header("X-Response-Time", `${ms}ms`);
  });

  app.notFound(notFound);
  app.onError(onError);

  // First level routes
  return app;
}

export default createApp;
