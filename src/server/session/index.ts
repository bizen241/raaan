import { RequestHandler } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createSession, SessionEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";
import { ProcessEnv } from "../env";
import { getSessionId } from "./cookie";

const loadSession = async (sessionId: string) => {
  const manager = getManager();

  const session = await manager
    .findOne(
      SessionEntity,
      { sessionId },
      {
        relations: ["user"]
      }
    )
    .catch(() => {
      throw createError(403);
    });

  if (session !== undefined) {
    session.accessCount += 1;

    await manager.save(session);
  }

  return session;
};

export const createSessionMidleware = (env: ProcessEnv): RequestHandler => {
  const { sessionSecret } = env;

  return async (req, __, next) => {
    try {
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

      const guestUser = await getGuestUser().catch(() => {
        throw createError(500);
      });

      req.session = createSession({
        user: guestUser,
        sessionId: uuid(),
        expireAt: new Date(),
        userAgent: req.headers["user-agent"] || ""
      });

      next();
    } catch (e) {
      next(e);
    }
  };
};
