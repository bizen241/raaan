import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseCommentVote extends BaseEntityObject {
  targetId?: EntityId<"ExerciseComment">;
  targetSummaryId: EntityId<"ExerciseCommentSummary">;
  voterId?: EntityId<"User">;
  voterSummaryId: EntityId<"UserSummary">;
  isUp: boolean;
}
