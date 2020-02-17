import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface TagSummary extends BaseEntityObject {
  tagId: EntityId<"Tag">;
  name: string;
  description: string;
  exerciseCount: number;
  playlistCount: number;
}
