import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseDiaryEntry extends BaseEntityObject {
  exerciseId?: EntityId<"Exercise">;
  date: string;
  submittedCount: number;
  typedCount: number;
}
