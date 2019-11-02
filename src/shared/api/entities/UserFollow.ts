import { UUID } from "./BaseEntityObject";
import { BaseFollowObject } from "./BaseFollowObject";

export interface UserFollow extends BaseFollowObject {
  targetSummaryId: UUID;
}
