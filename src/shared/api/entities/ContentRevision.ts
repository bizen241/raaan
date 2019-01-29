import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject {
  contentId: string;
  parentId: string;
  authorId: string;
  objectId: string;
  version: number;
  title: string;
  comment: string;
  isProposed: boolean;
  isMerged: boolean;
}
