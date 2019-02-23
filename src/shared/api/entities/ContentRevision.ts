import { ContentItem } from "../../content";
import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ContentRevision extends BaseEntityObject {
  contentId: UUID;
  lang: string;
  tags: string[];
  title: string;
  summary: string;
  comment: string;
  items: ContentItem[];
  isLinear: boolean;
}
