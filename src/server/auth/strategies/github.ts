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
      state: true
    },
    async (req, _, __, { id, username, emails = [] }, done: AuthStrategyCallback) => {
      try {
        const email = emails[0];
        if (email === undefined) {
          throw createError(500);
        }

        const user = await saveUser(req.user, {
          provider: "github",
          accountId: id,
          name: username || "",
          email: email.value
        });

        done(null, user);
      } catch (e) {
        done(e);
      }
    }
  );
};
