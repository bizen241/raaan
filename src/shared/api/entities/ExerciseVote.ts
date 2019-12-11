import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseVote extends BaseEntityObject {
  targetId: UUID;
  targetSummaryId: UUID;
  voterId: UUID;
  voterSummaryId: UUID;
  isUp: boolean;
}
