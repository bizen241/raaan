import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface ExerciseDraft extends BaseExerciseObject {
  exerciseId: UUID;
  message?: string;
  isMerged: boolean;
  isPrivate?: boolean;
}
