import { z } from "@hono/zod-openapi";

const IdParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
      required: true
    },
    example: "677ceca67fa7d237753adefe"
  })
});

const StockIdParamsSchema = z.object({
  stockId: z.string().openapi({
    param: {
      name: "stockId",
      in: "path",
      required: true
    },
    example: "stock_0001"
  })
});

const DesignIdParamsSchema = z.object({
  designId: z.string().openapi({
    param: {
      name: "designId",
      in: "path",
      required: true
    },
    example: "design_0001"
  })
});

const StatusParamsSchema = z.object({
  status: z.string().openapi({
    param: {
      name: "status",
      in: "path",
      required: true
    },
    example: "0 or 1"
  })
});

const UserIdParamsSchema = z.object({
  userId: z.string().openapi({
    param: {
      name: "userId",
      in: "path",
      required: true
    },
    example: "677ceca67fa7d237753adefe"
  })
});

const QuerySchema = z.object({
  queryValue: z.coerce.number()
    .openapi({
      param: {
        name: "queryValue",
        in: "query",
      }
    })
});

export { DesignIdParamsSchema, IdParamsSchema, QuerySchema, StatusParamsSchema, StockIdParamsSchema, UserIdParamsSchema };
