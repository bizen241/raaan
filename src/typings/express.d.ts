import { SessionEntity } from "../server/database/entities";

declare global {
  namespace Express {
    interface Request {
      session?: SessionEntity;
      secret?: string;
    }
  }
}
