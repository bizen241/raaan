import { BaseObject } from "./BaseObject";

export interface ContentBranch extends BaseObject {
  contentId: any;
  latestId: string;
  lang: string;
}
