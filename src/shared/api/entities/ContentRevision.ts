import { ContentData } from "../../content";
import { BaseObject } from "./BaseObject";

export interface ContentRevision extends BaseObject {
  authorId: string;
  contentId: string;
  version: number;
  comment: string;
  data: ContentData;
  isDraft: boolean;
}
