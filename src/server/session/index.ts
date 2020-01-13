import { Express } from "express";
import session from "express-session";
import uuid from "uuid/v4";
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
