import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserFollow extends BaseEntityObject {
  targetId?: EntityId<"User">;
  targetSummaryId: EntityId<"UserSummary">;
  followerId?: EntityId<"User">;
  followerSummaryId: EntityId<"UserSummary">;
  checkedAt: number;
}
