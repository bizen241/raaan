import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface TagDiaryEntry extends BaseDiaryEntryObject<"TagDiaryEntry"> {
  tagId?: EntityId<"Tag">;
  submittedCount: number;
  typedCount: number;
}
