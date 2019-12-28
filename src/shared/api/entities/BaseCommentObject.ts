import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseCommentObject extends BaseEntityObject {
  targetId?: UUID;
  authorId: UUID;
  body: string;
}
