import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject {
  branchId: string;
  authorId: string;
  version: number;
  comment: string;
  object: object;
  isDraft: boolean;
}
