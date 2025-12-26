import { createRoute, z } from "@hono/zod-openapi";

import { htmlContent, jsonContent } from "@/utils/response-content";

const tags = ["Common"];

export const basic = createRoute({
  path: "/",
  method: "get",
  tags,
  responses: {
    200: htmlContent(z.string(), "TZ basic Index")
  }
});

export const greet = createRoute({
  path: "/hello",
  method: "get",
  tags,
  responses: {
    200: jsonContent(z.object({ message: z.string() }), "Greet API")
  }
});

export const error = createRoute({
  path: "/error",
  method: "get",
  tags,
  responses: {
    501: jsonContent(
      z.object({ message: z.string(), stack: z.string() }),
      "Error API"
    )
  }
});



export type GreetRoute = typeof greet;
export type ErrorRoute = typeof error;

