import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupInvitation extends BaseEntityObject {
  groupId: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  targetId?: EntityId<"User">;
  targetSummaryId: EntityId<"UserSummary">;
  ownerId?: EntityId<"User">;
}
