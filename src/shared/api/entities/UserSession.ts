import { BaseObject } from "./BaseObject";

export interface UserSession extends BaseObject<"UserSession"> {
  userId: string;
  userAgent: string;
}
