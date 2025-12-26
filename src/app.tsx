import configureOpenAPI from "@/libs/configure-open-api";
import createApp from "@/libs/create-app";
import image from "@/routes/image/image.index";
import common from "@/routes/common/common.index";

const app = createApp();

const routes = [
  common,
  image
] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
