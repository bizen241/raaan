import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface TagDiary extends BaseEntityObject {
  tagId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
