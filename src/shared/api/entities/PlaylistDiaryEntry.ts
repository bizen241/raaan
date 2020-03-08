import { EntityId } from ".";
import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface PlaylistDiaryEntry extends BaseDiaryEntryObject<"PlaylistDiaryEntry"> {
  targetId?: EntityId<"Playlist">;
  submittedCount: number;
  typedCount: number;
}
