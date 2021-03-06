import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistItem extends BaseEntityObject<"PlaylistItem"> {
  authorId?: EntityId<"User">;
  playlistId?: EntityId<"Playlist">;
  exerciseId?: EntityId<"Exercise">;
  exerciseSummaryId?: EntityId<"ExerciseSummary">;
  nextId: EntityId<"PlaylistItem">;
  memo: string;
}
