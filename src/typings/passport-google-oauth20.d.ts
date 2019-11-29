declare module "passport-google-oauth20" {
  import * as express from "express";
  import * as passport from "passport";

  interface StrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    passReqToCallback: true;
    state: true;
    scope: string;
  }

  interface Verifier {
    (
      req: express.Request,
      accessToken: string,
      refreshToken: string,
      profile: passport.Profile,
      done: (error: any, user?: any) => void
    ): void;
  }

  export class Strategy extends passport.Strategy {
    constructor(options: StrategyOption, verify: Verifier);
  }
}
