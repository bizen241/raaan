import { UserSessionEntity, UserEntity } from "../server/database/entities";
import { AuthProviderName } from "../shared/auth";
import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface SessionData {
      user: UserEntity;
    }
  }
}
