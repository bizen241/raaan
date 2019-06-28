import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserSession extends BaseEntityObject {
  userId: UUID;
  accessCount: number;
  deviceType: string;
  deviceName: string;
  os: string;
  browser: string;
  isCurrent: boolean;
}
