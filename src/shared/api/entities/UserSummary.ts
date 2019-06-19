import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserSummary extends BaseEntityObject {
  userId: UUID;
  submitCount: number;
  typeCount: number;
}
