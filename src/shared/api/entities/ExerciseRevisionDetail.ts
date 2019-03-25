import { UUID } from "./BaseEntityObject";
import { ExerciseDetailObject } from "./ExerciseDetailObject";

export interface ExerciseRevisionDetail extends ExerciseDetailObject {
  revisionId: UUID;
}
