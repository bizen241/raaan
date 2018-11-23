import * as compression from "compression";
import * as express from "express";
import { join } from "path";
import * as serveStatic from "serve-static";
import { prepareApi } from "./api";
import { createAuthMiddleware } from "./auth";
import { ProcessEnv } from "./env";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { createSessionMiddleware } from "./session";

export const createApp = (processEnv: ProcessEnv, app: express.Express = express()) => {
  app.use(createSessionMiddleware(processEnv));
  app.use(createAuthMiddleware(processEnv));

  app.use(compression());
  app.use(serveStatic(join(process.cwd(), "dist")));

  prepareApi(processEnv, app);

  app.use("/auth", authRouter);
  app.use("*", fallbackRouter);

  return app;
};
