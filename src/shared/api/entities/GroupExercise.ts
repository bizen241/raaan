import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupExercise extends BaseEntityObject {
  groupId: UUID;
  exerciseId?: UUID;
  exerciseSummaryId: UUID;
}
