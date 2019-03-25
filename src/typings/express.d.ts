import { UserSessionEntity, UserEntity } from "../server/database/entities";
import { AuthProviderName } from "../shared/auth";
import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      session: UserSessionEntity;
      user: UserEntity;
      secret: string;
      authorize: (provider: AuthProviderName) => void;
      authenticate: (provider: AuthProviderName) => void;
    }
  }
}
