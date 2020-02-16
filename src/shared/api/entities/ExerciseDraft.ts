import { EntityId } from ".";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface ExerciseDraft extends BaseExerciseObject<"ExerciseDraft"> {
  exerciseId: EntityId<"Exercise">;
  suggestionId?: EntityId<"Suggestion">;
  revisionId?: EntityId<"Revision">;
  messageSubject?: string;
  messageBody?: string;
  isMerged: boolean;
  isPrivate?: boolean;
}
