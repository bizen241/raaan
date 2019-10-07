import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseFollowObject extends BaseEntityObject {
  followerId: UUID;
  checkedAt: number;
}
