import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserSummary extends BaseEntityObject {
  userId: UUID;
  playCount: number;
  typeCount: number;
}
