import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupInvitation extends BaseEntityObject<"GroupInvitation"> {
  groupId: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  targetId?: EntityId<"User">;
  targetSummaryId: EntityId<"UserSummary">;
  ownerId?: EntityId<"User">;
}
