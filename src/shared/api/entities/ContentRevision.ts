import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject {
  contentId: string;
  authorId: string;
  version: number;
  comment: string;
  object: object;
  isDraft: boolean;
}
