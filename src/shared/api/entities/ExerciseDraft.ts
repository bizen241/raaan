import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface ExerciseDraft extends BaseExerciseObject {
  exerciseId: UUID;
  messageSubject?: string;
  messageBody?: string;
  isMerged: boolean;
  isPrivate?: boolean;
}
