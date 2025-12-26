import type { AppBindings } from "@/middlewares";
import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import type mongoose from "mongoose";
import type { Document } from "mongoose";

export type AppRouterHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export interface SessionType {
  expires: Date;
  jwtToken: string;
  user: {
    username: string;
    id: string;
    role: string;
  };
};

export type LeanResult<T> = Omit<T, keyof Document> & {
  _id: mongoose.Types.ObjectId;
  __v?: number;
};

export const zodErrorObject = z.object({
  message: z.string(),
  error: z.any().optional().openapi({ type: "object", description: "Error details (any shape)" }),
}).openapi("ZodErrorObject");