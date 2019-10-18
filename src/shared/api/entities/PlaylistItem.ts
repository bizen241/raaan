import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistItem extends BaseEntityObject {
  authorId?: UUID;
  playlistId?: UUID;
  exerciseId?: UUID;
  exerciseSummaryId?: UUID;
  nextId: UUID;
  memo: string;
}
