import { BaseObject } from "./BaseObject";

export interface Content extends BaseObject {
  ownerId: string;
  latestId: string;
  tagIds: string[];
  title: string;
  lang: string;
  description: string;
  isPrivate: boolean;
  isArchived: boolean;
  isLocked: boolean;
}
