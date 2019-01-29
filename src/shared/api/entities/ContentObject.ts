import { ContentItem } from "../../content";
import { BaseObject } from "./BaseObject";

export interface ContentObject extends BaseObject {
  lang: string;
  title: string;
  tags: string[];
  summary: string;
  comment: string;
  items: ContentItem[];
  isLinear: boolean;
}
