import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserSession extends BaseEntityObject<"UserSession"> {
  userId: EntityId<"User">;
  accessCount: number;
  deviceType: string;
  deviceName: string;
  os: string;
  browser: string;
  isCurrent: boolean;
}
