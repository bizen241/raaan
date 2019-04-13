import { UserSessionEntity, UserEntity } from "../server/database/entities";

declare module "openapi-types" {
  namespace OpenAPI {
    export interface Request {
      user: UserEntity | undefined;
    }
  }
}
