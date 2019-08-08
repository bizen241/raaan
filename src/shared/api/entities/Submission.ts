import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Submission extends BaseEntityObject {
  submitterId: UUID;
  exerciseId: UUID;
  typeCount: number;
  time: number;
  accuracy: number;
}
