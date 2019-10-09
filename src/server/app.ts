import * as compression from "compression";
import * as express from "express";
import * as session from "express-session";
import * as helmet from "helmet";
import { join } from "path";
import * as serveStatic from "serve-static";
import * as uuid from "uuid/v4";
import { prepareApi } from "./api";
import { prepareAuth } from "./auth";
import { Env } from "./env";
import { useLimiter } from "./limiter";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { logoutRouter } from "./routes/logout";
import SessionStore from "./session/store";

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

  app.use(
    session({
      store: new SessionStore(),
      secret: env.session.secret,
      cookie: {
        sameSite: "Lax",
        secure: env.server.host === "localhost" ? false : true
      },
      genid: () => uuid(),
      resave: false,
      saveUninitialized: false
    })
  );

  prepareAuth(env, app);

  app.use(compression());
  app.use(serveStatic(join(process.cwd(), "dist")));

  useLimiter(app);

  prepareApi(env, app);

  app.use("/auth", authRouter);
  app.use("/logout", logoutRouter);
  app.use("*", fallbackRouter);

  return app;
};
