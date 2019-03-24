import { ContentItem } from "../../content";
import { BaseEntityObject } from "./BaseEntityObject";

export type NavigationMode = "sequential" | "random";

export interface ContentDetail extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  items: ContentItem[];
  comment: string;
  navigationMode: NavigationMode;
}
