import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface TagDiaryEntry extends BaseEntityObject<"TagDiaryEntry"> {
  tagId?: EntityId<"Tag">;
  date: number;
  submittedCount: number;
  typedCount: number;
}
