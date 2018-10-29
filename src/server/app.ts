import * as express from "express";
import { prepareApi } from "./api";
import { createAuthMiddleware } from "./auth";
import { ProcessEnv } from "./env";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { createSessionMidleware } from "./session";

export const createApp = (processEnv: ProcessEnv, app: express.Express = express()) => {
  app.use(createSessionMidleware(processEnv));
  app.use(createAuthMiddleware(processEnv));

  prepareApi(processEnv, app);

  app.use("/auth", authRouter);
  app.use("*", fallbackRouter);

  return app;
};
