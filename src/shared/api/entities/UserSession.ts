import { BaseEntityObject } from "./BaseEntityObject";

export interface UserSession extends BaseEntityObject {
  userId: string;
  userAgent: string;
}
