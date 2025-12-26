import { configure, getConsoleSink, getLogger } from "@logtape/logtape";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [{ category: "threadzip-app", level: "debug", sinks: ["console"] }]
});

export default function loggerTap() {
  return getLogger(["hono-app"]);
}
