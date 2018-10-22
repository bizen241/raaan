import * as express from "express";
import { router } from "./routes";

export const createApp = (app: express.Express = express()) => {
  app.use("*", router);

  return app;
};
