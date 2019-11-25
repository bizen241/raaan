import * as createError from "http-errors";
import { Strategy } from "passport-github";
import { AuthStrategyCallback } from ".";
import { saveUser } from "../user";

export const createGitHubStrategy = (clientId: string, clientSecret: string) => {
  return new Strategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: "/auth/github/callback",
      passReqToCallback: true,
      state: true,
      scope: "user:email"
    },
    async (req, _, __, { id, username, emails = [] }, done: AuthStrategyCallback) => {
      try {
        const email = emails[0];
        if (email === undefined) {
          throw createError(500);
        }

        const result = await saveUser(req.user, {
          provider: "github",
          accountId: id,
          name: username || "",
          email: email.value
        });

        if (typeof result === "string") {
          done(null, false, {
            provider: result
          });
        } else {
          done(null, result);
        }
      } catch (e) {
        done(e);
      }
    }
  );
};
