import { Strategy } from "passport-google-oauth20";
import { createVerifier } from "./verifier";

export const createGoogleStrategy = (clientId: string, clientSecret: string) => {
  return new Strategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
      state: true,
      scope: "email",
    },
    createVerifier("google")
  );
};
