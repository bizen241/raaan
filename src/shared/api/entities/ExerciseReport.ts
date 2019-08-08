import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseReport extends BaseEntityObject {
  targetId: UUID;
  reporterId: UUID;
}
