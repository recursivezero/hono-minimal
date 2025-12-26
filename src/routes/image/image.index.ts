import { createRouter } from "@/libs/create-app";
import * as handlers from "./image.handlers";
import * as routes from "./image.routes";

const router = createRouter()
  //.openapi(routes.addStockImages, handlers.addStockImages) // FIXME: comment this to see Swagger OPEN API UI on /reference URL
  .openapi(routes.getImageList, handlers.getImageList);
export default router;
