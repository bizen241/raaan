import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface AttemptResult {
  typeCount: number;
  time: number;
  accuracy: number;
}

export interface SubmissionSummary extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  latest: AttemptResult;
  best: AttemptResult;
  submitCount: number;
}
