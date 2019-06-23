import { Router } from "express";
import * as createError from "http-errors";
import * as passport from "passport";
import { getManager } from "typeorm";
import { UserEntity, UserSessionEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";

export const authRouter = Router();

authRouter.get("/:provider", async (req, res, next) => {
  const { provider } = req.params;

  if (req.session === undefined || req.sessionID === undefined) {
    return next(createError(500));
  }
  if (req.user !== undefined) {
    return res.redirect("/");
  }

  const guestUser = await getGuestUser();
  const expireAt = Date.now() + 10 * 60 * 1000;
  const newUserSession = new UserSessionEntity(guestUser, req.sessionID, new Date(expireAt));

  await getManager().save(newUserSession);

  passport.authenticate(provider)(req, res, next);
});

authRouter.get("/:provider/callback", (req, res, next) => {
  const { provider } = req.params;

  passport.authenticate(
    provider,
    {
      failureRedirect: "/"
    },
    async (authError: Error | null, user: UserEntity) => {
      if (authError || req.session === undefined) {
        return next(createError(500));
      }

      req.session.regenerate(async (sessionError?: Error) => {
        if (sessionError || req.session === undefined || req.sessionID === undefined) {
          return next(createError(500));
        }

        const expireAt = Date.now() + 1000 * 24 * 60 * 60 * 1000;
        const newUserSession = new UserSessionEntity(user, req.sessionID, new Date(expireAt));

        await getManager().save(newUserSession);

        req.login(user, (loginError: Error | null) => {
          if (loginError) {
            return next(createError(500));
          }

          res.redirect("/");
        });
      });
    }
  )(req, res, next);
});
