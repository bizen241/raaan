import { Request } from "express";
import { AuthProviderName } from "../../../shared/auth";
import { ProcessEnv } from "../../env";
import { GitHubClient } from "./GitHubClient";

export interface UserProfile {
  id: string;
  name: string;
}

export interface AuthClient {
  authorize: (req: Request) => URL;
  authenticate: (req: Request) => Promise<UserProfile>;
}

export const createAuthClients = (processEnv: ProcessEnv): { [P in AuthProviderName]: AuthClient } => ({
  github: new GitHubClient({
    clientId: processEnv.githubClientId,
    clientSecret: processEnv.githubClientSecret
  })
});
