import { BaseEntityObject, UUID } from "./BaseEntityObject";
import { ExerciseDetailObject } from "./ExerciseDetailObject";

export interface ExerciseDetail extends BaseEntityObject, ExerciseDetailObject {
  contentId: UUID;
}
