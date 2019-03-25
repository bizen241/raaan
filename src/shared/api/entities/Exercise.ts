import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Exercise extends BaseEntityObject {
  authorId: UUID;
  detailId: UUID;
  tagIds: string[];
  lang: string;
  title: string;
  description: string;
  // playcount:
  // likecount:
  isPrivate: boolean;
  isLocked: boolean;
}
