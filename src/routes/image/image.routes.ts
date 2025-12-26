import { createRoute, z } from "@hono/zod-openapi";

import { imageSchema } from "@/schemas";
import { formContentRequired, jsonContent } from "@/utils/response-content";
import { inputImageValidator } from "@/utils/validator";

const tags = ["Image"];

export const getImageList = createRoute({
  path: "/images",
  method: "get",
  tags,
  responses: {
    200: jsonContent(
      z.object({
        message: z.string(),
        imageList: z.array(imageSchema)
      }).openapi("ImageListResponse"),
      "list of images"
    ),
    404: jsonContent(z.object({ message: z.string() }), "image not found"
    ),
    501: jsonContent(z.object({ message: z.string() }), "Internal Server Error"),
  }
});


const addStockImagesBody = z.object({
  images: z.preprocess(
    (val) => Array.isArray(val) ? val : [val], // normalize single -> array
    z.array(inputImageValidator)
      .min(1, "At least one image is required")
      .max(4, "You can upload up to 4 images only")
  ).openapi({
    type: "array",
    items: { type: "string", format: "binary" },
  })
}).openapi("AddStockImagesBody");



export const addStockImages = createRoute({
  path: "/images/stock/add",
  method: "post",
  tags,
  request: {
    body: formContentRequired(addStockImagesBody, "Add stock images")
  },
  responses: {
    201: jsonContent(
      z.object({
        message: z.string(),
        _id: z.string()
      }).openapi("addStockImagesResponse"),
      "Stock images added successfully"
    ),
    501: jsonContent(z.object({ message: z.string() }), "Internal Server Error"),
  }
});



export type GetImageListRoute = typeof getImageList;
export type AddStockImagesRoute = typeof addStockImages;