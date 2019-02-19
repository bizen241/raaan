import { BaseEntityObject } from "./BaseEntityObject";

export interface Content extends BaseEntityObject {
  authorId: string;
  latestId: string;
  tagIds: string[];
  lang: string;
  title: string;
  summary: string;
  isPrivate: boolean;
}
