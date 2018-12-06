import { BaseObject } from "./BaseObject";

export interface ContentBranch extends BaseObject<"ContentBranch"> {
  contentId: any;
  latestId: string;
  lang: string;
}
