import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Suggestion extends BaseExerciseObject {
  summaryId: UUID;
}
