import type { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import type { AppBindings } from "@/middlewares";
import pkg from "../../package.json";

type AppOpenAPI = OpenAPIHono<AppBindings>;

export default function configureOpenAPI(app: AppOpenAPI) {
  try {
    app.doc(`/doc`, {
      openapi: "3.0.0",
      info: {
        version: pkg.version,
        title: "TZ Server",
        description: "API for managing threadzip"
      }
    });
  } catch (err: any) {
    console.error("❌ OpenAPI generation failed:", err.message);
    console.dir(err.data?.currentSchema, { depth: null });
    throw err;
  }

  app.get(
    "/reference",
    Scalar({
      url: `/doc`,
      pageTitle: "HONO: API Reference",
      theme: "deepSpace",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    })
  );
}
