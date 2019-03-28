import * as createError from "http-errors";
import fetch from "node-fetch";
import { UserProfile } from ".";
import { OAuth2Client } from "./OAuth2Client";

interface GithubClientConstructor {
  clientId: string;
  clientSecret: string;
}

export class GitHubClient extends OAuth2Client {
  constructor(params: GithubClientConstructor) {
    super({
      ...params,
      authorizationUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      userProfileUrl: "https://api.github.com/user",
      scopeName: "user:email"
    });
  }

  async getUserProfile(accessToken: string): Promise<UserProfile> {
    const url = new URL(this.params.userProfileUrl);
    url.searchParams.set("access_token", accessToken);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw createError(403);
    }

    const githubUser = await response.json();
    const { id, login, email } = githubUser;
    if (typeof id !== "number" || typeof login !== "string" || typeof email !== "string") {
      throw createError(403);
    }

    return {
      id: id.toString(),
      name: login,
      email
    };
  }
}
