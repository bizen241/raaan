import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseRevision extends BaseEntityObject {
  exerciseId: UUID;
  detailId: UUID;
}
