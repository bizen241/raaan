import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseDiaryEntry extends BaseEntityObject<"ExerciseDiaryEntry"> {
  exerciseId?: EntityId<"Exercise">;
  date: string;
  submittedCount: number;
  typedCount: number;
}
