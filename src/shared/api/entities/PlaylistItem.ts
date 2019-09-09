import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistItem extends BaseEntityObject {
  playlistId?: UUID;
  exerciseId?: UUID;
  exerciseSummaryId: UUID | null;
  nextId: UUID;
  memo: string;
}
