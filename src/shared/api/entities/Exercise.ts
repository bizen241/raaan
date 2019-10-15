import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Exercise extends BaseExerciseObject {
  authorId: UUID;
  summaryId: UUID;
  draftId: UUID;
  isPrivate: boolean;
  isLocked: boolean;
}
