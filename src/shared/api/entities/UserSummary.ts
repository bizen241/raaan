import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserSummary extends BaseEntityObject<"UserSummary"> {
  userId: EntityId<"User">;
  name: string;
  submitCount: number;
  typeCount: number;
  emailHash: string;
}
