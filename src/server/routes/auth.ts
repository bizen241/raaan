import { Router } from "express";
import * as createError from "http-errors";
import * as passport from "passport";
import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
import { UserEntity, UserSessionEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";

export const authRouter = Router();

authRouter.get("/:provider", async (req, res, next) => {
  const { provider } = req.params;

  if (req.session === undefined) {
    return next(createError(500));
  }

  if (req.user === undefined) {
    const guestUser = await getGuestUser();
    const expireAt = Date.now() + 10 * 60 * 1000;

    const session = new UserSessionEntity(guestUser, req.session.id, new Date(expireAt));

    await getManager().save(session);
  }

  passport.authenticate(provider)(req, res, next);
});

authRouter.get("/:provider/callback", (req, res, next) => {
  const { provider } = req.params;

  passport.authenticate(
    provider,
    {
      failureRedirect: "/"
    },
    async (err: Error, user: UserEntity) => {
      if (err) {
        return next(err);
      }
      if (req.session === undefined) {
        return next(createError(500));
      }

      const nextSessionId = uuid();
      const expireAt = Date.now() + 1000 * 24 * 60 * 60 * 1000;

      await getManager().update(
        UserSessionEntity,
        {
          sessionId: req.session.id
        },
        {
          sessionId: nextSessionId,
          user,
          accessCount: 0,
          expireAt: new Date(expireAt)
        }
      );

      req.session.id = nextSessionId;

      res.redirect("/");
    }
  )(req, res, next);
});
