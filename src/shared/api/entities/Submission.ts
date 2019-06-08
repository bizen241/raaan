import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Submission extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  time: number;
  accuracy: number;
}
