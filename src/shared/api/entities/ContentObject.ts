import { ContentItem } from "../../content";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ContentObject extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  summary: string;
  comment: string;
  items: ContentItem[];
  isLinear: boolean;
}
