import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserSummary extends BaseEntityObject {
  userId: UUID;
  name: string;
  submitCount: number;
  typeCount: number;
}
