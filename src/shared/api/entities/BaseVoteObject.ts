import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseVoteObject extends BaseEntityObject {
  targetId?: UUID;
  targetSummaryId: UUID;
  voterId?: UUID;
  voterSummaryId: UUID;
  isUp: boolean;
}
