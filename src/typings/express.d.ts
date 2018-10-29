import { SessionEntity } from "../server/database/entities";
import { AuthProviderName } from "../shared/auth";
import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      session: SessionEntity;
      secret: string;
      authorize: (provider: AuthProviderName) => void;
      authenticate: (provider: AuthProviderName) => void;
    }
  }
}