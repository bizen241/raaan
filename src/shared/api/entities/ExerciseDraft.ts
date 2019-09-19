import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface ExerciseDraft extends BaseExerciseObject {
  exerciseId: UUID;
  isMerged: boolean;
  isPrivate?: boolean;
}
