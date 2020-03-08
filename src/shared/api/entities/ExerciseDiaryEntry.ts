import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface ExerciseDiaryEntry extends BaseDiaryEntryObject<"ExerciseDiaryEntry"> {
  targetId?: EntityId<"Exercise">;
  submittedCount: number;
  typedCount: number;
}
