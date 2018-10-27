import * as express from "express";
import { ProcessEnv } from "./env";
import { router } from "./routes";
import { createSessionMidleware } from "./session";

export const createApp = (processEnv: ProcessEnv, app: express.Express = express()) => {
  app.use(createSessionMidleware(processEnv));

  app.use("*", router);

  return app;
};
