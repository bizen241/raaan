import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseFollowObject extends BaseEntityObject {
  followerSummaryId: UUID;
  followerId?: UUID;
  targetSummaryId: UUID;
  targetId?: UUID;
  checkedAt: number;
}
