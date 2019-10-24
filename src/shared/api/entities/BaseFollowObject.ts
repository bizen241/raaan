import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseFollowObject extends BaseEntityObject {
  followerId: UUID;
  targetId?: UUID;
  checkedAt: number;
}
