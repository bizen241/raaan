import * as express from "express";
import { ProcessEnv } from "./env";
import { fallbackRouter } from "./routes/fallback";
import { createSessionMidleware } from "./session";

export const createApp = (processEnv: ProcessEnv, app: express.Express = express()) => {
  app.use(createSessionMidleware(processEnv));

  app.use("*", fallbackRouter);

  return app;
};
