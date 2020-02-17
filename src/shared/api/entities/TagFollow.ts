import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface TagFollow extends BaseEntityObject {
  targetId?: EntityId<"Tag">;
  targetSummaryId: EntityId<"TagSummary">;
  followerId?: EntityId<"User">;
  followerSummaryId: EntityId<"UserSummary">;
  checkedAt: number;
}
