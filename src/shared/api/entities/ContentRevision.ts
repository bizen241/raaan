import { ContentItem } from "../../content";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ContentRevision extends BaseEntityObject {
  contentId: string;
  lang: string;
  tags: string[];
  title: string;
  summary: string;
  comment: string;
  items: ContentItem[];
  isLinear: boolean;
}
