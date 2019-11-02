import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseFollowObject extends BaseEntityObject {
  followerSummaryId: UUID;
  followerId?: UUID;
  targetId?: UUID;
  checkedAt: number;
}
