import { dateValidator, objectIdValidator } from "@/utils/validator";
import { z } from "@hono/zod-openapi";

export const stockSchema = z.object({
  _id: objectIdValidator,
  stockId: z.string(),
  sellerId: objectIdValidator,
  operatorId: objectIdValidator.optional(),
  businessId: objectIdValidator,
  name: z.string().min(1),
  categoryId: objectIdValidator,
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
  status: z.enum(["draft", "published", "sold", "archived"]),
  price: z.number().positive(),
  imageId: objectIdValidator,
  tags: z.array(objectIdValidator),
  isActive: z.boolean().default(false),
  createdOn: dateValidator,
  updatedOn: dateValidator
});

export const stockFormSchema = z.object({
  sellerId: objectIdValidator,
  operatorId: z.string().optional(),
  businessId: objectIdValidator,
  name: z.string().min(1),
  categoryId: z.string(),
  description: z.string().min(1),
  status: z.enum(["draft", "published", "sold", "archived"]),
  quantity: z.string().refine(val => !Number.isNaN(Number(val)) && Number(val) > 0, { message: "Quantity must be a positive number", }),
  unit: z.string().min(1),
  price: z.string().refine(val => !Number.isNaN(Number(val)) && Number(val) > 0, { message: "Price must be a positive number", }),
  tags: z
    .union([
      z.string().transform(val => val.split(",")),
      z.array(z.string())
    ])
    .transform((val) => {
      const tagsArray = Array.isArray(val) ? val : [val];
      const uniqueTags = new Set([...tagsArray.map(tag => tag.trim()), "Stock"]);
      return Array.from(uniqueTags);
    }),
  imageId: objectIdValidator.optional()
});

export type StockFormSchemaType = z.infer<typeof stockFormSchema>;
export type StockType = z.infer<typeof stockSchema>;