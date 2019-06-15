import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Submission extends BaseEntityObject {
  userId: UUID;
  exerciseId: UUID;
  keystrokes: number;
  time: number;
  accuracy: number;
}
