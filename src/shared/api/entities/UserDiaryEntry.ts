import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface UserDiaryEntry extends BaseDiaryEntryObject<"UserDiaryEntry"> {
  targetId?: EntityId<"User">;
  submitCount: number;
  typeCount: number;
  submittedCount: number;
  typedCount: number;
  createCount: number;
  editCount: number;
}
