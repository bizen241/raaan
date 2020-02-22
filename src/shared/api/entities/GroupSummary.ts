import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupSummary extends BaseEntityObject<"GroupSummary"> {
  groupId: EntityId<"Group">;
  name: string;
  description: string;
  ownerId?: EntityId<"User">;
}
