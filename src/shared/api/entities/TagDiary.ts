import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface TagDiaryEntry extends BaseEntityObject {
  tagId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
