import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseVote extends BaseEntityObject {
  targetId: UUID;
  voterId: UUID;
  isUp: boolean;
}
