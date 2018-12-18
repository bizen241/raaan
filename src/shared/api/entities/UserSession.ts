import { BaseObject } from "./BaseObject";

export interface UserSession extends BaseObject {
  userId: string;
  userAgent: string;
}
