import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject<"ContentRevision"> {
  branchId: string;
  authorId: string;
  version: number;
  comment: string;
  object: object;
  isDraft: boolean;
}
