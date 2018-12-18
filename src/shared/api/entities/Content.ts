import { BaseObject } from "./BaseObject";

export interface Content extends BaseObject {
  ownerId: string;
  latestId: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isArchived: boolean;
  isLocked: boolean;
}
