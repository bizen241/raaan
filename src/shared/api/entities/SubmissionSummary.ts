import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface SubmissionSummary extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  latestId: UUID;
  bestId: UUID;
  playCount: number;
}
