import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistDiaryEntry extends BaseEntityObject {
  playlistId?: EntityId<"Playlist">;
  date: string;
  submittedCount: number;
  typedCount: number;
}
