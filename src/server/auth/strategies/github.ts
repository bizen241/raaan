import { Strategy } from "passport-github";
import { createVerifier } from "./verifier";

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
    createVerifier("github")
  );
};
