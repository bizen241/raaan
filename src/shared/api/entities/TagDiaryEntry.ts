import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface TagDiaryEntry extends BaseDiaryEntryObject<"TagDiaryEntry"> {
  targetId?: EntityId<"Tag">;
  submittedCount: number;
  typedCount: number;
}
