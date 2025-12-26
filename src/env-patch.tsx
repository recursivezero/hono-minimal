import { z } from "@hono/zod-openapi";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";

// Show which file is being loaded
const envFilePath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === "development" ? ".env.local" : ".env"
);
// Load and expand
expand(config({ path: envFilePath }));

const DEFAULT_PORT = 3000;

const STAGING_URL = "https://zero.tailb91f8d.ts.net/";

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(DEFAULT_PORT),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().optional(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    URL: z.string().default(STAGING_URL),
    API_PREFIX: z.string().default("")
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when NODE_ENV is 'production'"
      });
    }
  });

export type envType = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.issues, null, 2));
  process.exit(1);
}
export default env;