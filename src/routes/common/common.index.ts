import { createRouter } from "@/libs/create-app";
import * as handlers from "./common.handlers";
import * as routes from "./common.routes";

const router = createRouter()
  .openapi(routes.basic, handlers.basic)
  .openapi(routes.greet, handlers.greet)
  .openapi(routes.error, handlers.error);

export default router;
