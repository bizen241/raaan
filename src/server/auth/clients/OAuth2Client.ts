import { sign, unsign } from "cookie-signature";
import { Request } from "express";
import * as createError from "http-errors";
import fetch from "node-fetch";
import { AuthClient, UserProfile } from ".";

interface OAuth2ClientConstructor {
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  userProfileUrl: string;
  scopeName: string;
}

export abstract class OAuth2Client implements AuthClient {
  constructor(public params: OAuth2ClientConstructor) {}

  abstract async getUserProfile(accessToken: string): Promise<UserProfile>;

  authorize(req: Request) {
    const signedSessionId = sign(req.session.sessionId, req.secret);

    const url = new URL(this.params.authorizationUrl);
    const { searchParams } = url;
    searchParams.set("client_id", this.params.clientId);
    searchParams.set("scope", this.params.scopeName);
    searchParams.set("state", signedSessionId);

    return url;
  }

  async authenticate(req: Request) {
    const { error, state, code } = req.query;
    if (error !== undefined) {
      throw createError(403);
    }

    const unsignedSessionId = unsign(state, req.secret);
    if (unsignedSessionId !== req.session.sessionId) {
      throw createError(403);
    }

    const url = new URL(this.params.tokenUrl);
    const { searchParams } = url;
    searchParams.set("client_id", this.params.clientId);
    searchParams.set("client_secret", this.params.clientSecret);
    searchParams.set("code", code);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    });
    if (!response.ok) {
      throw createError(403);
    }

    const json = await response.json();
    const accessToken = json.access_token;
    if (typeof accessToken !== "string") {
      throw createError(403);
    }

    return this.getUserProfile(accessToken);
  }
}
