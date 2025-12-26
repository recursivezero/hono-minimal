import { dateValidator } from "@/utils/validator";
import { z } from "@hono/zod-openapi";

export const imageSchema = z.object({
  imageId: z.string().startsWith("img_"),
  productId: z.string().min(1, "Product ID is required"),
  uploadedSingleImage: z.url(),
  uploadedGroupImage: z.url("Invalid URL format"),
  generatedImages: z.array(z.string().url("Invalid URL format")).min(1, "At least one generated image is required"),
  stockImages: z.array(z.string().url("Invalid URL format")).min(1, "At least one stock image is required"),
  createdOn: dateValidator,
  updatedOn: dateValidator,
}).openapi("ImageSchema");

export type ImageType = z.infer<typeof imageSchema>;
