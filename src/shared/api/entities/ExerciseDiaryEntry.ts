import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface ExerciseDiaryEntry extends BaseDiaryEntryObject<"ExerciseDiaryEntry"> {
  exerciseId?: EntityId<"Exercise">;
  submittedCount: number;
  typedCount: number;
}
