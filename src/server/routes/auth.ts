import { Router } from "express";
import * as createError from "http-errors";
import * as passport from "passport";
import { AuthParams } from "../auth";
import { saveUser } from "../auth/user";
import { getGuestUser } from "../database/setup/guest";

export const authRouter = Router();

authRouter.get("/:provider", async (req, res, next) => {
  const { provider } = req.params;

  if (req.session === undefined) {
    return next(createError(500));
  }

  req.session.user = await getGuestUser();

  passport.authenticate(provider)(req, res, next);
});

authRouter.get("/:provider/callback", (req, res, next) => {
  const { provider } = req.params;

  passport.authenticate(
    provider,
    {
      failureRedirect: "/"
    },
    (err: Error, params: AuthParams) => {
      if (err) {
        return next(err);
      }
      if (req.session === undefined) {
        return next(createError(500));
      }

      req.session.regenerate(async () => {
        if (req.session === undefined) {
          return next(createError(500));
        }

        const user = await saveUser(req.session.user, params);

        req.session.user = user;

        res.redirect("/");
      });
    }
  )(req, res, next);
});
