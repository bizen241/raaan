import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface AttemptResult {
  typeCount: number;
  time: number;
  accuracy: number;
}

export interface SubmissionSummary extends BaseEntityObject {
  submitterId: UUID;
  exerciseId: UUID;
  exerciseSummaryId: UUID;
  latest: AttemptResult;
  submitCount: number;
  typeCount: number;
}
