import { Express } from "express";
import * as session from "express-session";
import * as uuid from "uuid/v4";
import { Env } from "../env";
import SessionStore from "./store";

export const useSession = (env: Env, app: Express) => {
  app.use(
    session({
      store: new SessionStore(),
      secret: env.session.secret,
      cookie: {
        sameSite: "lax",
        secure: env.server.host === "localhost" ? false : true
      },
      genid: () => uuid(),
      resave: false,
      saveUninitialized: false
    })
  );
};
