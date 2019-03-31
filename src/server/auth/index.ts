import { Express } from "express";
import * as passport from "passport";
import { AuthProviderName } from "../../shared/auth";
import { ProcessEnv } from "../env";
import { createGitHubStrategy } from "./strategies/github";

export const prepareAuth = (processEnv: ProcessEnv, app: Express) => {
  passport.use("github", createGitHubStrategy(processEnv.githubClientId, processEnv.githubClientSecret));

  app.use(passport.initialize());
  app.use(passport.session());
};

export interface AuthParams {
  provider: AuthProviderName;
  accountId: string;
  name: string;
  email: string;
}
