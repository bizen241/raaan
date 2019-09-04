import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseDiary extends BaseEntityObject {
  exerciseId?: UUID;
  date: number;
  submittedCount: number;
  typedCount: number;
}
