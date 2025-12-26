import { Home } from "@/components/Home";
import type { AppRouterHandler } from "@/types/common";
import type { ErrorRoute, GreetRoute } from "./common.routes";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const basic: AppRouterHandler<any> = (c) => {
  const props = {
    name: "Hacker",
    siteData: {
      title: "Home Page",
      description: "Hono is cool!",
    },
  };
  return c.html(<Home { ...props } />);
};


export const greet: AppRouterHandler<GreetRoute> = (c) => {
  c.var.logger.debug("Hi"); // when LOG_LEVEL=DEBUG added before npm run dev then this will be visible
  return c.json({ message: "Hi" });
};

export const error: AppRouterHandler<ErrorRoute> = (c) => {
  c.var.logger.debug("Error"); // when LOG_LEVEL=DEBUG added before npm run dev then this will be visible
  throw new Error("Error has occurred");
};


