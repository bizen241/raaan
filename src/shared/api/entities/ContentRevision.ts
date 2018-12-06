import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject<"ContentRevision"> {
  branchId: string;
  parentId: string;
  authorId: string;
  version: string;
  comment: string;
  object: unknown;
  isDraft: boolean;
}
