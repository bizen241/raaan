import { EntityId } from ".";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Exercise extends BaseExerciseObject<"Exercise"> {
  summaryId: EntityId<"ExerciseSummary">;
  draftId: EntityId<"ExerciseDraft">;
  authorId: EntityId<"User">;
  latestId: EntityId<"Revision">;
  isDraft: boolean;
  isPrivate: boolean;
  isLocked: boolean;
}
