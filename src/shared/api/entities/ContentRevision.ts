import { BaseEntityObject } from "./BaseEntityObject";

export interface ContentRevision extends BaseEntityObject {
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
