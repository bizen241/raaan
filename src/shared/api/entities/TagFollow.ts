import { UUID } from "./BaseEntityObject";
import { BaseFollowObject } from "./BaseFollowObject";

export interface TagFollow extends BaseFollowObject {
  tagSummaryId: UUID;
}
