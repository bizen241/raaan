import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Content extends BaseEntityObject {
  authorId: UUID;
  latestId: UUID;
  tagIds: string[];
  lang: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isLocked: boolean;
}
