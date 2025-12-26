import type { z } from "@hono/zod-openapi";

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;

function jsonContent<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema
      }
    },
    description
  };
}
function multipartFormData<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "multipart/form-data": {
        schema
      }
    },
    description
  };
}

function htmlContent<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "text/html": {
        schema
      }
    },
    description
  };
}

function jsonContentRequired<T extends ZodSchema>(schema: T, description: string) {
  return {
    ...jsonContent(schema, description),
    required: true
  };
}

function formContentRequired<T extends ZodSchema>(schema: T, description: string) {
  return {
    ...multipartFormData(schema, description),
    required: true
  };
}

export { formContentRequired, htmlContent, jsonContent, jsonContentRequired, multipartFormData };
