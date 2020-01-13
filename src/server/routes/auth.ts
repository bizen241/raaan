import { NextFunction, Request, Response, Router } from "express";
import createError from "http-errors";
import passport from "passport";
import { getManager } from "typeorm";
import { UAParser } from "ua-parser-js";
import { AuthStrategyFailureReason } from "../auth/strategies";
import { UserEntity, UserSessionEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";

export const authRouter = Router();

authRouter.get("/:provider", async (req, res, next) => {
  const { provider } = req.params;

  if (req.session === undefined || req.sessionID === undefined) {
    throw createError(500);
  }

  const session = await getManager().findOne(UserSessionEntity, {
    sessionId: req.sessionID
  });

  if (session === undefined) {
    const guestUser = await getGuestUser();
    const newUserSession = new UserSessionEntity(guestUser, req.sessionID);

    await getManager().save(newUserSession);
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
    async (authError: Error | null, user: UserEntity | false, reason?: AuthStrategyFailureReason) => {
      if (authError != null || req.session === undefined) {
        throw createError(500);
      }
      if (user === false) {
        if (reason !== undefined && reason.provider !== undefined) {
          return res.redirect(`/auth/${reason.provider}`);
        } else {
          throw createError(500);
        }
      }
      if (req.user !== undefined) {
        return res.redirect("/user/user-account");
      }

      req.session.regenerate(async (sessionError?: Error) => {
        if (sessionError || req.session === undefined) {
          throw createError(500);
        }

        await login(req, res, next, user);
      });
    }
  )(req, res, next);
});

const login = async (req: Request, res: Response, next: NextFunction, user: UserEntity) => {
  if (req.sessionID === undefined) {
    return next(createError(500));
  }

  const userAgentParser = new UAParser(req.headers["user-agent"]);
  const { type: deviceType, vendor, model } = userAgentParser.getDevice();
  const os = userAgentParser.getOS();
  const browser = userAgentParser.getBrowser();

  const newUserSession = new UserSessionEntity(user, req.sessionID, {
    deviceType: deviceType || "desktop",
    deviceName: vendor !== undefined && model !== undefined ? `${vendor} ${model.slice(0, 100)}` : "",
    os: os.name || "",
    browser: browser.name || ""
  });

  await getManager().save(newUserSession);

  req.login(user, (loginError: Error | null) => {
    if (loginError) {
      return next(createError(500));
    }

    res.redirect("/");
  });
};
