import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as helmet from "helmet";
import { join } from "path";
import * as serveStatic from "serve-static";
import * as uuid from "uuid/v4";
import { prepareApi } from "./api";
import { prepareAuth } from "./auth";
import { ProcessEnv } from "./env";
import { authRouter } from "./routes/auth";
import { fallbackRouter } from "./routes/fallback";
import { logoutRouter } from "./routes/logout";
import SessionStore from "./session/store";

export const createApp = (processEnv: ProcessEnv, app: express.Express = express()) => {
  app.use(helmet());

  app.use(
    cors({
      origin: "https://terakoya.app",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: "X-Requested-With",
      credentials: true
    })
  );

  app.use(
    session({
      store: new SessionStore(),
      secret: processEnv.sessionSecret,
      cookie: {
        sameSite: "strict",
        secure: processEnv.serverHost === "localhost" ? false : true
      },
      genid: () => uuid(),
      resave: false,
      saveUninitialized: false
    })
  );

  prepareAuth(processEnv, app);

  app.use(compression());
  app.use(serveStatic(join(process.cwd(), "dist")));

  prepareApi(processEnv, app);

  app.use("/auth", authRouter);
  app.use("/logout", logoutRouter);
  app.use("*", fallbackRouter);

  return app;
};
