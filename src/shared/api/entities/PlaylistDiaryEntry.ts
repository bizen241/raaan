import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface PlaylistDiaryEntry extends BaseDiaryEntryObject<"PlaylistDiaryEntry"> {
  playlistId?: EntityId<"Playlist">;
  submittedCount: number;
  typedCount: number;
}
