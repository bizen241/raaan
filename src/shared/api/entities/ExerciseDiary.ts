import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseDiary extends BaseEntityObject {
  exerciseId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
