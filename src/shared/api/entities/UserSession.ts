import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserSession extends BaseEntityObject {
  userId: UUID;
  userAgent: string;
}
