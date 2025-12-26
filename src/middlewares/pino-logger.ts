import { type PinoLogger, pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import env from "@/env-patch";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

function pinoLoggerConfig() {
  const logLevel = env?.LOG_LEVEL ?? "info";
  const isProduction = env?.NODE_ENV === "production";

  return pinoLogger({
    pino: pino(
      {
        level: logLevel,
      },
      isProduction ? undefined : pretty()
    ),
    http: { reqId: () => crypto.randomUUID() }
  });
}

export default pinoLoggerConfig;
