import { UserSessionEntity } from "../server/database/entities";

declare module "openapi-types" {
  namespace OpenAPI {
    export interface Request {
      session: UserSessionEntity;
    }
  }
}
