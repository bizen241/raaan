import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseVote extends BaseEntityObject<"ExerciseVote"> {
  targetId?: EntityId<"Exercise">;
  targetSummaryId: EntityId<"ExerciseSummary">;
  voterId?: EntityId<"User">;
  voterSummaryId: EntityId<"UserSummary">;
  isUp: boolean;
}
