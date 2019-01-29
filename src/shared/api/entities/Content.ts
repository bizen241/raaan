import { BaseObject } from "./BaseObject";

export interface Content extends BaseObject {
  ownerId: string;
  latestId: string;
  tagIds: string[];
  lang: string;
  title: string;
  summary: string;
  isPrivate: boolean;
  isArchived: boolean;
  isLocked: boolean;
}
