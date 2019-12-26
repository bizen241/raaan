import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseCommentObject extends BaseEntityObject {
  targetId?: UUID;
  body: string;
}
