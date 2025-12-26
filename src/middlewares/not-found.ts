import type { NotFoundHandler } from "hono";

const notFound: NotFoundHandler = (c) => {
  return c.json({ message: `${c.req.path}` }, 401);
};

export default notFound;
