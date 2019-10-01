import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface TagSummary extends BaseEntityObject {
  tagId: UUID;
  name: string;
  description: string;
  exerciseCount: number;
  playlistCount: number;
}
