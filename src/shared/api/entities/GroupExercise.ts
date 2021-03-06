import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupExercise extends BaseEntityObject<"GroupExercise"> {
  groupId: EntityId<"Group">;
  exerciseId?: EntityId<"Exercise">;
  exerciseSummaryId: EntityId<"ExerciseSummary">;
}
