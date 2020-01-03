import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseDiaryEntry extends BaseEntityObject {
  exerciseId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
