import { RequestHandler } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { UserSessionEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";
import { ProcessEnv } from "../env";
import { getSessionId } from "./cookie";

const loadSession = async (sessionId: string) => {
  const manager = getManager();

  const session = await manager
    .findOne(
      UserSessionEntity,
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

export const createSessionMiddleware = (env: ProcessEnv): RequestHandler => {
  const { sessionSecret } = env;

  return async (req, __, next) => {
    try {
      req.secret = sessionSecret;

      const sessionId = getSessionId(req);

      if (sessionId != null) {
        const session = await loadSession(sessionId);

        if (session != null) {
          if (session.user === undefined) {
            throw createError(500);
          }

          req.session = session;
          req.user = session.user;

          next();

          return;
        }
      }

      const guestUser = await getGuestUser().catch(() => {
        throw createError(500);
      });

      const newSession = new UserSessionEntity(guestUser);
      newSession.sessionId = uuid();
      newSession.expireAt = new Date();
      newSession.userAgent = req.headers["user-agent"] || "";

      req.session = newSession;
      req.user = guestUser;

      next();
    } catch (e) {
      next(e);
    }
  };
};
