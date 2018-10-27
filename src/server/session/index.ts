import { RequestHandler } from "express";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createSession, SessionEntity } from "../database/entities";
import { guestUser } from "../database/setup/guest";
import { ProcessEnv } from "../env";
import { getSessionId } from "./cookie";

const loadSession = async (sessionId: string) => {
  const session = await getManager().findOne(
    SessionEntity,
    { sessionId },
    {
      relations: ["user"]
    }
  );

  return session;
};

export const createSessionMidleware = (env: ProcessEnv): RequestHandler => {
  const { sessionSecret } = env;

  return async (req, __, next) => {
    req.secret = sessionSecret;

    const sessionId = getSessionId(req);

    if (sessionId != null) {
      const session = await loadSession(sessionId);

      if (session != null) {
        req.session = session;

        next();

        return;
      }
    }

    req.session = createSession({
      user: guestUser,
      sessionId: uuid(),
      expireAt: new Date(),
      userAgent: req.headers["user-agent"] || ""
    });

    next();
  };
};
