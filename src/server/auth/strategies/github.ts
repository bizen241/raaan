import * as createError from "http-errors";
import { Strategy } from "passport-github";
import { AuthStrategyCallback } from ".";

export const createGitHubStrategy = (clientId: string, clientSecret: string) => {
  return new Strategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: "/auth/github/callback"
    },
    async (_, __, { id, username, emails = [] }, done: AuthStrategyCallback) => {
      try {
        const email = emails[0];
        if (email === undefined) {
          throw createError(500);
        }

        done(null, {
          provider: "github",
          accountId: id,
          name: username || "",
          email: email.value
        });
      } catch (e) {
        done(e);
      }
    }
  );
};
