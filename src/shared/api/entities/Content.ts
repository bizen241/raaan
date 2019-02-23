import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Content extends BaseEntityObject {
  authorId: UUID;
  latestId: UUID;
  tagIds: UUID[];
  lang: string;
  title: string;
  summary: string;
  isPrivate: boolean;
}
