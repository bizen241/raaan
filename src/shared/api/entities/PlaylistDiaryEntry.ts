import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistDiaryEntry extends BaseEntityObject<"PlaylistDiaryEntry"> {
  playlistId?: EntityId<"Playlist">;
  date: string;
  submittedCount: number;
  typedCount: number;
}
