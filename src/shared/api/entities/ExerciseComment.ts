import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseComment extends BaseEntityObject<"ExerciseComment"> {
  summaryId: EntityId<"ExerciseCommentSummary">;
  targetId?: EntityId<"Exercise">;
  targetSummaryId: EntityId<"ExerciseSummary">;
  authorId: EntityId<"User">;
  body: string;
}
