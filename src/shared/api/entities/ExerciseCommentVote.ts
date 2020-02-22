import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseCommentVote extends BaseEntityObject<"ExerciseCommentVote"> {
  targetId?: EntityId<"ExerciseComment">;
  targetSummaryId: EntityId<"ExerciseCommentSummary">;
  voterId?: EntityId<"User">;
  voterSummaryId: EntityId<"UserSummary">;
  isUp: boolean;
}
