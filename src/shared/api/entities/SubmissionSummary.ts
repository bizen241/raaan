import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface AttemptResult {
  keystrokes: number;
  time: number;
  accuracy: number;
}

export interface SubmissionSummary extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  latest: AttemptResult;
  best: AttemptResult;
  playCount: number;
}
