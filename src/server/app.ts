import compression from "compression";
import express from "express";
import helmet from "helmet";
import { join } from "path";
import serveStatic from "serve-static";
import { useApi } from "./api";
import { useAuth } from "./auth";
import { Env } from "./env";
import { errorHandler } from "./error";
import { useLimiter } from "./limiter";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { useSession } from "./session";

export const createApp = (env: Env, app: express.Express = express()) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        reportOnly: true,
        directives: {
          reportTo: env.report.csp
        }
      },
      expectCt: {
        reportUri: env.report.expectCt
      }
    })
  );

  useSession(env, app);
  useAuth(env, app);

  app.use(compression());
  app.use(serveStatic(join(process.cwd(), "dist")));

  useLimiter(app);
  useApi(env, app);

  app.use("/auth", authRouter);
  app.use("*", fallbackRouter);

  app.use(errorHandler);

  return app;
};
