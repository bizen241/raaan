import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface AttemptResult {
  typeCount: number;
  time: number;
  accuracy: number;
}

export interface SubmissionSummary extends BaseEntityObject<"SubmissionSummary"> {
  submitterId: EntityId<"User">;
  exerciseId: EntityId<"Exercise">;
  exerciseSummaryId: EntityId<"ExerciseSummary">;
  latest: AttemptResult;
  submitCount: number;
  typeCount: number;
  isRepeating: boolean;
  remindAt: number;
  searchSort?: "updatedAt" | "remindAt";
}
