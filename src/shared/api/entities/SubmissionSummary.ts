import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface SubmissionSummary extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  averageTime: number;
  averageAccuracy: number;
}
